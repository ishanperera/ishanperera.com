import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { usesCategories } from "@/data/uses";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "The tools, hardware, and software Ishan Perera uses for neurosurgery research, software development, and entrepreneurship.",
};

export default function UsesPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="container-wide py-16">
        <ScrollReveal>
          <SectionHeading
            overline="// uses"
            title="What I Use"
            description="The tools and technologies that power my work across medicine, code, and business."
          />
        </ScrollReveal>
      </section>

      {usesCategories.map((category) => (
        <section key={category.title} className="container-wide pb-24">
          <ScrollReveal>
            <h3 className="font-display text-xl font-bold text-text-primary mb-6">
              {category.title}
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.items.map((item) => (
              <ScrollReveal key={item.name}>
                <Card className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-semibold text-text-primary">
                        {item.name}
                      </h4>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-muted hover:text-accent-primary transition-colors"
                          aria-label={`Visit ${item.name}`}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary mt-1">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
