"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Simple seeded pseudo-random noise for consistent sulci patterns
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

function generateBrainPoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  // Allocate: 80% cerebrum, 12% cerebellum, 8% brain stem
  const cerebrumCount = Math.floor(count * 0.8);
  const cerebellumCount = Math.floor(count * 0.12);
  const stemCount = count - cerebrumCount - cerebellumCount;

  let idx = 0;

  // --- Cerebrum (two hemispheres) ---
  for (let i = 0; i < cerebrumCount; i++) {
    const hemisphere = Math.random() > 0.5 ? 1 : -1;

    // Spherical sampling, biased toward surface
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    // Surface-bias: cube root pushes points toward r=1
    const r = Math.pow(Math.random(), 0.15);

    let sx = Math.sin(phi) * Math.cos(theta);
    let sy = Math.sin(phi) * Math.sin(theta);
    let sz = Math.cos(phi);

    // --- Anatomical profile (side view = Y-Z plane) ---
    // Y = anterior-posterior, Z = superior-inferior, X = lateral

    // Base cerebrum dimensions: wide, long, tall
    let x = sx * 0.75; // lateral half-width
    let y = sy * 1.1;  // anterior-posterior
    let z = sz * 0.85; // superior-inferior

    // Flatten the bottom (inferior surface is flatter)
    if (z < 0) {
      z *= 0.5;
    }

    // Frontal lobe: wider and taller in front
    if (y > 0.2) {
      const frontalFactor = Math.min((y - 0.2) / 0.9, 1);
      x *= 1 + frontalFactor * 0.15;
      z = z > 0 ? z * (1 + frontalFactor * 0.2) : z;
    }

    // Occipital lobe: slight posterior bulge
    if (y < -0.6) {
      const occFactor = Math.min((-0.6 - y) / 0.5, 1);
      x *= 1 - occFactor * 0.1;
      z = z > 0 ? z * (1 - occFactor * 0.15) : z;
    }

    // Temporal lobe: lateral-inferior bulge
    if (z < 0 && Math.abs(x) > 0.3) {
      const tempFactor = Math.min((Math.abs(x) - 0.3) / 0.45, 1);
      z -= tempFactor * 0.25;
      // Temporal lobe extends forward
      if (y > -0.2) y += tempFactor * 0.15;
    }

    // Central (longitudinal) fissure — separate hemispheres
    const fissureGap = 0.06 + 0.04 * Math.max(0, z); // wider gap on top
    x = hemisphere * (Math.abs(x) + fissureGap);

    // Lateral (Sylvian) fissure — indent between frontal/parietal and temporal
    if (z < 0.15 && z > -0.15 && Math.abs(x) > 0.4) {
      const sylvianDepth = 0.07 * Math.max(0, 1 - Math.abs(z) / 0.15);
      const distFromSurface = Math.sqrt(x * x + z * z);
      if (distFromSurface > 0.5) {
        x *= 1 - sylvianDepth;
      }
    }

    // Sulci/gyri surface wrinkles (only on surface particles)
    if (r > 0.85) {
      const wrinkle = fractalNoise(x * 4, y * 4, z * 4) * 0.06;
      const nx = x / (Math.sqrt(x * x + y * y + z * z) || 1);
      const ny = y / (Math.sqrt(x * x + y * y + z * z) || 1);
      const nz = z / (Math.sqrt(x * x + y * y + z * z) || 1);
      x += nx * wrinkle;
      y += ny * wrinkle;
      z += nz * wrinkle;
    }

    // Apply surface bias
    x *= r;
    y *= r;
    z *= r;

    positions[idx++] = x;
    positions[idx++] = z + 0.25; // shift up (Z becomes Y in view)
    positions[idx++] = y;        // Y becomes Z (depth)
  }

  // --- Cerebellum (back-bottom, tightly packed folds) ---
  for (let i = 0; i < cerebellumCount; i++) {
    const hemisphere = Math.random() > 0.5 ? 1 : -1;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.pow(Math.random(), 0.2);

    let x = Math.sin(phi) * Math.cos(theta) * 0.38;
    let y = Math.sin(phi) * Math.sin(theta) * 0.3;
    let z = Math.cos(phi) * 0.25;

    // Flatten top of cerebellum
    if (z > 0) z *= 0.4;

    // Horizontal folia (folds) — cerebellar signature
    const foliaWave = Math.sin(z * 25) * 0.02;
    x += foliaWave;

    x = hemisphere * (Math.abs(x) + 0.02);

    // Apply radius and position behind/below cerebrum
    x *= r;
    y *= r;
    z *= r;

    positions[idx++] = x;
    positions[idx++] = z - 0.55 + 0.25; // below cerebrum
    positions[idx++] = y - 0.75;         // behind cerebrum
  }

  // --- Brain stem (connects cerebrum to spinal cord) ---
  for (let i = 0; i < stemCount; i++) {
    const t = Math.random();
    const angle = Math.random() * Math.PI * 2;
    const r = Math.pow(Math.random(), 0.3) * (0.12 - t * 0.04);

    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = -t * 0.6; // extends downward

    positions[idx++] = x;
    positions[idx++] = y - 0.55 + 0.25; // below cerebellum
    positions[idx++] = z - 0.9;         // behind cerebellum
  }

  return positions;
}

function Particles({ darkMode = true }: { darkMode?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 3500;
    const pos = generateBrainPoints(count);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const px = pos[i * 3];
      const py = pos[i * 3 + 1]; // height (superior-inferior)
      const pz = pos[i * 3 + 2]; // depth (anterior-posterior)

      // Color by region: upper cerebrum = cyan, lower/posterior = purple
      const heightFactor = THREE.MathUtils.clamp((py + 0.5) / 1.2, 0, 1);
      const depthFactor = THREE.MathUtils.clamp((pz + 1) / 1.5, 0, 1);
      const t = heightFactor * 0.6 + depthFactor * 0.4;

      // Cyan (#00E5FF) → Purple (#7B61FF)
      col[i * 3] = THREE.MathUtils.lerp(0.0, 0.482, 1 - t);
      col[i * 3 + 1] = THREE.MathUtils.lerp(0.898, 0.380, 1 - t);
      col[i * 3 + 2] = 1.0;

      // Add slight variation per-particle
      const jitter = (noise3D(px * 10, py * 10, pz * 10) * 0.5 + 0.5) * 0.15;
      col[i * 3] = Math.min(1, col[i * 3] + jitter);
      col[i * 3 + 1] = Math.min(1, col[i * 3 + 1] + jitter * 0.5);
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Slow rotation — start tilted for recognizable profile
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.06;
    pointsRef.current.rotation.x = -0.1;

    // Subtle breathing scale
    const breath = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    pointsRef.current.scale.setScalar(breath);
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={darkMode ? 0.55 : 0.7}
        sizeAttenuation
        depthWrite={false}
        blending={darkMode ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

export function ParticleBrain({ darkMode = true }: { darkMode?: boolean }) {
  return (
    <Canvas
      camera={{ position: [1.5, 0.8, 2.8], fov: 50 }}
      dpr={[1, 1.5]}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
      gl={{ alpha: true, antialias: false }}
    >
      <Particles darkMode={darkMode} />
    </Canvas>
  );
}
