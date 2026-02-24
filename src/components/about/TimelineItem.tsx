import { cn } from "@/lib/utils";
import type { TimelineEvent } from "@/data/timeline";

const typeColors: Record<TimelineEvent["type"], string> = {
  education: "bg-accent-secondary",
  career: "bg-accent-primary",
  venture: "bg-green-500",
  achievement: "bg-yellow-500",
};

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
}

export function TimelineItem({ event, index }: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex items-start gap-8 pl-12 md:pl-0">
      {/* Dot */}
      <div
        className={cn(
          "absolute left-4 md:left-1/2 h-3 w-3 rounded-full -translate-x-1/2 mt-1.5 ring-4 ring-bg-primary",
          typeColors[event.type]
        )}
      />

      {/* Content */}
      <div
        className={cn(
          "w-full md:w-[calc(50%-2rem)]",
          isEven ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8 md:text-right"
        )}
      >
        <span className="font-mono text-sm text-accent-primary">{event.year}</span>
        <h3 className="font-display text-lg font-bold text-text-primary mt-1">
          {event.title}
        </h3>
        <p className="text-sm text-text-secondary mt-2">{event.description}</p>
      </div>
    </div>
  );
}
