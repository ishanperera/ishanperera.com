import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { VentureShowcase } from "@/components/projects/VentureShowcase";
import { GitHubRepoCard } from "@/components/projects/GitHubRepoCard";
import { getGitHubRepos } from "@/lib/github";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "From digital agencies to open source — explore Ishan Perera's ventures and software projects.",
};

export default async function ProjectsPage() {
  const repos = await getGitHubRepos();

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="container-wide py-16">
        <ScrollReveal>
          <SectionHeading
            overline="// projects"
            title="Projects"
            description="From digital agencies to open source."
          />
        </ScrollReveal>
      </section>

      {/* Ventures */}
      <section className="container-wide pb-24">
        <ScrollReveal>
          <h3 className="font-mono text-sm text-accent-primary mb-6">
            // ventures
          </h3>
        </ScrollReveal>
        <VentureShowcase />
      </section>

      {/* GitHub Repos */}
      <section className="container-wide pb-24">
        <ScrollReveal>
          <SectionHeading
            overline="// open source"
            title="GitHub Repositories"
            description="Auto-populated from GitHub. Updated hourly."
          />
        </ScrollReveal>

        {repos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, i) => (
              <ScrollReveal key={repo.id} delay={i * 0.05}>
                <GitHubRepoCard repo={repo} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-bg-secondary p-12 text-center">
            <p className="text-text-muted">
              Unable to load repositories. Check back later.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
