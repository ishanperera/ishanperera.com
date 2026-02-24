import type { GitHubRepo } from "@/types/github";
import { siteConfig } from "@/data/site";

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${siteConfig.githubUsername}/repos?per_page=100&sort=updated`,
      {
        headers,
        next: { revalidate: 3600 }, // ISR: 1 hour
      }
    );

    if (!res.ok) {
      console.error("GitHub API error:", res.status);
      return [];
    }

    const repos: GitHubRepo[] = await res.json();

    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

// Language color mapping
export const languageColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  Swift: "#FA7343",
  Java: "#007396",
  "C++": "#00599C",
  C: "#A8B9CC",
  Rust: "#DEA584",
  Go: "#00ADD8",
  Ruby: "#CC342D",
  PHP: "#777BB4",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Shell: "#89E051",
  Jupyter: "#F37626",
  R: "#276DC3",
};
