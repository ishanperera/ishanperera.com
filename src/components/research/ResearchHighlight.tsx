import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Publication } from "@/data/publications";

interface ResearchHighlightProps {
  publication: Publication;
}

export function ResearchHighlight({ publication }: ResearchHighlightProps) {
  return (
    <Card className="p-8">
      <div className="flex flex-wrap gap-2 mb-4">
        {publication.tags.map((tag) => (
          <Badge key={tag} variant="accent">
            {tag}
          </Badge>
        ))}
      </div>
      <h3 className="font-display text-xl font-bold text-text-primary mb-3">
        {publication.title}
      </h3>
      <p className="text-sm text-text-muted mb-3">
        {publication.authors} &middot; {publication.journal} &middot;{" "}
        {publication.year}
      </p>
      {publication.abstract && (
        <p className="text-sm text-text-secondary leading-relaxed">
          {publication.abstract}
        </p>
      )}
      {publication.doi && (
        <a
          href={`https://doi.org/${publication.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 font-mono text-xs text-accent-primary hover:underline"
        >
          DOI: {publication.doi}
        </a>
      )}
    </Card>
  );
}
