import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

const links = [
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
];

export function SocialLinks() {
  return (
    <div className="space-y-4">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg border border-border bg-bg-secondary p-4 text-text-secondary transition-all hover:border-accent-primary/30 hover:text-accent-primary"
        >
          <link.icon size={20} />
          <span className="font-mono text-sm">{link.label}</span>
        </a>
      ))}
    </div>
  );
}
