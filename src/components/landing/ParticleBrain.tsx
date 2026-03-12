"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// ─── Noise helpers ──────────────────────────────────────────────────

function noise3D(x: number, y: number, z: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return (n - Math.floor(n)) * 2 - 1;
}

function fractalNoise(x: number, y: number, z: number): number {
  return (
    noise3D(x, y, z) * 0.5 +
    noise3D(x * 2.1, y * 2.1, z * 2.1) * 0.25 +
    noise3D(x * 4.3, y * 4.3, z * 4.3) * 0.125
  );
}

// ─── Brain point generation ─────────────────────────────────────────

function generateBrainPoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  const cerebrumCount = Math.floor(count * 0.8);
  const cerebellumCount = Math.floor(count * 0.12);
  const stemCount = count - cerebrumCount - cerebellumCount;

  let idx = 0;

  // --- Cerebrum ---
  for (let i = 0; i < cerebrumCount; i++) {
    const hemisphere = Math.random() > 0.5 ? 1 : -1;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.pow(Math.random(), 0.15);

    let sx = Math.sin(phi) * Math.cos(theta);
    let sy = Math.sin(phi) * Math.sin(theta);
    let sz = Math.cos(phi);

    let x = sx * 0.75;
    let y = sy * 1.1;
    let z = sz * 0.85;

    if (z < 0) z *= 0.5;

    if (y > 0.2) {
      const f = Math.min((y - 0.2) / 0.9, 1);
      x *= 1 + f * 0.15;
      z = z > 0 ? z * (1 + f * 0.2) : z;
    }

    if (y < -0.6) {
      const f = Math.min((-0.6 - y) / 0.5, 1);
      x *= 1 - f * 0.1;
      z = z > 0 ? z * (1 - f * 0.15) : z;
    }

    if (z < 0 && Math.abs(x) > 0.3) {
      const f = Math.min((Math.abs(x) - 0.3) / 0.45, 1);
      z -= f * 0.25;
      if (y > -0.2) y += f * 0.15;
    }

    const fissureGap = 0.06 + 0.04 * Math.max(0, z);
    x = hemisphere * (Math.abs(x) + fissureGap);

    if (z < 0.15 && z > -0.15 && Math.abs(x) > 0.4) {
      const sylvianDepth = 0.07 * Math.max(0, 1 - Math.abs(z) / 0.15);
      const dist = Math.sqrt(x * x + z * z);
      if (dist > 0.5) x *= 1 - sylvianDepth;
    }

    if (r > 0.85) {
      const wrinkle = fractalNoise(x * 4, y * 4, z * 4) * 0.06;
      const mag = Math.sqrt(x * x + y * y + z * z) || 1;
      x += (x / mag) * wrinkle;
      y += (y / mag) * wrinkle;
      z += (z / mag) * wrinkle;
    }

    x *= r;
    y *= r;
    z *= r;

    positions[idx++] = x;
    positions[idx++] = z + 0.25;
    positions[idx++] = y;
  }

  // --- Cerebellum ---
  for (let i = 0; i < cerebellumCount; i++) {
    const hemisphere = Math.random() > 0.5 ? 1 : -1;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.pow(Math.random(), 0.2);

    let x = Math.sin(phi) * Math.cos(theta) * 0.38;
    let y = Math.sin(phi) * Math.sin(theta) * 0.3;
    let z = Math.cos(phi) * 0.25;

    if (z > 0) z *= 0.4;

    const foliaWave = Math.sin(z * 25) * 0.02;
    x += foliaWave;
    x = hemisphere * (Math.abs(x) + 0.02);

    x *= r;
    y *= r;
    z *= r;

    positions[idx++] = x;
    positions[idx++] = z - 0.55 + 0.25;
    positions[idx++] = y - 0.75;
  }

  // --- Brain stem ---
  for (let i = 0; i < stemCount; i++) {
    const t = Math.random();
    const angle = Math.random() * Math.PI * 2;
    const rad = Math.pow(Math.random(), 0.3) * (0.12 - t * 0.04);

    const x = Math.cos(angle) * rad;
    const z = Math.sin(angle) * rad;
    const y = -t * 0.6;

    positions[idx++] = x;
    positions[idx++] = y - 0.55 + 0.25;
    positions[idx++] = z - 0.9;
  }

  return positions;
}

