"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  FileText,
  User,
  FlaskConical,
  FolderOpen,
  BookOpen,
  Wrench,
  FileText as FileTextIcon,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Sun,
  Moon,
  Copy,
  Rss,
} from "lucide-react";
import { navLinks, footerExtraLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";

interface BlogPostMeta {
  slug: string;
  title: string;
}

const pageIcons: Record<string, React.ReactNode> = {
  "/about": <User size={16} />,
  "/research": <FlaskConical size={16} />,
  "/projects": <FolderOpen size={16} />,
  "/blog": <BookOpen size={16} />,
  "/uses": <Wrench size={16} />,
  "/cv": <FileTextIcon size={16} />,
  "/contact": <Mail size={16} />,
};

export function CommandPalette({ posts }: { posts: BlogPostMeta[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const runAction = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command palette"
        className="fixed inset-0 z-[100]"
      >
        <div
          className="fixed inset-0 bg-bg-primary/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[101]">
          <div className="mx-4 overflow-hidden rounded-xl border border-border bg-bg-secondary shadow-2xl">
            <Command.Input
              placeholder="Search pages, posts, actions..."
              className="w-full border-b border-border bg-transparent px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted"
            />
            <Command.List className="max-h-80 overflow-y-auto p-2">
              <Command.Empty className="px-4 py-8 text-center text-sm text-text-muted">
                No results found.
              </Command.Empty>

              <Command.Group
                heading="Pages"
                className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-text-muted"
              >
                {[...navLinks, ...footerExtraLinks].map((link) => (
                  <Command.Item
                    key={link.href}
                    value={link.label}
                    onSelect={() => runAction(() => router.push(link.href))}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary cursor-pointer data-[selected=true]:bg-bg-tertiary data-[selected=true]:text-accent-primary"
                  >
                    {pageIcons[link.href] || <FileText size={16} />}
                    {link.label}
                  </Command.Item>
                ))}
              </Command.Group>

              {posts.length > 0 && (
                <Command.Group
                  heading="Blog Posts"
                  className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-text-muted"
                >
                  {posts.map((post) => (
                    <Command.Item
                      key={post.slug}
                      value={post.title}
                      onSelect={() =>
                        runAction(() => router.push(`/blog/${post.slug}`))
                      }
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary cursor-pointer data-[selected=true]:bg-bg-tertiary data-[selected=true]:text-accent-primary"
                    >
                      <BookOpen size={16} />
                      {post.title}
                    </Command.Item>
                  ))}
                </Command.Group>
              )}

              <Command.Group
                heading="Actions"
                className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-text-muted"
              >
                <Command.Item
                  value="Copy email"
                  onSelect={() =>
                    runAction(() => {
                      navigator.clipboard.writeText(siteConfig.email);
                    })
                  }
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary cursor-pointer data-[selected=true]:bg-bg-tertiary data-[selected=true]:text-accent-primary"
                >
                  <Copy size={16} />
                  Copy email
                </Command.Item>
                <Command.Item
                  value="Toggle theme dark light"
                  onSelect={() =>
                    runAction(() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    )
                  }
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary cursor-pointer data-[selected=true]:bg-bg-tertiary data-[selected=true]:text-accent-primary"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  Toggle theme
                </Command.Item>
                <Command.Item
                  value="RSS feed"
                  onSelect={() =>
                    runAction(() => window.open("/feed.xml", "_blank"))
                  }
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary cursor-pointer data-[selected=true]:bg-bg-tertiary data-[selected=true]:text-accent-primary"
                >
                  <Rss size={16} />
                  RSS Feed
                </Command.Item>
              </Command.Group>

              <Command.Group
                heading="Social"
                className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-text-muted"
              >
                <Command.Item
                  value="GitHub"
                  onSelect={() =>
                    runAction(() =>
                      window.open(siteConfig.social.github, "_blank")
                    )
                  }
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary cursor-pointer data-[selected=true]:bg-bg-tertiary data-[selected=true]:text-accent-primary"
                >
                  <Github size={16} />
                  GitHub
                </Command.Item>
                <Command.Item
                  value="LinkedIn"
                  onSelect={() =>
                    runAction(() =>
                      window.open(siteConfig.social.linkedin, "_blank")
                    )
                  }
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary cursor-pointer data-[selected=true]:bg-bg-tertiary data-[selected=true]:text-accent-primary"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </Command.Item>
                <Command.Item
                  value="Twitter X"
                  onSelect={() =>
                    runAction(() =>
                      window.open(siteConfig.social.twitter, "_blank")
                    )
                  }
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-text-secondary cursor-pointer data-[selected=true]:bg-bg-tertiary data-[selected=true]:text-accent-primary"
                >
                  <Twitter size={16} />
                  X / Twitter
                </Command.Item>
              </Command.Group>
            </Command.List>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
}
