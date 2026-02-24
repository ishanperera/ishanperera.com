import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ResearchHighlight } from "@/components/research/ResearchHighlight";
import { PublicationList } from "@/components/research/PublicationList";
import { publications } from "@/data/publications";

export const metadata: Metadata = {
  title: "Research",
  description:
    "15+ publications spanning AI/ML, neurosurgery, and medical education. Explore Ishan Perera's research portfolio.",
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
            description="15+ publications spanning AI/ML, neurosurgery, and medical education."
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
            title="Full Publication List"
          />
        </ScrollReveal>
        <PublicationList />
      </section>
    </div>
  );
}
