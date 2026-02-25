"use client";

import { Twitter, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://ishanperera.com/blog/${slug}`;

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const buttonClass =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-secondary text-text-muted transition-colors hover:text-accent-primary hover:border-accent-primary/30";

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono text-text-muted mr-1">Share</span>
      <button onClick={shareOnTwitter} className={buttonClass} aria-label="Share on X/Twitter">
        <Twitter size={15} />
      </button>
      <button onClick={shareOnLinkedIn} className={buttonClass} aria-label="Share on LinkedIn">
        <Linkedin size={15} />
      </button>
      <button onClick={copyLink} className={buttonClass} aria-label="Copy link">
        {copied ? <Check size={15} /> : <Link2 size={15} />}
      </button>
    </div>
  );
}
