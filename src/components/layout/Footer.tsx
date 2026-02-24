import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { navLinks, footerExtraLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";

const socialLinks = [
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="container-wide py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              href="/"
              className="font-display text-xl font-bold text-text-primary transition-colors hover:text-accent-primary"
            >
              Ishan Perera
            </Link>
            <p className="text-sm text-text-muted">
              Neurosurgeon &middot; Developer &middot; Researcher
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary transition-colors hover:text-accent-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {footerExtraLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-text-muted transition-colors hover:text-accent-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted transition-colors hover:text-accent-primary"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Ishan Perera. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
