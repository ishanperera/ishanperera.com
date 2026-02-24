import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GuestbookEntries } from "@/components/guestbook/GuestbookEntries";

export const metadata: Metadata = {
  title: "Guestbook",
  description:
    "Leave a message in Ishan Perera's guestbook — say hello, share a thought, or just leave your mark.",
};

export default function GuestbookPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="container-wide py-16">
        <ScrollReveal>
          <SectionHeading
            overline="// guestbook"
            title="Leave Your Mark"
            description="Say hello, share a thought, or just let me know you stopped by."
          />
        </ScrollReveal>
      </section>

      <section className="container-wide pb-24 max-w-2xl">
        <ScrollReveal>
          <GuestbookEntries />
        </ScrollReveal>
      </section>
    </div>
  );
}
