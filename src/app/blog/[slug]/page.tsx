import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { Comments } from "@/components/blog/Comments";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { getPostBySlug, getAllSlugs } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="pt-24 pb-16">
      <div className="container-wide py-16">
        <ScrollReveal>
          <Link
            href="/blog"

            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent-primary transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-text-muted mb-12">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readingTime} min read
              </span>
            </div>
            <ShareButtons title={post.title} slug={slug} />
          </div>
        </ScrollReveal>

        <div className="flex gap-12">
          <article className="prose max-w-none flex-1 min-w-0">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                    [rehypePrettyCode, { theme: "github-dark-default" }],
                  ],
                },
              }}
            />
          </article>

          <aside className="hidden xl:block w-64 flex-shrink-0">
            <TableOfContents />
          </aside>
        </div>

        {/* Comments */}
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-8">
            Comments
          </h2>
          <Comments />
        </div>
      </div>
    </div>
  );
}
