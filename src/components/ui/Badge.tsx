import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "purple";
  className?: string;
}

const variantStyles = {
  default: "bg-bg-tertiary text-text-secondary border-border",
  accent: "bg-accent-primary/10 text-accent-primary border-accent-primary/20",
  purple: "bg-accent-secondary/10 text-accent-secondary border-accent-secondary/20",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-mono",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
