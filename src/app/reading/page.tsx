import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { books, statusLabels, categoryLabels } from "@/data/books";
import type { BookStatus } from "@/data/books";

export const metadata: Metadata = {
  title: "Reading",
  description:
    "What Ishan Perera is reading — books on neuroscience, software engineering, business, and philosophy.",
};

const statusOrder: BookStatus[] = ["reading", "finished", "want-to-read"];

export default function ReadingPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="container-wide py-16">
        <ScrollReveal>
          <SectionHeading
            overline="// reading"
            title="Bookshelf"
            description="A mix of neuroscience, software, business, and everything in between."
          />
        </ScrollReveal>
      </section>

      {statusOrder.map((status) => {
        const filtered = books.filter((b) => b.status === status);
        if (filtered.length === 0) return null;

        return (
          <section key={status} className="container-wide pb-24">
            <ScrollReveal>
              <h3 className="font-display text-xl font-bold text-text-primary mb-6">
                {statusLabels[status]}
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((book) => (
                <ScrollReveal key={book.title}>
                  <Card>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-display font-semibold text-text-primary">
                          {book.title}
                        </h4>
                        <p className="text-sm text-text-muted mt-0.5">
                          {book.author}
                        </p>
                      </div>
                      <Badge
                        variant={
                          book.category === "neuroscience" || book.category === "philosophy"
                            ? "purple"
                            : "accent"
                        }
                      >
                        {categoryLabels[book.category]}
                      </Badge>
                    </div>
                    {book.note && (
                      <p className="text-sm text-text-secondary mt-3 italic">
                        {book.note}
                      </p>
                    )}
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
