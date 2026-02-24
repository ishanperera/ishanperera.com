export interface UsesItem {
  name: string;
  description: string;
  url?: string;
}

export interface UsesCategory {
  title: string;
  items: UsesItem[];
}

export const usesCategories: UsesCategory[] = [
  {
    title: "Development",
    items: [
      { name: "VS Code", description: "Primary editor for everything — TypeScript, Python, and beyond", url: "https://code.visualstudio.com" },
      { name: "GitHub", description: "Version control, CI/CD, and open source collaboration", url: "https://github.com" },
      { name: "Vercel", description: "Deployment platform for all Next.js projects", url: "https://vercel.com" },
      { name: "Figma", description: "UI/UX design and prototyping", url: "https://figma.com" },
      { name: "Docker", description: "Containerized development environments" },
    ],
  },
  {
    title: "Hardware",
    items: [
      { name: "MacBook Pro", description: "Primary development machine" },
      { name: "iPad Pro", description: "Reading papers, annotating, and light sketching" },
      { name: "AirPods Pro", description: "Noise cancellation for focus" },
    ],
  },
  {
    title: "Medical & Research",
    items: [
      { name: "3D Slicer", description: "Medical imaging analysis and 3D visualization for morphometrics research" },
      { name: "R / RStudio", description: "Statistical analysis for research publications" },
      { name: "UpToDate", description: "Evidence-based clinical decision support" },
      { name: "Zotero", description: "Reference management for publications" },
      { name: "REDCap", description: "Research data collection and management" },
    ],
  },
  {
    title: "Languages & Frameworks",
    items: [
      { name: "TypeScript / React / Next.js", description: "Web application stack of choice" },
      { name: "Python", description: "Data science, machine learning, scripting" },
      { name: "Swift", description: "iOS and macOS development" },
      { name: "C++", description: "Systems programming and performance-critical work" },
      { name: "React Native", description: "Cross-platform mobile apps" },
      { name: "Django / PHP", description: "Backend development for client projects" },
    ],
  },
];
