"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";

const featured = [
  {
    overline: "Publication",
    title: "Geometric Morphometric Analysis of Brainstem and Cerebellum in Chiari I Malformation",
    description:
      "A novel 3D geometric morphometric protocol for identifying Chiari I Malformation, published in Frontiers in Neuroanatomy. Presented at AANS 2023 and 2025 Annual Scientific Meetings.",
    tags: ["Neurosurgery", "Morphometrics", "Frontiers"],
    href: "/research",
    direction: "left" as const,
  },
  {
    overline: "Venture",
    title: "Ravana Solutions",
    description:
      "Co-founded a full-service digital agency building modern web applications, mobile apps, and AI-powered solutions. Serving businesses across industries since 2021.",
    tags: ["Next.js", "React Native", "AI/ML", "Web Development"],
    href: "https://www.ravanasolutions.com/",
    external: true,
    direction: "right" as const,
  },
  {
    overline: "Research",
    title: "Predicting NYHA Heart Failure Classification with AI",
    description:
      "Developed a voice recognition-based analytical model to predict heart failure classification from medical student notes. Published in Scientific Reports (Nature).",
    tags: ["AI/ML", "NLP", "Scientific Reports"],
    href: "/research",
    direction: "left" as const,
  },
];

export function FeaturedWork() {
  return (
    <section className="py-24 bg-bg-secondary/50">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            overline="// featured work"
            title="Highlights"
            description="A curated selection of research, ventures, and projects."
          />
        </ScrollReveal>

        <div className="space-y-16">
          {featured.map((item, i) => (
            <ScrollReveal key={item.title} direction={item.direction} delay={0.1}>
              <div
                className={`flex flex-col md:flex-row gap-8 items-start ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 space-y-4">
                  <span className="font-mono text-xs text-accent-primary tracking-widest uppercase">
                    {item.overline}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="accent">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-sm text-accent-primary hover:underline mt-2"
                    >
                      Visit site <ExternalLink size={14} />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 font-mono text-sm text-accent-primary hover:underline mt-2"
                    >
                      Learn more <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
                <div className="flex-1 h-48 md:h-64 w-full rounded-xl bg-bg-tertiary border border-border" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