// ─── KNN connections builder ────────────────────────────────────────

interface Connection {
  a: number;
  b: number;
  midpoint: THREE.Vector3;
  length: number;
  surfaceness: number; // 0-1, higher = closer to surface
}

function buildConnections(
  positions: Float32Array,
  count: number,
  k: number,
  maxDist: number
): Connection[] {
  const connections: Connection[] = [];
  const seen = new Set<string>();

  // Simple brute-force KNN for static computation at init
  for (let i = 0; i < count; i++) {
    const ix = positions[i * 3];
    const iy = positions[i * 3 + 1];
    const iz = positions[i * 3 + 2];

    // Collect distances to all other particles
    const neighbors: { idx: number; dist: number }[] = [];
    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      const dx = positions[j * 3] - ix;
      const dy = positions[j * 3 + 1] - iy;
      const dz = positions[j * 3 + 2] - iz;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < maxDist) {
        neighbors.push({ idx: j, dist });
      }
    }

    // Sort and take k nearest
    neighbors.sort((a, b) => a.dist - b.dist);
    const nearest = neighbors.slice(0, k);

    for (const n of nearest) {
      const key =
        Math.min(i, n.idx) + ":" + Math.max(i, n.idx);
      if (seen.has(key)) continue;
      seen.add(key);

      const ax = positions[i * 3],
        ay = positions[i * 3 + 1],
        az = positions[i * 3 + 2];
      const bx = positions[n.idx * 3],
        by = positions[n.idx * 3 + 1],
        bz = positions[n.idx * 3 + 2];

      // Surface-ness: distance of midpoint from brain center
      const mx = (ax + bx) / 2,
        my = (ay + by) / 2,
        mz = (az + bz) / 2;
      const centerDist = Math.sqrt(mx * mx + my * my + mz * mz);

      connections.push({
        a: i,
        b: n.idx,
        midpoint: new THREE.Vector3(mx, my, mz),
        length: n.dist,
        surfaceness: Math.min(centerDist / 0.8, 1),
      });
    }
  }

  return connections;
}

// ─── Adjacency list for impulse cascading ───────────────────────────

function buildAdjacency(
  connections: Connection[]
): Map<number, { connIdx: number; neighbor: number }[]> {
  const adj = new Map<number, { connIdx: number; neighbor: number }[]>();
  for (let ci = 0; ci < connections.length; ci++) {
    const c = connections[ci];
    if (!adj.has(c.a)) adj.set(c.a, []);
    if (!adj.has(c.b)) adj.set(c.b, []);
    adj.get(c.a)!.push({ connIdx: ci, neighbor: c.b });
    adj.get(c.b)!.push({ connIdx: ci, neighbor: c.a });
  }
  return adj;
}

// ─── Impulse system ─────────────────────────────────────────────────

interface Impulse {
  connIdx: number;
  from: number;
  to: number;
  progress: number; // 0 → 1
  speed: number;
  alive: boolean;
}

const MAX_IMPULSES = 30;
const MAX_IMPULSE_POINTS = 150; // 30 impulses × (1 head + 4 trail)
const TRAIL_COUNT = 4;
const POINTS_PER_IMPULSE = 1 + TRAIL_COUNT;

class ImpulseSystem {
  impulses: Impulse[] = [];
  adjacency: Map<number, { connIdx: number; neighbor: number }[]>;
  connections: Connection[];
  positions: Float32Array;

  constructor(
    adjacency: Map<number, { connIdx: number; neighbor: number }[]>,
    connections: Connection[],
    positions: Float32Array
  ) {
    this.adjacency = adjacency;
    this.connections = connections;
    this.positions = positions;
  }

