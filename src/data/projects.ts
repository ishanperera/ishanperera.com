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
    role: "Co-Founder",
    description:
      "A full-service digital agency building modern web applications, mobile apps, and AI-powered solutions for businesses across industries. We specialize in crafting beautiful, performant digital experiences.",
    url: "https://ravanasolutions.com",
    tags: ["Next.js", "React Native", "AI/ML", "UI/UX", "Web Development"],
    featured: true,
  },
  {
    name: "EZ Lounge",
    role: "Co-Owner",
    description:
      "Co-owner and operator of a popular lounge venue. Managing operations, marketing, and business development while balancing medical training.",
    tags: ["Hospitality", "Operations", "Marketing"],
  },
  {
    name: "HOLO Labs",
    role: "Board Member",
    description:
      "Board member at a technology venture focused on innovation. Contributing to strategic direction and technology decisions.",
    tags: ["Strategy", "Technology", "Innovation"],
  },
];
