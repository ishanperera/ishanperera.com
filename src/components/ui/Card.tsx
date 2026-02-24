import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-bg-secondary p-6",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/30 hover:glow-cyan",
        className
      )}
    >
      {children}
    </div>
  );
}
