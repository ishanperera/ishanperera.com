"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

const ParticleBrain = dynamic(
  () =>
    import("./ParticleBrain").then((mod) => ({ default: mod.ParticleBrain })),
  { ssr: false }
);

export function ParticleBrainWrapper() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return <ParticleBrain />;
}
