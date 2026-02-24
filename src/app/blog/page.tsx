import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on neurosurgery, software development, AI/ML, and the intersection of medicine and technology.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-24 pb-16">
      <section className="container-wide py-16">
        <ScrollReveal>
          <SectionHeading
            overline="// blog"
            title="Blog"
            description="Thoughts on neurosurgery, software development, AI/ML, and the spaces in between."
          />
        </ScrollReveal>
      </section>

      <section className="container-wide pb-24">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.1}>
                <BlogCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-bg-secondary p-12 text-center">
            <p className="text-text-muted mb-2">No posts yet.</p>
            <p className="text-sm text-text-muted">
              Check back soon — I&apos;m working on something.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
