import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ventures } from "@/data/projects";

export function VentureShowcase() {
  const featured = ventures.find((v) => v.featured);
  const others = ventures.filter((v) => !v.featured);

  return (
    <div className="space-y-6">
      {/* Featured venture — full width */}
      {featured && (
        <ScrollReveal>
          <Card className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <span className="font-mono text-xs text-accent-primary tracking-widest uppercase">
                  {featured.role}
                </span>
                <h3 className="font-display text-3xl font-bold text-text-primary mt-2 mb-4">
                  {featured.name}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {featured.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.tags.map((tag) => (
                    <Badge key={tag} variant="accent">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-6">
                  <Link
                    href={`/ventures/${featured.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-sm text-accent-primary hover:underline"
                  >
                    View case study <ArrowRight size={14} />
                  </Link>
                  {featured.url && (
                    <a
                      href={featured.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-sm text-text-muted hover:text-accent-primary transition-colors"
                    >
                      Visit site <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
              <div className="w-full md:w-80 h-48 rounded-xl bg-bg-tertiary border border-border flex-shrink-0" />
            </div>
          </Card>
        </ScrollReveal>
      )}

      {/* Other ventures — side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {others.map((venture, i) => (
          <ScrollReveal key={venture.name} delay={i * 0.1}>
            <Card className="h-full">
              <span className="font-mono text-xs text-accent-secondary tracking-widest uppercase">
                {venture.role}
              </span>
              <h3 className="font-display text-xl font-bold text-text-primary mt-2 mb-3">
                {venture.name}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                {venture.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {venture.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <Link
                href={`/ventures/${venture.slug}`}
                className="inline-flex items-center gap-2 font-mono text-sm text-accent-primary hover:underline"
              >
                View case study <ArrowRight size={14} />
              </Link>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
