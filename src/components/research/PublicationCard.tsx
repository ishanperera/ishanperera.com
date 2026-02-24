import { Badge } from "@/components/ui/Badge";
import type { Publication } from "@/data/publications";

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <div className="border-b border-border py-6 last:border-0">
      <div className="flex flex-wrap gap-2 mb-2">
        {publication.tags.map((tag) => (
          <Badge key={tag} variant="accent">
            {tag}
          </Badge>
        ))}
        <span className="font-mono text-xs text-text-muted ml-auto">
          {publication.year}
        </span>
      </div>
      <h3 className="font-display text-base font-semibold text-text-primary mb-1">
        {publication.title}
      </h3>
      <p className="text-sm text-text-muted">
        {publication.authors} &middot; <span className="italic">{publication.journal}</span>
      </p>
      {publication.doi && (
        <a
          href={`https://doi.org/${publication.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 font-mono text-xs text-accent-primary hover:underline"
        >
          DOI: {publication.doi}
        </a>
      )}
    </div>
  );
}