  spawnRandom() {
    if (this.impulses.length >= MAX_IMPULSES) return;
    const connIdx = Math.floor(Math.random() * this.connections.length);
    const conn = this.connections[connIdx];
    const forward = Math.random() > 0.5;
    this.impulses.push({
      connIdx,
      from: forward ? conn.a : conn.b,
      to: forward ? conn.b : conn.a,
      progress: 0,
      speed: 0.8 + Math.random() * 1.2,
      alive: true,
    });
  }

  spawnAt(particleIdx: number) {
    const neighbors = this.adjacency.get(particleIdx);
    if (!neighbors) return;
    // Spawn 1-2 impulses from this particle
    const count = Math.min(
      1 + Math.floor(Math.random() * 2),
      neighbors.length
    );
    for (let i = 0; i < count && this.impulses.length < MAX_IMPULSES; i++) {
      const n = neighbors[Math.floor(Math.random() * neighbors.length)];
      this.impulses.push({
        connIdx: n.connIdx,
        from: particleIdx,
        to: n.neighbor,
        progress: 0,
        speed: 1.0 + Math.random() * 1.5,
        alive: true,
      });
    }
  }

  update(dt: number, impulseActivation: Float32Array) {
    const newImpulses: Impulse[] = [];

    for (const imp of this.impulses) {
      if (!imp.alive) continue;

      imp.progress += imp.speed * dt;

      if (imp.progress >= 1) {
        // Mark activation on arrival particle
        impulseActivation[imp.to] = 1.0;

        // Cascade: ~30% chance to spawn 1-2 new impulses
        if (Math.random() < 0.3) {
          const neighbors = this.adjacency.get(imp.to);
          if (neighbors) {
            const cascadeCount = Math.min(
              1 + Math.floor(Math.random() * 2),
              neighbors.length
            );
            for (let i = 0; i < cascadeCount; i++) {
              const n =
                neighbors[Math.floor(Math.random() * neighbors.length)];
              if (n.neighbor !== imp.from) {
                newImpulses.push({
                  connIdx: n.connIdx,
                  from: imp.to,
                  to: n.neighbor,
                  progress: 0,
                  speed: 0.8 + Math.random() * 1.2,
                  alive: true,
                });
              }
            }
          }
        }
        imp.alive = false;
      }
    }

    // Remove dead, add cascades
    this.impulses = this.impulses.filter((i) => i.alive);
    for (const ni of newImpulses) {
      if (this.impulses.length < MAX_IMPULSES) this.impulses.push(ni);
    }
  }

  writeToBuffers(
    posBuffer: Float32Array,
    colorBuffer: Float32Array,
    sizeBuffer: Float32Array
  ): number {
    let ptIdx = 0;

    for (const imp of this.impulses) {
      if (!imp.alive || ptIdx >= MAX_IMPULSE_POINTS) break;
      const ax = this.positions[imp.from * 3];
      const ay = this.positions[imp.from * 3 + 1];
      const az = this.positions[imp.from * 3 + 2];
      const bx = this.positions[imp.to * 3];
      const by = this.positions[imp.to * 3 + 1];
      const bz = this.positions[imp.to * 3 + 2];

      // Head + trail positions
      for (let t = 0; t < POINTS_PER_IMPULSE && ptIdx < MAX_IMPULSE_POINTS; t++) {
        const trailOffset = t * 0.06;
        const p = Math.max(0, imp.progress - trailOffset);

        posBuffer[ptIdx * 3] = ax + (bx - ax) * p;
        posBuffer[ptIdx * 3 + 1] = ay + (by - ay) * p;
        posBuffer[ptIdx * 3 + 2] = az + (bz - az) * p;

        // Color: white-cyan core, fading trail
        const fade = 1 - t / POINTS_PER_IMPULSE;
        colorBuffer[ptIdx * 3] = THREE.MathUtils.lerp(0.0, 1.0, fade);
        colorBuffer[ptIdx * 3 + 1] = THREE.MathUtils.lerp(0.898, 1.0, fade);
        colorBuffer[ptIdx * 3 + 2] = 1.0;

        sizeBuffer[ptIdx] = (t === 0 ? 0.06 : 0.04 * fade);

        ptIdx++;
      }
    }

    return ptIdx;
  }
}

