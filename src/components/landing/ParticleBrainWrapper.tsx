"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";

const ParticleBrain = dynamic(
  () =>
    import("./ParticleBrain").then((mod) => ({ default: mod.ParticleBrain })),
  { ssr: false }
);

export function ParticleBrainWrapper() {
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();

  if (prefersReducedMotion) return null;

  return <ParticleBrain darkMode={resolvedTheme !== "light"} />;
}
