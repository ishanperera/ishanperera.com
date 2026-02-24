"use client";

import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  tags?: string[];
  className?: string;
  accent?: boolean;
}

export function BentoCard({
  title,
  description,
  href,
  icon,
  tags,
  className,
  accent,
}: BentoCardProps) {
  return (
    <Link href={href} className={cn("group block", className)}>
      <Spotlight
        className={cn(
          "h-full rounded-xl border bg-bg-secondary p-6 transition-all duration-300 group-hover:-translate-y-1",
          accent
            ? "border-accent-primary/30 glow-cyan"
            : "border-border group-hover:border-accent-primary/30 group-hover:glow-cyan"
        )}
      >
        <div className="flex h-full flex-col">
          {icon && (
            <div className="mb-4 text-accent-primary">{icon}</div>
          )}
          <h3 className="font-display text-xl font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-text-secondary flex-1">{description}</p>
          {tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-bg-tertiary px-2.5 py-0.5 text-xs font-mono text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Spotlight>
    </Link>
  );
}