// ─── Custom particle shader ─────────────────────────────────────────

const particleVertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uMousePosition;
  uniform float uMouseActive;
  uniform float uInteractionRadius;

  attribute vec3 aColor;
  attribute float aPulsePhase;
  attribute float aImpulseActivation;

  varying vec3 vColor;
  varying float vActivation;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Mouse proximity activation (GPU-computed)
    float mouseDist = distance(position, uMousePosition);
    float mouseActivation = uMouseActive * smoothstep(uInteractionRadius, 0.0, mouseDist);

    // Combine with impulse activation
    float activation = max(mouseActivation, aImpulseActivation);

    // Per-particle pulse
    float pulse = sin(uTime * (0.8 + aPulsePhase * 0.4) + aPulsePhase * 6.28) * 0.3 + 0.7;

    // Size: base + activation boost + depth attenuation
    float baseSize = 0.03;
    float size = baseSize * (1.0 + activation * 0.8) * pulse;
    gl_PointSize = size * (300.0 / -mvPosition.z);

    // Color output
    vColor = aColor;
    vActivation = activation;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = /* glsl */ `
  uniform float uBaseOpacity;

  varying vec3 vColor;
  varying float vActivation;

  void main() {
    // Soft radial falloff
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.1, dist) * uBaseOpacity;

    // Brightness boost for activated particles
    vec3 color = vColor + vec3(0.3, 0.3, 0.4) * vActivation;

    gl_FragColor = vec4(color, alpha);
  }
`;

// ─── Impulse point shader ───────────────────────────────────────────

const impulseVertexShader = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSize;

  varying vec3 vColor;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vColor = aColor;
  }
`;

const impulseFragmentShader = /* glsl */ `
  varying vec3 vColor;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, dist);
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// ─── Connection opacity shader (InstancedMesh) ─────────────────────

const connectionVertexShader = /* glsl */ `
  attribute float aOpacity;
  varying float vOpacity;

  void main() {
    vOpacity = aOpacity;
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  }
`;

const connectionFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vOpacity;

  void main() {
    gl_FragColor = vec4(uColor, vOpacity);
  }
