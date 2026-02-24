export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: "education" | "career" | "venture" | "achievement";
}

export const timeline: TimelineEvent[] = [
  {
    year: "2025",
    title: "Neurological Surgery Residency",
    description:
      "Began neurosurgery residency at Henry Ford Health Providence Hospital through Michigan State University College of Human Medicine. Also appointed Clinical Instructor in the Department of Surgery.",
    type: "career",
  },
  {
    year: "2025",
    title: "Doctor of Osteopathic Medicine (D.O.)",
    description:
      "Graduated from Edward Via College of Osteopathic Medicine (VCOM), Blacksburg, VA with a 3.84 GPA. Named Student Doctor of the Year and Golden Ticket Scholarship Finalist.",
    type: "education",
  },
  {
    year: "2025",
    title: "AANS Annual Scientific Meeting — Rapid Fire Spine Abstract",
    description:
      "Presented \"Atlas Morphology in Symptomatic Chiari I Malformation: A Statistical Shape Analysis\" at the American Association of Neurological Surgeons meeting in Boston.",
    type: "achievement",
  },
  {
    year: "2024",
    title: "Chair, Medical Student Section — Medical Society of Virginia",
    description:
      "Elected Chair of the MSV Medical Student Section. Led advocacy for physician-centered policies and represented medical students statewide.",
    type: "achievement",
  },
  {
    year: "2024",
    title: "Gold Humanism Honor Society (GHHS)",
    description:
      "Inducted into GHHS, recognizing demonstrated excellence in clinical care, leadership, compassion, and dedication to service.",
    type: "achievement",
  },
  {
    year: "2022",
    title: "Co-Founded HOLO Labs",
    description:
      "Co-founded Healthcare Observations, Lexicography, and Outcomes (HOLO) Laboratories — the first student-led research lab to adopt a research brokership approach at VCOM.",
    type: "venture",
  },
  {
    year: "2022",
    title: "Deputy Editor — Cureus Journal",
    description:
      "Appointed Deputy Editor for the Simulation, Biodesign, & Innovation in Medical Education section of Cureus Journal.",
    type: "achievement",
  },
  {
    year: "2021",
    title: "Founded Ravana LLC",
    description:
      "Founded Ravana LLC (ravanasolutions.com), a full-service digital agency building modern web applications, mobile apps, and AI-powered solutions.",
    type: "venture",
  },
  {
    year: "2021",
    title: "Edward Via College of Osteopathic Medicine",
    description:
      "Began medical school at VCOM, Blacksburg, VA. Simultaneously launched research programs, co-founded the Overdose Prevention Task Force, and began teaching as a peer educator.",
    type: "education",
  },
  {
    year: "2020",
    title: "Co-Founded EZ Inn",
    description:
      "Co-founded and began managing EZ Inn in Norfolk, VA, expanding entrepreneurial portfolio into hospitality operations.",
    type: "venture",
  },
  {
    year: "2020",
    title: "B.S. Biology — Old Dominion University",
    description:
      "Graduated Summa Cum Laude with Honors from ODU (3.90 GPA). Major in Biology, minors in Chemistry and Computer Science.",
    type: "education",
  },
  {
    year: "2019",
    title: "Emergency Department Technician",
    description:
      "Worked as an ED Technician at Sentara Princess Anne Hospital, gaining frontline clinical experience in emergency medicine.",
    type: "career",
  },
  {
    year: "2018",
    title: "EMT-B Certification",
    description:
      "Earned Emergency Medical Technician Level B certification from Tidewater Community College. Volunteered with Virginia Beach EMS.",
    type: "career",
  },
];
