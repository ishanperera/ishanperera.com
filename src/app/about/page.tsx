import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Badge } from "@/components/ui/Badge";
import { Timeline } from "@/components/about/Timeline";
import { HobbiesGrid } from "@/components/about/HobbiesGrid";
import { technicalSkills, medicalSkills } from "@/data/skills";

export const metadata: Metadata = {
  title: "About",
  description:
    "Neurosurgeon, software developer, researcher, and entrepreneur — learn about Ishan Perera's journey and passions.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Page Hero */}
      <section className="container-wide py-16">
        <ScrollReveal>
          <SectionHeading
            overline="// about"
            title="The Full Story"
            description="Neurosurgeon by training. Developer by passion. Entrepreneur by nature."
          />
        </ScrollReveal>
      </section>

      {/* Bio */}
      <section className="container-wide pb-24">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border">
              <Image
                src="/headshot.jpg"
                alt="Ishan Perera, D.O."
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6 text-text-secondary leading-relaxed">
              <p>
                I&apos;m Ishan Perera — a PGY-1 Neurological Surgery Resident at
                Henry Ford Health Providence Hospital through Michigan State
                University College of Human Medicine, where I also serve as a
                Clinical Instructor in the Department of Surgery.
              </p>
              <p>
                My path has never been linear. I grew up working at the family
                store, earned my EMT-B at 18, and spent two years as an Emergency
                Department Technician at Sentara Princess Anne Hospital. I graduated
                Summa Cum Laude from Old Dominion University with a B.S. in Biology
                and minors in Chemistry and Computer Science, then earned my D.O.
                from Edward Via College of Osteopathic Medicine with a 3.84 GPA —
                where I was named Student Doctor of the Year and a Golden Ticket
                Scholarship Finalist.
              </p>
              <p>
                In medical school I co-founded HOLO Labs, the first student-led
                research laboratory at VCOM to adopt a research brokership model.
                I&apos;ve published 11 peer-reviewed works with 8+ more in progress,
                presented 19 posters at national and regional conferences (including
                AANS), and secured over $33,000 in research grants. I also served as
                Chair of the Medical Student Section of the Medical Society of
                Virginia, Deputy Editor at Cureus Journal, and co-chaired the
                Overdose Prevention Task Force.
              </p>
              <p>
                Outside the hospital and lab, I founded Ravana Solutions (a digital
                agency), co-founded EZ Inn, and build software in React, Python,
                Swift, and C++. When I truly need to unplug, you&apos;ll find me
                working on automotive projects, brewing, cultivating mushrooms, or
                volunteering — from Habitat for Humanity to the Ronald McDonald
                House.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Timeline */}
      <section className="container-wide pb-24">
        <ScrollReveal>
          <SectionHeading
            overline="// journey"
            title="Key Milestones"
          />
        </ScrollReveal>
        <Timeline />
      </section>

      {/* Skills */}
      <section className="container-wide pb-24">
        <ScrollReveal>
          <SectionHeading
            overline="// skills & tools"
            title="What I Work With"
          />
        </ScrollReveal>

        <div className="space-y-12">
          <div>
            <h3 className="font-display text-xl font-bold text-text-primary mb-6">
              Technical
            </h3>
            <div className="space-y-6">
              {technicalSkills.map((category) => (
                <ScrollReveal key={category.name}>
                  <div>
                    <h4 className="font-mono text-sm text-text-muted mb-3">
                      {category.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge key={skill} variant="accent">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold text-text-primary mb-6">
              Medical
            </h3>
            <div className="space-y-6">
              {medicalSkills.map((category) => (
                <ScrollReveal key={category.name}>
                  <div>
                    <h4 className="font-mono text-sm text-text-muted mb-3">
                      {category.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge key={skill} variant="purple">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies */}
      <section id="hobbies" className="container-wide pb-24">
        <ScrollReveal>
          <SectionHeading
            overline="// beyond medicine & code"
            title="The Polymath Corner"
            description="Life is more than work. Here's what fuels me outside the hospital and the IDE."
          />
        </ScrollReveal>
        <HobbiesGrid />
      </section>
    </div>
  );
}
