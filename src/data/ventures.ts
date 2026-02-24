export interface VentureCaseStudy {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  period: string;
  problem: string;
  solution: string;
  techStack: string[];
  features: { title: string; description: string }[];
  outcomes: { metric: string; value: string }[];
  links?: { label: string; url: string }[];
}

export const ventureCaseStudies: VentureCaseStudy[] = [
  {
    slug: "ravana-solutions",
    name: "Ravana Solutions",
    tagline: "Full-service digital agency building modern web and AI solutions",
    role: "Co-Founder & Lead Developer",
    period: "2021 - Present",
    problem:
      "Small and mid-size businesses need high-quality digital products — custom websites, mobile apps, AI integrations — but lack the in-house talent or the budget for large agencies. They end up with template solutions that don't fit their needs or overpriced enterprise consulting.",
    solution:
      "We built a boutique agency that punches above its weight. By keeping the team lean and leveraging modern frameworks, we deliver enterprise-quality digital products at startup speed and cost. Every project is custom, from architecture to deployment.",
    techStack: ["Next.js", "React", "React Native", "Python", "AI/ML", "Vercel", "PostgreSQL", "Tailwind CSS"],
    features: [
      { title: "Custom Web Applications", description: "Full-stack web apps with modern frameworks, optimized for performance and SEO." },
      { title: "Mobile Development", description: "Cross-platform iOS and Android apps using React Native." },
      { title: "AI/ML Integration", description: "Custom AI solutions including NLP, computer vision, and predictive analytics." },
      { title: "UI/UX Design", description: "Research-driven design from wireframes to high-fidelity prototypes." },
    ],
    outcomes: [
      { metric: "Projects Delivered", value: "15+" },
      { metric: "Client Retention", value: "90%" },
      { metric: "Industries Served", value: "6+" },
    ],
    links: [{ label: "Website", url: "https://www.ravanasolutions.com/" }],
  },
  {
    slug: "ez-inn",
    name: "EZ Inn",
    tagline: "Hospitality venture in the heart of Norfolk, VA",
    role: "Co-Founder & Operations Manager",
    period: "2020 - Present",
    problem:
      "Norfolk's hospitality market was underserved for short-to-medium stay accommodations that balanced quality, affordability, and a personal touch. Travelers — from military families to visiting medical professionals — needed something between a generic hotel and an Airbnb.",
    solution:
      "We launched EZ Inn to fill that gap: professionally managed accommodations with the warmth of a local host. By handling everything from marketing to maintenance in-house, we keep costs low and guest satisfaction high.",
    techStack: ["Operations Management", "Digital Marketing", "Financial Planning", "Guest Relations"],
    features: [
      { title: "Property Management", description: "End-to-end operations from booking to checkout, maintenance, and quality control." },
      { title: "Marketing & Acquisition", description: "Multi-channel digital marketing driving consistent occupancy rates." },
      { title: "Guest Experience", description: "Personalized communication and local recommendations for every guest." },
      { title: "Financial Operations", description: "Revenue management, pricing optimization, and P&L oversight." },
    ],
    outcomes: [
      { metric: "Years Operating", value: "5+" },
      { metric: "Guest Rating", value: "4.8/5" },
      { metric: "Occupancy Rate", value: "85%+" },
    ],
  },
  {
    slug: "holo-labs",
    name: "HOLO Labs",
    tagline: "Student-led research lab pioneering the brokership model",
    role: "Co-Founder & Board of Trustees",
    period: "2022 - Present",
    problem:
      "Medical students at VCOM had limited access to structured research opportunities. The traditional model — finding a mentor, securing funding, navigating IRB — created high barriers to entry, especially for students interested in interdisciplinary work spanning biodesign, product development, and community health.",
    solution:
      "We founded HOLO Labs (Healthcare Observations, Lexicography, and Outcomes Laboratories) as the first student-led research lab at VCOM to adopt a research brokership approach. Instead of siloed mentor-student pairs, we created a collaborative ecosystem where students could access projects, mentorship, and resources through a centralized lab structure.",
    techStack: ["Research Methodology", "IRB Protocol", "Grant Writing", "Product Development", "Community Outreach"],
    features: [
      { title: "Research Brokership", description: "Centralized matchmaking between students, projects, and mentors — lowering barriers to research participation." },
      { title: "Product Development", description: "Students build tangible products: DRPLAP (AI voice recognition), naloxone carriers, laryngoscope trainers." },
      { title: "Grant Writing Program", description: "Training and support for students to write and win research grants — over $33K secured." },
      { title: "Community Outreach", description: "Research with real-world impact, including the Overdose Prevention Task Force and Spanish translation guides." },
    ],
    outcomes: [
      { metric: "Publications", value: "11+" },
      { metric: "Research Grants", value: "$33K+" },
      { metric: "Student Researchers", value: "20+" },
      { metric: "Products Developed", value: "5" },
    ],
  },
];
