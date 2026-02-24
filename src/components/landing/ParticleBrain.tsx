"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function generateBrainPoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    // Generate points in a brain-like shape using two overlapping ellipsoids
    // with a central fissure
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    // Decide hemisphere
    const hemisphere = Math.random() > 0.5 ? 1 : -1;

    // Base ellipsoid shape
    let x = 1.6 * Math.sin(phi) * Math.cos(theta);
    let y = 1.2 * Math.sin(phi) * Math.sin(theta);
    let z = 1.0 * Math.cos(phi);

    // Shift hemispheres apart to create central fissure
    x += hemisphere * 0.15;

    // Add cerebellum bulge at the back-bottom
    if (Math.random() < 0.15) {
      x = (Math.random() - 0.5) * 1.0;
      y = -0.8 + Math.random() * 0.4;
      z = -0.6 + (Math.random() - 0.5) * 0.6;
    }

    // Add frontal lobe prominence
    if (y > 0.6 && Math.random() < 0.3) {
      y += 0.3;
      x *= 0.8;
    }

    // Surface noise for organic feel
    const noise = 0.92 + Math.random() * 0.16;
    x *= noise;
    y *= noise;
    z *= noise;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  return positions;
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 2500;
    const pos = generateBrainPoints(count);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Mix between cyan (#00E5FF) and purple (#7B61FF) based on position
      const t = (pos[i * 3] + 1.8) / 3.6; // normalize x to 0-1
      // Cyan: 0, 0.898, 1.0  Purple: 0.482, 0.380, 1.0
      col[i * 3] = THREE.MathUtils.lerp(0, 0.482, t);
      col[i * 3 + 1] = THREE.MathUtils.lerp(0.898, 0.380, t);
      col[i * 3 + 2] = 1.0;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Slow rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.08;

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
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleBrain() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      dpr={[1, 1.5]}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
      gl={{ alpha: true, antialias: false }}
    >
      <Particles />
    </Canvas>
  );
}
