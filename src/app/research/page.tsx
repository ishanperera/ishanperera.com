import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { ResearchHighlight } from "@/components/research/ResearchHighlight";
import { PublicationList } from "@/components/research/PublicationList";
import { publications, researchInProgress } from "@/data/publications";

export const metadata: Metadata = {
  title: "Research",
  description:
    "11 published works, 8+ in progress, 19 poster presentations, and $33K+ in research grants. Explore Ishan Perera's research portfolio.",
};

export default function ResearchPage() {
  const featured = publications.filter((p) => p.featured);

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="container-wide py-16">
        <ScrollReveal>
          <SectionHeading
            overline="// research"
            title="Research"
            description="11 published works, 8+ in progress, 19 poster presentations at national and regional conferences, and $33K+ in research grants."
          />
        </ScrollReveal>
      </section>

      {/* Featured */}
      <section className="container-wide pb-24">
        <ScrollReveal>
          <h3 className="font-mono text-sm text-accent-primary mb-6">
            // featured research
          </h3>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((pub, i) => (
            <ScrollReveal key={pub.title} delay={i * 0.1}>
              <ResearchHighlight publication={pub} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* All Publications */}
      <section className="container-wide pb-24">
        <ScrollReveal>
          <SectionHeading
            overline="// all publications"
            title="Published Works"
          />
        </ScrollReveal>
        <PublicationList />
      </section>

      {/* Research in Progress */}
      <section className="container-wide pb-24">
        <ScrollReveal>
          <SectionHeading
            overline="// in progress"
            title="Research in Progress"
            description="Ongoing studies and manuscripts in various stages of completion."
          />
        </ScrollReveal>
        <Card hover={false} className="divide-y divide-border">
          {researchInProgress.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="py-4 first:pt-0 last:pb-0">
                <p className="text-sm text-text-secondary">{item}</p>
              </div>
            </ScrollReveal>
          ))}
        </Card>
      </section>
    </div>
  );
}
