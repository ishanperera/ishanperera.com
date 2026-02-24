"use client";

import { Car, Beer, Leaf, Languages, Sprout, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Spotlight } from "@/components/ui/Spotlight";

const hobbies = [
  {
    icon: Car,
    title: "Automotive",
    description:
      "Hands-on work with Nissan, Toyota, and Ford vehicles — a mechanical counterpoint to the digital world.",
  },
  {
    icon: Beer,
    title: "Distilling & Brewing",
    description:
      "Amateur distiller, brewer, vintner, and mixologist. It's chemistry, patience, and creativity — not unlike research.",
  },
  {
    icon: Leaf,
    title: "Horticulture & Mycology",
    description:
      "Amateur horticulturist and mycologist. Founded the HOLO Labs VCOM Community Garden providing free organic produce to students and staff.",
  },
  {
    icon: Languages,
    title: "Languages",
    description:
      "Conversational in Spanish and Sinhalese alongside English. Language shapes how you connect with patients and communities.",
  },
  {
    icon: Sprout,
    title: "Community Gardening",
    description:
      "From the Christiansburg Community Garden to the VCOM campus — soil-tested, planned, and harvested seasonal plants for free community distribution.",
  },
  {
    icon: Heart,
    title: "Volunteering",
    description:
      "Ronald McDonald House, Habitat for Humanity, Virginia Beach EMS, ESL tutoring, and over a decade of community service across Virginia and Florida.",
  },
];

export function HobbiesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