`;

// ─── Scene component ────────────────────────────────────────────────

function BrainScene({ darkMode }: { darkMode: boolean }) {
  const PARTICLE_COUNT = 5000;
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const impulsePointsRef = useRef<THREE.Points>(null);
  const connectionMeshRef = useRef<THREE.InstancedMesh>(null);

  // Mouse state
  const mousePos = useRef(new THREE.Vector3(0, 0, 0));
  const mouseActive = useRef(0);
  const mouseTarget = useRef(0);
  const lastImpulseSpawn = useRef(0);

  // Parallax target
  const parallaxTarget = useRef({ x: 0, y: 0 });
  const parallaxCurrent = useRef({ x: 0, y: 0 });

  const { viewport } = useThree();

  // ─── Generate all static data ───────────────────────────────────
  const {
    positions,
    colors,
    pulsePhases,
    connections,
    adjacency,
    connectionMatrices,
    connectionOpacities,
  } = useMemo(() => {
    const pos = generateBrainPoints(PARTICLE_COUNT);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const px = pos[i * 3];
      const py = pos[i * 3 + 1];
      const pz = pos[i * 3 + 2];

      const heightFactor = THREE.MathUtils.clamp((py + 0.5) / 1.2, 0, 1);
      const depthFactor = THREE.MathUtils.clamp((pz + 1) / 1.5, 0, 1);
      const t = heightFactor * 0.6 + depthFactor * 0.4;

      col[i * 3] = THREE.MathUtils.lerp(0.0, 0.482, 1 - t);
      col[i * 3 + 1] = THREE.MathUtils.lerp(0.898, 0.380, 1 - t);
      col[i * 3 + 2] = 1.0;

      const jitter =
        (noise3D(px * 10, py * 10, pz * 10) * 0.5 + 0.5) * 0.15;
      col[i * 3] = Math.min(1, col[i * 3] + jitter);
      col[i * 3 + 1] = Math.min(1, col[i * 3 + 1] + jitter * 0.5);

      phases[i] = Math.random();
    }

    // Build connections (KNN k=3, maxDist=0.15)
    const conns = buildConnections(pos, PARTICLE_COUNT, 3, 0.15);

    // Build adjacency
    const adj = buildAdjacency(conns);

    // Pre-compute instance matrices for connections
    const matrices = new Float32Array(conns.length * 16);
    const opacities = new Float32Array(conns.length);
    const tempMatrix = new THREE.Matrix4();
    const tempPos = new THREE.Vector3();
    const tempScale = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);

    const dir = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const rotMatrix = new THREE.Matrix4();

    for (let i = 0; i < conns.length; i++) {
      const c = conns[i];
      const ax = pos[c.a * 3],
        ay = pos[c.a * 3 + 1],
        az = pos[c.a * 3 + 2];
      const bx = pos[c.b * 3],
        by = pos[c.b * 3 + 1],
        bz = pos[c.b * 3 + 2];

      tempPos.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);

      // Rotation: orient Y axis along connection direction
      dir.set(bx - ax, by - ay, bz - az);
      const len = dir.length();
      dir.normalize();

      quat.setFromUnitVectors(up, dir);
      rotMatrix.makeRotationFromQuaternion(quat);

      // Build matrix: T * R * S
      tempMatrix.makeTranslation(tempPos.x, tempPos.y, tempPos.z);
      tempMatrix.multiply(rotMatrix);
      tempScale.set(1, len, 1);
      tempMatrix.scale(tempScale);

      tempMatrix.toArray(matrices, i * 16);

      // Base opacity: low, biased by surface-ness
      opacities[i] = 0.08 + c.surfaceness * 0.1;
    }

    return {
      positions: pos,
      colors: col,
      pulsePhases: phases,
      connections: conns,
      adjacency: adj,
      connectionMatrices: matrices,
      connectionOpacities: opacities,
    };
  }, []);

  // ─── Impulse system ─────────────────────────────────────────────
  const impulseSystem = useMemo(
    () => new ImpulseSystem(adjacency, connections, positions),
    [adjacency, connections, positions]
  );

  // ─── Particle geometry ──────────────────────────────────────────
  const particleGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute(
      "aPulsePhase",
      new THREE.BufferAttribute(pulsePhases, 1)
    );
    geo.setAttribute(
      "aImpulseActivation",
      new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT), 1)
    );
    return geo;
  }, [positions, colors, pulsePhases]);

  // ─── Particle material ─────────────────────────────────────────
  const particleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMousePosition: { value: new THREE.Vector3(0, 0, 0) },
        uMouseActive: { value: 0 },
        uInteractionRadius: { value: 0.4 },
        uBaseOpacity: { value: darkMode ? 0.55 : 0.7 },
      },
      transparent: true,
      depthWrite: false,
      blending: darkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
  }, [darkMode]);

  // ─── Impulse points geometry ────────────────────────────────────
  const impulseGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(MAX_IMPULSE_POINTS * 3), 3)
    );
    geo.setAttribute(
      "aColor",
      new THREE.BufferAttribute(new Float32Array(MAX_IMPULSE_POINTS * 3), 3)
    );
    geo.setAttribute(
      "aSize",
      new THREE.BufferAttribute(new Float32Array(MAX_IMPULSE_POINTS), 1)
    );
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  const impulseMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: impulseVertexShader,
      fragmentShader: impulseFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // ─── Connection InstancedMesh ───────────────────────────────────
  const connectionGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.001, 0.001, 1, 3, 1);
  }, []);

  const connectionMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: connectionVertexShader,
      fragmentShader: connectionFragmentShader,
      uniforms: {
        uColor: {
          value: new THREE.Color(
            darkMode ? 0x00e5ff : 0x007088
          ),
        },
      },
      transparent: true,
      depthWrite: false,
      blending: darkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
  }, [darkMode]);

  // ─── Dispose GPU resources on unmount / theme change ─────────────
  useEffect(() => {
    return () => {
      particleMaterial.dispose();
      connectionMaterial.dispose();
      particleGeometry.dispose();
      impulseGeometry.dispose();
      connectionGeometry.dispose();
      impulseMaterial.dispose();
    };
  }, [particleMaterial, connectionMaterial, particleGeometry, impulseGeometry, connectionGeometry, impulseMaterial]);

  // ─── Initialize connection InstancedMesh ────────────────────────
  useEffect(() => {
    const mesh = connectionMeshRef.current;
    if (!mesh) return;

    const tempMatrix = new THREE.Matrix4();
    for (let i = 0; i < connections.length; i++) {
      tempMatrix.fromArray(connectionMatrices, i * 16);
      mesh.setMatrixAt(i, tempMatrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    // Set per-instance opacity attribute
    const opacityAttr = new THREE.InstancedBufferAttribute(
      connectionOpacities.slice(),
      1
    );
    mesh.geometry.setAttribute("aOpacity", opacityAttr);
  }, [connections, connectionMatrices, connectionOpacities]);

  // ─── Mouse handlers ─────────────────────────────────────────────
  const onPointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      mousePos.current.copy(e.point);
      mouseTarget.current = 1;
      parallaxTarget.current.x = (e.point.x / (viewport.width / 2)) * 5;
      parallaxTarget.current.y = (e.point.y / (viewport.height / 2)) * 5;
    },
    [viewport]
  );

  const onPointerLeave = useCallback(() => {
    mouseTarget.current = 0;
    parallaxTarget.current.x = 0;
    parallaxTarget.current.y = 0;
  }, []);

  // ─── Random impulse spawning timer ──────────────────────────────
  const nextSpawnTime = useRef(Math.random() * 0.5);

  // ─── Frame loop ─────────────────────────────────────────────────
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05); // clamp large deltas
    const time = state.clock.elapsedTime;

    // ─ Smooth mouse active ─
    mouseActive.current = THREE.MathUtils.lerp(
      mouseActive.current,
      mouseTarget.current,
      dt * 2
    );

    // ─ Parallax tilt ─
    parallaxCurrent.current.x = THREE.MathUtils.lerp(
      parallaxCurrent.current.x,
      parallaxTarget.current.x,
      dt * 3
    );
    parallaxCurrent.current.y = THREE.MathUtils.lerp(
      parallaxCurrent.current.y,
      parallaxTarget.current.y,
      dt * 3
    );

    // ─ Group rotation + parallax ─
    if (groupRef.current) {
      // Base rotation with micro-oscillation
      const baseY = time * 0.06;
      const microOsc = Math.sin(time * 0.3) * 0.01 + Math.cos(time * 0.17) * 0.008;
      groupRef.current.rotation.y =
        baseY + microOsc + (parallaxCurrent.current.x * Math.PI) / 180 * 5;
      groupRef.current.rotation.x =
        -0.1 + (parallaxCurrent.current.y * Math.PI) / 180 * 5;

      // Per-region breathing (using scale variations via noise)
      const breath = 1 + Math.sin(time * 0.5) * 0.015 + Math.sin(time * 0.3 + 1) * 0.008;
      groupRef.current.scale.setScalar(breath);
    }

    // ─ Update particle uniforms ─
    particleMaterial.uniforms.uTime.value = time;
    particleMaterial.uniforms.uMousePosition.value.copy(mousePos.current);
    particleMaterial.uniforms.uMouseActive.value = mouseActive.current;

    // ─ Random impulse spawning ─
    nextSpawnTime.current -= dt;
    if (nextSpawnTime.current <= 0) {
      impulseSystem.spawnRandom();
      nextSpawnTime.current = 0.1 + Math.random() * 0.4;
    }

    // ─ Mouse impulse spawning ─
    if (mouseActive.current > 0.5) {
      lastImpulseSpawn.current -= dt;
      if (lastImpulseSpawn.current <= 0) {
        // Find closest particles to mouse
        let closestIdx = 0;
        let closestDist = Infinity;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const dx = positions[i * 3] - mousePos.current.x;
          const dy = positions[i * 3 + 1] - mousePos.current.y;
          const dz = positions[i * 3 + 2] - mousePos.current.z;
          const dist = dx * dx + dy * dy + dz * dz;
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
          }
        }
        impulseSystem.spawnAt(closestIdx);
        lastImpulseSpawn.current = 0.08 + Math.random() * 0.12;
      }
    }

    // ─ Impulse activation attribute (decay + update) ─
    const impulseActivation = particleGeometry.getAttribute(
      "aImpulseActivation"
    ) as THREE.BufferAttribute;
    const activationArray = impulseActivation.array as Float32Array;

    // Decay all activations
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      activationArray[i] = Math.max(0, activationArray[i] - dt * 2);
    }

    // Update impulse system
    impulseSystem.update(dt, activationArray);
    impulseActivation.needsUpdate = true;

    // ─ Write impulse points ─
    const ipGeo = impulseGeometry;
    const posAttr = ipGeo.getAttribute("position") as THREE.BufferAttribute;
    const colAttr = ipGeo.getAttribute("aColor") as THREE.BufferAttribute;
    const sizeAttr = ipGeo.getAttribute("aSize") as THREE.BufferAttribute;

    const count = impulseSystem.writeToBuffers(
      posAttr.array as Float32Array,
      colAttr.array as Float32Array,
      sizeAttr.array as Float32Array
    );

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
    ipGeo.setDrawRange(0, count);

    // ─ Update connection opacities near mouse ─
    if (connectionMeshRef.current) {
      const opAttr = connectionMeshRef.current.geometry.getAttribute(
        "aOpacity"
      ) as THREE.InstancedBufferAttribute;
      if (opAttr) {
        const opArray = opAttr.array as Float32Array;
        for (let i = 0; i < connections.length; i++) {
          const c = connections[i];
          const baseBrightness = darkMode ? (0.08 + c.surfaceness * 0.1) : (0.12 + c.surfaceness * 0.15);

          if (mouseActive.current > 0.1) {
            const dist = c.midpoint.distanceTo(mousePos.current);
            const boost = mouseActive.current * Math.max(0, 1 - dist / 0.4) * 0.4;
            opArray[i] = baseBrightness + boost;
          } else {
            opArray[i] = baseBrightness;
          }
        }
        opAttr.needsUpdate = true;
      }
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {/* Particles */}
        <points
          ref={particlesRef}
          geometry={particleGeometry}
          material={particleMaterial}
        />

        {/* Impulse points */}
        <points
          ref={impulsePointsRef}
          geometry={impulseGeometry}
          material={impulseMaterial}
        />

        {/* Connections */}
        <instancedMesh
          ref={connectionMeshRef}
          args={[connectionGeometry, connectionMaterial, connections.length]}
          frustumCulled={false}
        />

        {/* Invisible raycast sphere */}
        <mesh
          visible={false}
          onPointerMove={(e) => {
            e.stopPropagation();
            onPointerMove(e);
          }}
          onPointerLeave={onPointerLeave}
        >
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>

      {/* Postprocessing */}
      <EffectComposer>
        <Bloom
          intensity={darkMode ? 0.6 : 0.3}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.8}
        />
      </EffectComposer>
    </>
  );
}

// ─── Main export ────────────────────────────────────────────────────

export function ParticleBrain({ darkMode = true }: { darkMode?: boolean }) {
  return (
    <Canvas
      camera={{ position: [1.2, 0.5, 2.0], fov: 50 }}
      dpr={[1, 2]}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "auto",
      }}
      gl={{ alpha: true, antialias: false }}
    >
      <BrainScene darkMode={darkMode} />
    </Canvas>
  );
}
