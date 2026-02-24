"use client";

import { Car, Beer, Leaf, Languages } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Spotlight } from "@/components/ui/Spotlight";

const hobbies = [
  {
    icon: Car,
    title: "'65 Mustang",
    description:
      "Restoring a classic 1965 Ford Mustang — hands-on mechanical work that's a perfect counterpoint to the digital world.",
  },
  {
    icon: Beer,
    title: "Homebrewing",
    description:
      "Crafting beers from scratch. It's chemistry, patience, and creativity — not unlike research.",
  },
  {
    icon: Leaf,
    title: "Mycology",
    description:
      "Growing and studying mushrooms. Fascinated by fungal biology, cultivation techniques, and gourmet varieties.",
  },
  {
    icon: Languages,
    title: "3 Languages",
    description:
      "Fluent in English, Sinhala, and Spanish. Language shapes how you think and connect with the world.",
  },
];

export function HobbiesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {hobbies.map((hobby, i) => (
        <ScrollReveal key={hobby.title} delay={i * 0.1}>
          <Spotlight className="h-full rounded-xl border border-border bg-bg-secondary p-6">
            <hobby.icon className="text-accent-primary mb-4" size={28} />
            <h3 className="font-display text-lg font-bold text-text-primary mb-2">
              {hobby.title}
            </h3>
            <p className="text-sm text-text-secondary">{hobby.description}</p>
          </Spotlight>
        </ScrollReveal>
      ))}
    </div>
  );
}
