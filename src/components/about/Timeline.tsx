"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TimelineItem } from "./TimelineItem";
import { timeline } from "@/data/timeline";

export function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

      <div className="space-y-12">
        {timeline.map((event, i) => (
          <ScrollReveal key={`${event.year}-${event.title}`} direction="left" delay={i * 0.1}>
            <TimelineItem event={event} index={i} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
