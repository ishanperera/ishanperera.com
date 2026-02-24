export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: "education" | "career" | "venture" | "achievement";
}

export const timeline: TimelineEvent[] = [
  {
    year: "2025",
    title: "PGY-1 Neurosurgery Residency",
    description:
      "Began neurosurgery residency at Henry Ford Providence Hospital, training in one of the most demanding surgical specialties.",
    type: "career",
  },
  {
    year: "2025",
    title: "Doctor of Osteopathic Medicine (D.O.)",
    description:
      "Graduated medical school and earned the D.O. degree, culminating years of rigorous medical training.",
    type: "education",
  },
  {
    year: "2023",
    title: "Co-founded Ravana Solutions",
    description:
      "Launched a full-service digital agency focused on modern web applications, mobile apps, and AI-powered solutions.",
    type: "venture",
  },
  {
    year: "2022",
    title: "HOLO Labs Board Member",
    description:
      "Joined the board of HOLO Labs, contributing to strategy and innovation in technology ventures.",
    type: "venture",
  },
  {
    year: "2022",
    title: "EZ Lounge Co-Owner",
    description:
      "Co-acquired and began managing EZ Lounge, expanding entrepreneurial portfolio into hospitality.",
    type: "venture",
  },
  {
    year: "2021",
    title: "Research Milestone: 15+ Publications",
    description:
      "Surpassed 15 peer-reviewed publications spanning AI/ML, neurosurgery, OMM, and medical education.",
    type: "achievement",
  },
  {
    year: "2021",
    title: "Medical School",
    description:
      "Entered medical school with a focus on neurosurgery, while continuing software development and research.",
    type: "education",
  },
];
