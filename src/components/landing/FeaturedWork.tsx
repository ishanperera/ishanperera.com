"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";

const featured = [
  {
    overline: "Publication",
    title: "Machine Learning Applications in Neurosurgical Outcome Prediction",
    description:
      "Leveraging AI/ML to predict surgical outcomes and improve patient care. Published research exploring the intersection of computational methods and neurosurgery.",
    tags: ["AI/ML", "Neurosurgery", "Research"],
    href: "/research",
    direction: "left" as const,
  },
  {
    overline: "Venture",
    title: "Ravana Solutions",
    description:
      "Co-founded a full-service digital agency building modern web applications, mobile apps, and AI-powered solutions for businesses across industries.",
    tags: ["Next.js", "React Native", "AI", "Agency"],
    href: "https://ravanasolutions.com",
    external: true,
    direction: "right" as const,
  },
  {
    overline: "Open Source",
    title: "Developer Tools & Projects",
    description:
      "Building and contributing to open-source tools that help developers and researchers be more productive. From CLI tools to full-stack applications.",
    tags: ["TypeScript", "Python", "Open Source"],
    href: "/projects",
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
