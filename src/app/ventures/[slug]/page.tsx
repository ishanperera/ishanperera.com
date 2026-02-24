import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ventureCaseStudies } from "@/data/ventures";

export function generateStaticParams() {
  return ventureCaseStudies.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venture = ventureCaseStudies.find((v) => v.slug === slug);
  if (!venture) return {};

  return {
    title: venture.name,
    description: venture.tagline,
  };
}

export default async function VenturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venture = ventureCaseStudies.find((v) => v.slug === slug);

  if (!venture) notFound();

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="container-wide py-16">
        <ScrollReveal>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-sm text-text-muted hover:text-accent-primary transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>
          <SectionHeading
            overline={`// ${venture.role} — ${venture.period}`}
            title={venture.name}
            description={venture.tagline}
          />
          {venture.links && (
            <div className="flex gap-4 mt-4">
              {venture.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm text-accent-primary hover:underline"
                >
                  {link.label} <ExternalLink size={14} />
                </a>
              ))}
            </div>
          )}
        </ScrollReveal>
      </section>

      {/* Problem / Solution */}
      <section className="container-wide pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal>
            <Card hover={false}>
              <h3 className="font-display text-lg font-bold text-text-primary mb-4">
                The Problem
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {venture.problem}
              </p>
            </Card>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Card hover={false}>
              <h3 className="font-display text-lg font-bold text-accent-primary mb-4">
                The Solution
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {venture.solution}
              </p>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container-wide pb-24">
        <ScrollReveal>
          <h3 className="font-display text-xl font-bold text-text-primary mb-6">
            Tech Stack & Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {venture.techStack.map((tech) => (
              <Badge key={tech} variant="accent">
                {tech}
              </Badge>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Features */}
      <section className="container-wide pb-24">
        <ScrollReveal>
          <h3 className="font-display text-xl font-bold text-text-primary mb-8">
            What We Built
          </h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {venture.features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.1}>
              <Card>
                <h4 className="font-display font-semibold text-text-primary mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-text-secondary">
                  {feature.description}
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="container-wide pb-24">
        <ScrollReveal>
          <h3 className="font-display text-xl font-bold text-text-primary mb-8">
            By the Numbers
          </h3>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {venture.outcomes.map((outcome, i) => (
            <ScrollReveal key={outcome.metric} delay={i * 0.1}>
              <div className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-accent-primary">
                  {outcome.value}
                </p>
                <p className="text-sm text-text-muted mt-1">
                  {outcome.metric}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
