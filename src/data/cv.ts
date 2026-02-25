export interface Award {
  title: string;
  organization: string;
  year: number;
  description?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
}

export interface VolunteerExperience {
  role: string;
  organization: string;
  period: string;
}

export interface Language {
  name: string;
  proficiency: "Native" | "Conversational" | "Basic";
}

export const awards: Award[] = [
  {
    title: "Student Doctor of the Year",
    organization: "Edward Via College of Osteopathic Medicine",
    year: 2024,
  },
  {
    title: "Gold Humanism Honor Society (GHHS)",
    organization: "Arnold P. Gold Foundation",
    year: 2024,
  },
  {
    title: "Chair, Medical Student Section",
    organization: "Medical Society of Virginia",
    year: 2024,
  },
  {
    title: "Golden Ticket Scholarship Finalist",
    organization: "Edward Via College of Osteopathic Medicine",
    year: 2023,
  },
  {
    title: "Summa Cum Laude with Honors",
    organization: "Old Dominion University",
    year: 2020,
  },
];

export const certifications: Certification[] = [
  { name: "ACLS", issuer: "American Heart Association", year: 2023 },
  { name: "BLS", issuer: "American Heart Association", year: 2023 },
  { name: "EMT-B", issuer: "National Registry of EMTs", year: 2018 },
];

export const volunteerExperience: VolunteerExperience[] = [
  {
    role: "Co-Chair, Overdose Prevention Task Force",
    organization: "VCOM / Virginia Health Department",
    period: "2022 – 2025",
  },
  {
    role: "Volunteer",
    organization: "Habitat for Humanity",
    period: "2018 – Present",
  },
  {
    role: "Volunteer",
    organization: "Ronald McDonald House",
    period: "2019 – 2023",
  },
  {
    role: "EMS Volunteer",
    organization: "Virginia Beach EMS",
    period: "2018 – 2020",
  },
];

export const languages: Language[] = [
  { name: "English", proficiency: "Native" },
  { name: "Spanish", proficiency: "Conversational" },
  { name: "Sinhalese", proficiency: "Conversational" },
];

export const experience = [
  {
    title: "PGY-1 Neurological Surgery Resident & Clinical Instructor",
    organization: "Henry Ford Health Providence Hospital / MSU College of Human Medicine",
    period: "2025 – Present",
    highlights: [
      "Department of Surgery, Clinical Instructor",
      "Neurological surgery training across the Henry Ford system",
    ],
  },
  {
    title: "Deputy Editor",
    organization: "Cureus Journal — Simulation, Biodesign & Innovation in Medical Education",
    period: "2022 – Present",
    highlights: [
      "Peer review of medical education and simulation manuscripts",
    ],
  },
  {
    title: "Co-Founder & Research Director",
    organization: "HOLO Labs (Healthcare Observations, Lexicography, and Outcomes)",
    period: "2022 – 2025",
    highlights: [
      "First student-led research lab at VCOM to adopt a research brokership model",
      "Secured over $33,000 in research grants",
      "19 poster presentations at national and regional conferences",
    ],
  },
  {
    title: "Emergency Department Technician",
    organization: "Sentara Princess Anne Hospital",
    period: "2019 – 2021",
    highlights: [
      "Frontline clinical experience in emergency medicine",
      "Patient triage, vital signs, ECG, phlebotomy, splinting",
    ],
  },
];

export const education = [
  {
    degree: "Doctor of Osteopathic Medicine (D.O.)",
    institution: "Edward Via College of Osteopathic Medicine",
    location: "Blacksburg, VA",
    period: "2021 – 2025",
    gpa: "3.84",
  },
  {
    degree: "B.S. Biology (Minors: Chemistry, Computer Science)",
    institution: "Old Dominion University",
    location: "Norfolk, VA",
    period: "2016 – 2020",
    gpa: "3.90 — Summa Cum Laude with Honors",
  },
];
