import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { nowData } from "@/data/now";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Ishan Perera is currently working on — clinical rotations, research projects, side projects, and learning.",
};

export default function NowPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="container-wide py-16">
        <ScrollReveal>
          <SectionHeading
            overline="// now"
            title="What I'm Doing Now"
            description={nowData.intro}
          />
          <p className="font-mono text-sm text-text-muted mt-2">
            Last updated: {formatDate(nowData.lastUpdated)}
          </p>
        </ScrollReveal>
      </section>

      {nowData.sections.map((section) => (
        <section key={section.category} className="container-wide pb-16">
          <ScrollReveal>
            <Card hover={false}>
              <h3 className="font-display text-lg font-bold text-text-primary mb-4">
                {section.category}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-primary shrink-0" />
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </ScrollReveal>
        </section>
      ))}

      <section className="container-wide pb-16">
        <ScrollReveal>
          <p className="text-sm text-text-muted">
            This page is inspired by{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-primary hover:underline"
            >
              nownownow.com
            </a>
            .
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
