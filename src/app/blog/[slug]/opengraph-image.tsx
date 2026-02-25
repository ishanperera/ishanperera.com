import { ImageResponse } from "next/og";
import { getPostBySlug, getAllSlugs } from "@/lib/mdx";

export const runtime = "nodejs";
export const alt = "Blog post by Ishan Perera";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "#0A0A0F",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
            color: "#F0F0F5",
            fontSize: 48,
          }}
        >
          Post not found
        </div>
      ),
      { ...size }
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0F",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Cyan accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #00E5FF, #7B61FF)",
          }}
        />

        {/* Tags */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          {post.tags.slice(0, 4).map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(0, 229, 255, 0.15)",
                color: "#00E5FF",
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: post.title.length > 60 ? 44 : 56,
            fontWeight: 700,
            color: "#F0F0F5",
            lineHeight: 1.15,
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {post.title}
        </div>

        {/* Bottom row: date + reading time | branding */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", gap: 24, color: "#A0A0B8", fontSize: 18 }}>
            <span>{formattedDate}</span>
            <span>&middot;</span>
            <span>{post.readingTime} min read</span>
          </div>
          <div style={{ color: "#5A5A72", fontSize: 18 }}>ishanperera.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
