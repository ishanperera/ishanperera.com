import { Star, GitFork, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { languageColors } from "@/lib/github";
import type { GitHubRepo } from "@/types/github";
import { formatDate } from "@/lib/utils";

interface GitHubRepoCardProps {
  repo: GitHubRepo;
}

export function GitHubRepoCard({ repo }: GitHubRepoCardProps) {
  return (
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="group block">
      <Card className="h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-mono text-sm font-semibold text-text-primary group-hover:text-accent-primary transition-colors truncate">
            {repo.name}
          </h3>
          <ExternalLink size={14} className="text-text-muted flex-shrink-0 ml-2" />
        </div>

        <p className="text-sm text-text-secondary mb-4 flex-1 line-clamp-2">
          {repo.description || "No description provided."}
        </p>

        <div className="flex items-center gap-4 text-xs text-text-muted mt-auto">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor:
                    languageColors[repo.language] || "#6B7280",
                }}
              />
              {repo.language}
            </span>
          )}
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1">
              <Star size={12} />
              {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1">
              <GitFork size={12} />
              {repo.forks_count}
            </span>
          )}
          <span className="ml-auto">
            {formatDate(repo.updated_at)}
          </span>
        </div>
      </Card>
    </a>
  );
}
