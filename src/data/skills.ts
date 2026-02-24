export interface SkillCategory {
  name: string;
  skills: string[];
}

export const technicalSkills: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["TypeScript", "Python", "Swift", "JavaScript", "SQL", "R"],
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "React Native", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend & Data",
    skills: ["Node.js", "PostgreSQL", "Prisma", "REST APIs", "GraphQL"],
  },
  {
    name: "AI / ML",
    skills: ["PyTorch", "TensorFlow", "scikit-learn", "NLP", "Computer Vision"],
  },
  {
    name: "Tools & Platforms",
    skills: ["Git", "Docker", "Vercel", "AWS", "Figma"],
  },
];

export const medicalSkills: SkillCategory[] = [
  {
    name: "Clinical",
    skills: ["Neurosurgery", "OMM/OMT", "Surgical Technique", "Patient Care"],
  },
  {
    name: "Research",
    skills: [
      "Clinical Research",
      "Systematic Reviews",
      "Statistical Analysis",
      "IRB Protocols",
    ],
  },
];
