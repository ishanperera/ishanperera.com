"use client";

import { Brain, Code, BookOpen, Rocket, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BentoCard } from "./BentoCard";

const cards = [
  {
    title: "Neurosurgery",
    description:
      "PGY-1 Neurological Surgery Resident at Henry Ford Health Providence Hospital. Clinical Instructor, Department of Surgery, Michigan State University College of Human Medicine.",
    href: "/about",
    icon: <Brain size={28} />,
    tags: ["Residency", "MSU", "Henry Ford"],
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Code & Engineering",
    description:
      "Full-stack development in C++, Java, Python, Swift, React, and Next.js. Built DRPLAP, DRP Submissions App, and run a digital agency.",
    href: "/projects",
    icon: <Code size={28} />,
    tags: ["React", "Python", "Swift", "C++"],
    className: "md:col-span-1",
  },
  {
    title: "Research",
    description:
      "11 published works, 8+ in progress, 19 poster presentations, and $33K+ in grants. Focus areas: Chiari malformation, AI in medical education, and OMM.",
    href: "/research",
    icon: <BookOpen size={28} />,
    tags: ["Neurosurgery", "AI/ML", "OMM"],
    className: "md:col-span-1",
  },
  {
    title: "Ventures",
    description:
      "Owner of Ravana Solutions (digital agency), Co-Founder of EZ Inn, and Co-Founder of HOLO Labs research laboratory.",
    href: "/projects",
    icon: <Rocket size={28} />,
    tags: ["Ravana Solutions", "EZ Inn", "HOLO Labs"],
    className: "md:col-span-1",
  },
  {
    title: "The Polymath",
    description:
      "Automotive mechanic, amateur distiller & brewer, mycologist, community gardener, and conversational in Spanish and Sinhalese.",
    href: "/about#hobbies",
    icon: <Sparkles size={28} />,
    tags: ["Automotive", "Brewing", "Mycology", "Languages"],
    className: "md:col-span-1",
    accent: true,
  },
];

export function BentoGrid() {
  return (
    <section id="at-a-glance" className="py-24">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            overline="// at a glance"
            title="Many Hats, One Mission"
            description="A quick look at what I do and who I am."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.1}>
              <BentoCard {...card} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
