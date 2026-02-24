"use client";

import { Brain, Code, BookOpen, Rocket, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BentoCard } from "./BentoCard";

const cards = [
  {
    title: "Neurosurgery",
    description:
      "PGY-1 Neurosurgery Resident at Henry Ford Providence Hospital. Training at the intersection of surgical precision and technological innovation.",
    href: "/about",
    icon: <Brain size={28} />,
    tags: ["Residency", "Henry Ford"],
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Code & Engineering",
    description:
      "Full-stack development with React, Python, Next.js, and Swift. Building tools that bridge medicine and technology.",
    href: "/projects",
    icon: <Code size={28} />,
    tags: ["React", "Python", "Next.js", "Swift"],
    className: "md:col-span-1",
  },
  {
    title: "Research",
    description:
      "15+ publications spanning AI/ML, neurosurgery, and medical education. Advancing the field through data-driven inquiry.",
    href: "/research",
    icon: <BookOpen size={28} />,
    tags: ["AI/ML", "Neurosurgery"],
    className: "md:col-span-1",
  },
  {
    title: "Ventures",
    description:
      "Co-founder of Ravana Solutions (digital agency), co-owner of EZ Lounge, board member at HOLO Labs.",
    href: "/projects",
    icon: <Rocket size={28} />,
    tags: ["Ravana Solutions", "EZ Lounge", "HOLO Labs"],
    className: "md:col-span-1",
  },
  {
    title: "The Polymath",
    description:
      "Restoring a '65 Mustang, homebrewing, cultivating mushrooms, and fluent in three languages. Renaissance man energy.",
    href: "/about#hobbies",
    icon: <Sparkles size={28} />,
    tags: ["Mustang", "Brewing", "Mycology", "3 Languages"],
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
