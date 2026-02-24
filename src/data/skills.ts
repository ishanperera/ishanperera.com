export interface SkillCategory {
  name: string;
  skills: string[];
}

export const technicalSkills: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["C++", "Java", "JavaScript", "Python", "Swift", "PHP", "SQL", "R"],
  },
  {
    name: "Web & Mobile",
    skills: ["React", "React Native", "Next.js", "Django", "HTML/CSS", "AJAX"],
  },
  {
    name: "Data & ML",
    skills: ["Statistical Analysis (R)", "NLP", "Voice Recognition", "Geometric Morphometrics"],
  },
  {
    name: "Medical Imaging",
    skills: ["3D Slicer", "MorphoJ"],
  },
  {
    name: "Tools & Platforms",
    skills: ["Git", "Unix", "Relational Databases", "Vercel"],
  },
];

export const medicalSkills: SkillCategory[] = [
  {
    name: "Clinical",
    skills: ["Neurosurgery", "OMM/OMT", "Emergency Medicine", "ACLS", "BLS", "Laryngoscopy"],
  },
  {
    name: "Research",
    skills: [
      "Clinical Research",
      "Systematic Reviews",
      "IRB Protocols",
      "Grant Writing",
      "Geometric Morphometrics",
    ],
  },
  {
    name: "Product Development",
    skills: [
      "DRPLAP (Lexical Analysis Program)",
      "DRP Submissions App",
      "Keychain Naloxone Carrier",
      "Affordable Video Laryngoscope Trainer",
    ],
  },
];
