import { getAllPosts } from "@/lib/mdx";
import { CommandPalette } from "./CommandPalette";

export function CommandPaletteProvider() {
  const posts = getAllPosts().map((p) => ({ slug: p.slug, title: p.title }));
  return <CommandPalette posts={posts} />;
}
