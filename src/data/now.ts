export interface NowItem {
  category: string;
  items: string[];
}

export const nowData = {
  lastUpdated: "2026-02-24",
  intro: "This is what I'm focused on right now. Inspired by the /now movement.",
  sections: [
    {
      category: "Clinical",
      items: [
        "PGY-1 Neurological Surgery at Henry Ford Health Providence Hospital",
        "Clinical Instructor, Department of Surgery — MSU College of Human Medicine",
      ],
    },
    {
      category: "Research",
      items: [
        "Continuing 3D geometric morphometric analysis of Chiari I malformation",
        "Expanding the atlas facet geometry study for craniovertebral junction",
        "AI voice recognition model refinement for heart failure classification",
      ],
    },
    {
      category: "Building",
      items: [
        "ishanperera.com — this site (Next.js 16, TypeScript, Tailwind)",
        "Ravana Solutions — client projects and agency growth",
        "Open source contributions on GitHub",
      ],
    },
    {
      category: "Learning",
      items: [
        "Advanced microsurgical techniques",
        "Three.js and WebGL for medical visualization",
        "Large language models in clinical decision support",
      ],
    },
  ] as NowItem[],
};
