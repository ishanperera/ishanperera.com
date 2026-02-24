import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinks } from "@/components/contact/SocialLinks";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ishan Perera — research collaborations, project inquiries, or just a conversation.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="container-wide py-16">
        <ScrollReveal>
          <SectionHeading
            overline="// contact"
            title="Get in Touch"
            description="Whether it's research collaboration, a project idea, or just a conversation — I'd love to hear from you."
          />
        </ScrollReveal>
      </section>

      <section className="container-wide pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12">
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                  Let&apos;s Connect
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  I&apos;m always open to discussing research opportunities,
                  interesting projects, or potential collaborations. Find me on
                  these platforms or send a message directly.
                </p>
              </div>
              <SocialLinks />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="rounded-xl border border-border bg-bg-secondary p-8">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
