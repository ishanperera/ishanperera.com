import type { Metadata } from "next";
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
            <div className="aspect-[4/5] rounded-xl bg-bg-tertiary border border-border" />
            <div className="space-y-6 text-text-secondary leading-relaxed">
              <p>
                I&apos;m Ishan Perera — a PGY-1 Neurosurgery Resident at Henry Ford
                Providence Hospital, where I&apos;m training to become a neurosurgeon
                while simultaneously building software, publishing research, and
                growing businesses.
              </p>
              <p>
                My path has never been linear. I fell in love with programming as a
                teenager, studied the sciences in college, and went to medical school
                determined to merge my two worlds. Along the way, I co-founded Ravana
                Solutions (a digital agency), became co-owner of EZ Lounge, and joined
                the board at HOLO Labs.
              </p>
              <p>
                With 15+ peer-reviewed publications spanning AI/ML, neurosurgery, and
                medical education, I believe the future of medicine is computational —
                and I want to build it. When I&apos;m not in the OR or at a keyboard,
                you&apos;ll find me restoring a &apos;65 Mustang, homebrewing, or
                tending to my mushroom cultivation projects.
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
