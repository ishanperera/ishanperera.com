"use client";

import { cn } from "@/lib/utils";

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientBorder({ children, className }: GradientBorderProps) {
  return (
    <div className={cn("relative rounded-xl p-[1px]", className)}>
      <div
        className="absolute inset-0 rounded-xl animate-[spin_4s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg, var(--accent-primary), var(--accent-secondary), var(--accent-primary))",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
          borderRadius: "inherit",
        }}
      />
      <div className="relative rounded-xl bg-bg-secondary">{children}</div>
    </div>
  );
}
