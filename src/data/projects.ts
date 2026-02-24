export interface Venture {
  name: string;
  role: string;
  description: string;
  url?: string;
  tags: string[];
  featured?: boolean;
}

export const ventures: Venture[] = [
  {
    name: "Ravana Solutions",
    role: "Owner — Since 2021",
    description:
      "A full-service digital agency building modern web applications, mobile apps, and AI-powered solutions for businesses across industries. From concept to deployment, we craft performant digital experiences using React, Next.js, React Native, and more.",
    url: "https://www.ravanasolutions.com/",
    tags: ["Next.js", "React Native", "AI/ML", "UI/UX", "Web Development"],
    featured: true,
  },
  {
    name: "EZ Inn",
    role: "Co-Founder & Operations Manager — Since 2020",
    description:
      "Co-founded and manage operations for a hospitality venture in Norfolk, VA. Handle day-to-day management, marketing, and business development while balancing medical training.",
    tags: ["Hospitality", "Operations", "Management", "Norfolk, VA"],
  },
  {
    name: "HOLO Labs",
    role: "Co-Founder, Board of Trustees — Since 2022",
    description:
      "Co-founded Healthcare Observations, Lexicography, and Outcomes Laboratories — the first student-led research lab at VCOM to adopt a research brokership approach. Focused on providing osteopathic students opportunities in research, product development, grant writing, and community outreach.",
    tags: ["Research", "Medical Education", "Community Outreach", "Product Development"],
  },
];

export const productDevelopment = [
  {
    name: "DRPLAP",
    description: "Daniels Rawlins Perera Lexical Analysis Program — A proprietary AI-based voice recognition program for assessing medical student clinical lexicons during case presentation.",
  },
  {
    name: "DRP Submissions App",
    description: "Mobile application for managing research submissions and tracking.",
  },
  {
    name: "Keychain Naloxone Carrier",
    description: "A portable naloxone carrier designed to increase accessibility for opioid overdose reversal.",
  },
  {
    name: "Affordable Video Laryngoscope Trainer",
    description: "Low-cost training device for teaching video laryngoscopy techniques to medical students.",
  },
  {
    name: "Osteopathic Spanish Translation Guide",
    description: "A guide for osteopathic medical practitioners to communicate OMT procedures in Spanish.",
  },
];
