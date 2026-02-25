import type { Metadata } from "next";
import { Download, Mail, Github, Linkedin, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PrintButton } from "./PrintButton";
import { siteConfig } from "@/data/site";
import { education, experience, awards, certifications, volunteerExperience, languages } from "@/data/cv";
import { publications, researchInProgress } from "@/data/publications";
import { technicalSkills, medicalSkills } from "@/data/skills";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Curriculum vitae of Ishan Perera, D.O. — Neurosurgery resident, software developer, researcher, and entrepreneur.",
};

export default function CVPage() {
  return (
    <div className="pt-24 pb-16 print:pt-0 print:pb-0">
      {/* Header */}
      <section className="container-wide py-12 print:py-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary">
                Ishan Perera, D.O.
              </h1>
              <p className="text-lg text-text-secondary mt-2">
                PGY-1 Neurological Surgery Resident &middot; Clinical Instructor
              </p>
              <p className="text-sm text-text-muted mt-1">
                Henry Ford Health Providence Hospital &middot; MSU College of Human Medicine
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Mail size={14} />
                  {siteConfig.email}
                </span>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-accent-primary transition-colors"
                >
                  <Github size={14} />
                  GitHub
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-accent-primary transition-colors"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  Southfield, MI
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 print:hidden">
              <a
                href="/Ishan-Perera-CV.pdf"
                download
                className="inline-flex items-center gap-2 rounded-lg bg-accent-primary px-4 py-2.5 font-display font-semibold text-sm text-bg-primary transition-all hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
              >
                <Download size={16} /> Download PDF
              </a>
              <PrintButton />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Education */}
      <section className="container-wide pb-16 print:pb-8">
        <ScrollReveal>
          <SectionHeading overline="// education" title="Education" />
        </ScrollReveal>
        <div className="space-y-4">
          {education.map((edu) => (
            <ScrollReveal key={edu.degree}>
              <Card hover={false}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-text-primary">
                      {edu.degree}
                    </h3>
                    <p className="text-text-secondary">{edu.institution}</p>
                    <p className="text-sm text-text-muted">{edu.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-accent-primary">{edu.period}</p>
                    <p className="text-sm text-text-muted">GPA: {edu.gpa}</p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="container-wide pb-16 print:pb-8">
        <ScrollReveal>
          <SectionHeading overline="// experience" title="Professional Experience" />
        </ScrollReveal>
        <div className="space-y-4">
          {experience.map((exp) => (
            <ScrollReveal key={exp.title}>
              <Card hover={false}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-text-primary">
                      {exp.title}
                    </h3>
                    <p className="text-text-secondary">{exp.organization}</p>
                  </div>
                  <p className="font-mono text-sm text-accent-primary whitespace-nowrap">
                    {exp.period}
                  </p>
                </div>
                <ul className="space-y-1">
                  {exp.highlights.map((h) => (
                    <li key={h} className="text-sm text-text-muted flex items-start gap-2">
                      <span className="text-accent-primary mt-1.5 text-[6px]">&#9679;</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Research & Publications */}
      <section className="container-wide pb-16 print:pb-8">
        <ScrollReveal>
          <SectionHeading
            overline="// research"
            title="Publications"
            description={`${publications.length} published · ${researchInProgress.length} in progress`}
          />
        </ScrollReveal>
        <div className="space-y-3">
          {publications.map((pub) => (
            <ScrollReveal key={pub.title}>
              <Card hover={false} className="py-4">
                <div className="flex flex-col gap-1">
                  <h4 className="font-display text-sm font-semibold text-text-primary leading-snug">
                    {pub.title}
                  </h4>
                  <p className="text-xs text-text-muted">{pub.authors}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-xs text-text-secondary italic">
                      {pub.journal} ({pub.year})
                    </span>
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent-primary hover:underline"
                      >
                        DOI
                      </a>
                    )}
                    {pub.tags.map((tag) => (
                      <Badge key={tag} variant="accent" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="container-wide pb-16 print:pb-8">
        <ScrollReveal>
          <SectionHeading overline="// skills" title="Skills & Tools" />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold text-text-primary mb-4">
              Technical
            </h3>
            <div className="space-y-4">
              {technicalSkills.map((category) => (
                <div key={category.name}>
                  <h4 className="font-mono text-xs text-text-muted mb-2">
                    {category.name}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="accent">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-text-primary mb-4">
              Medical
            </h3>
            <div className="space-y-4">
              {medicalSkills.map((category) => (
                <div key={category.name}>
                  <h4 className="font-mono text-xs text-text-muted mb-2">
                    {category.name}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="purple">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="container-wide pb-16 print:pb-8">
        <ScrollReveal>
          <SectionHeading overline="// awards" title="Honors & Awards" />
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {awards.map((award) => (
            <ScrollReveal key={award.title}>
              <Card hover={false} className="py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-display text-sm font-bold text-text-primary">
                      {award.title}
                    </h4>
                    <p className="text-xs text-text-muted">{award.organization}</p>
                  </div>
                  <span className="font-mono text-xs text-accent-primary whitespace-nowrap">
                    {award.year}
                  </span>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="container-wide pb-16 print:pb-8">
        <ScrollReveal>
          <SectionHeading overline="// certifications" title="Certifications" />
        </ScrollReveal>
        <div className="flex flex-wrap gap-4">
          {certifications.map((cert) => (
            <Card key={cert.name} hover={false} className="py-3 px-5">
              <h4 className="font-display text-sm font-bold text-text-primary">
                {cert.name}
              </h4>
              <p className="text-xs text-text-muted">
                {cert.issuer} &middot; {cert.year}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className="container-wide pb-16 print:pb-8">
        <ScrollReveal>
          <SectionHeading overline="// languages" title="Languages" />
        </ScrollReveal>
        <div className="flex flex-wrap gap-4">
          {languages.map((lang) => (
            <Card key={lang.name} hover={false} className="py-3 px-5">
              <h4 className="font-display text-sm font-bold text-text-primary">
                {lang.name}
              </h4>
              <p className="text-xs text-text-muted">{lang.proficiency}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Volunteering */}
      <section className="container-wide pb-16 print:pb-8">
        <ScrollReveal>
          <SectionHeading overline="// service" title="Volunteering" />
        </ScrollReveal>
        <div className="space-y-3">
          {volunteerExperience.map((vol) => (
            <ScrollReveal key={vol.role}>
              <Card hover={false} className="py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                  <div>
                    <h4 className="font-display text-sm font-bold text-text-primary">
                      {vol.role}
                    </h4>
                    <p className="text-xs text-text-muted">{vol.organization}</p>
                  </div>
                  <span className="font-mono text-xs text-accent-primary">{vol.period}</span>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
