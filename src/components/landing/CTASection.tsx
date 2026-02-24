"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="container-wide text-center">
        <ScrollReveal>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Let&apos;s{" "}
            <span className="text-gradient">connect</span>.
          </h2>
          <p className="text-text-secondary text-lg max-w-lg mx-auto mb-8">
            Whether it&apos;s research collaboration, a project idea, or just a
            conversation — I&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-primary px-8 py-3 font-display font-semibold text-bg-primary transition-all hover:gap-4 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
          >
            Get in Touch <ArrowRight size={18} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
