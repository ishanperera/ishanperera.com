"use client";

import { cn } from "@/lib/utils";

interface GlowingOrbProps {
  className?: string;
  color?: "cyan" | "purple" | "mixed";
}

const colorStyles = {
  cyan: "bg-accent-primary/20 blur-[100px]",
  purple: "bg-accent-secondary/20 blur-[100px]",
  mixed:
    "bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 blur-[120px]",
};

export function GlowingOrb({ className, color = "cyan" }: GlowingOrbProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-64 w-64 rounded-full animate-[pulse_6s_ease-in-out_infinite]",
        colorStyles[color],
        className
      )}
    />
  );
}
