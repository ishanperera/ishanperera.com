"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { MDXComponents } from "mdx/types";

function CodeBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const code = (children as any)?.props?.children || "";
    navigator.clipboard.writeText(typeof code === "string" ? code : "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md bg-bg-tertiary text-text-muted hover:text-text-primary"
        aria-label="Copy code"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <pre
        className="overflow-x-auto rounded-xl border border-border bg-bg-secondary p-4 text-sm"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border-l-4 border-accent-primary bg-accent-primary/5 p-4">
      <div className="text-sm text-text-secondary">{children}</div>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="font-display text-3xl font-bold text-text-primary mt-12 mb-4 scroll-mt-24"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-display text-2xl font-bold text-text-primary mt-10 mb-4 scroll-mt-24"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-display text-xl font-semibold text-text-primary mt-8 mb-3 scroll-mt-24"
      {...props}
    />
  ),
  p: (props) => (
    <p className="text-text-secondary leading-relaxed mb-4" {...props} />
  ),
  a: (props) => (
    <a
      className="text-accent-primary underline underline-offset-4 hover:text-accent-primary/80 transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-text-secondary" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-text-secondary" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-accent-secondary pl-4 italic text-text-muted"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-bg-tertiary px-1.5 py-0.5 font-mono text-sm text-accent-primary"
      {...props}
    />
  ),
  pre: CodeBlock,
  hr: () => <hr className="my-8 border-border" />,
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-xl border border-border my-6" alt="" {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-border bg-bg-tertiary px-4 py-2 text-left font-display text-text-primary"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-border px-4 py-2 text-text-secondary" {...props} />
  ),
  Callout,
};
