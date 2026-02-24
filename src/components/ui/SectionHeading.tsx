import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  overline?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  overline,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {overline && (
        <span className="font-mono text-sm text-accent-primary mb-3 block">
          {overline}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-text-secondary text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
