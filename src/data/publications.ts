export type PublicationCategory = "Neurosurgery" | "AI/ML" | "Medical Education" | "OMM" | "Case Report" | "Advocacy";

export interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  tags: PublicationCategory[];
  featured?: boolean;
  abstract?: string;
}

export const publications: Publication[] = [
  {
    title: "Atlantal facet geometry in Chiari I malformation",
    authors: "Millard JA, Perera IR, Scardina B, Rondon B, Satoskar C",
    journal: "Journal of Craniovertebral Junction and Spine",
    year: 2025,
    tags: ["Neurosurgery"],
    featured: true,
    abstract:
      "Investigation into the geometric properties of atlantal facets in Chiari I Malformation patients, revealing skeletal deformities extending into the cervical spine that may drive symptoms.",
  },
  {
    title: "Predicting New York Heart Association (NYHA) heart failure classification from medical student notes following simulated patient encounters",
    authors: "Perera IR, Daniels T, Looney J, et al.",
    journal: "Scientific Reports",
    year: 2025,
    doi: "10.1038/s41598-025-10179-8",
    tags: ["AI/ML", "Medical Education"],
    featured: true,
    abstract:
      "Development of a novel voice recognition-based analytical classification model to predict NYHA heart failure classification from medical student clinical notes, demonstrating AI applications in medical education assessment.",
  },
  {
    title: "Case Report: Challenges of insulin and sulfonylurea dosing in an extremely premature infant for the management of KCNJ11-associated neonatal diabetes mellitus",
    authors: "Perera I, Jensen B, Patel H, Garganta M",
    journal: "Frontiers in Pediatrics",
    year: 2025,
    doi: "10.3389/fped.2025.1456818",
    tags: ["Case Report"],
  },
  {
    title: "Evaluating the Impact of Direct, Direct Video, and Indirect Video Laryngoscopy Training on the Proficiency of Medical Students in Performing Direct Laryngoscopy: A High-Fidelity Manikin-Based Assessment",
    authors: "Moriarty SE, Perera IR, Sabbagh M, et al.",
    journal: "Cureus",
    year: 2024,
    doi: "10.7759/cureus.70984",
    tags: ["Medical Education"],
  },
  {
    title: "Geometric morphometric analysis of brainstem and cerebellum in Chiari I malformation",
    authors: "Perera IR, Zahed M, Moriarty S, Simmons Z, Rodriguez M, Botkin C, Dickson T, Kasper B, Fahmy K, Millard JA",
    journal: "Frontiers in Neuroanatomy",
    year: 2024,
    doi: "10.3389/fnana.2024.1434017",
    tags: ["Neurosurgery", "AI/ML"],
    featured: true,
    abstract:
      "A novel 3D geometric morphometric protocol for identification of Chiari I Malformation patients, elucidating shape differences in the brainstem and cerebellum that advance understanding of the condition.",
  },
  {
    title: "Manual Therapy as an Alternative Treatment Option for Idiopathic Pulmonary Fibrosis: A Case Report",
    authors: "Greenberg SS, Moriarty SE, Perera I, et al.",
    journal: "Cureus",
    year: 2024,
    doi: "10.7759/cureus.53383",
    tags: ["OMM", "Case Report"],
  },
  {
    title: "Perplexing Tubo-Ovarian Abscess Presentation from an Inflammatory Process in a Patient with an Inconclusive Computed Tomography Scan",
    authors: "Menendez S, Moriarty SE, Perera I, et al.",
    journal: "Cureus",
    year: 2023,
    doi: "10.7759/cureus.46760",
    tags: ["Case Report"],
  },
  {
    title: "Lumbar Laminectomy Precedes Positional Headache and MRI-Confirmed Pseudomeningocele With Duro-Cutaneous Fistula",
    authors: "Kasper BE, Perera IR, Moriarty SE, et al.",
    journal: "Cureus",
    year: 2023,
    doi: "10.7759/cureus.37946",
    tags: ["Neurosurgery", "Case Report"],
  },
  {
    title: "Medicare vs. Medicaid Infographic",
    authors: "Perera I",
    journal: "Medical Society of Virginia",
    year: 2022,
    tags: ["Advocacy"],
  },
  {
    title: "Advocating for the FAIR Act to Improve Health Across Virginia",
    authors: "Perera I",
    journal: "AACOM Washington Insider",
    year: 2022,
    tags: ["Advocacy"],
  },
  {
    title: "Virginia Residency Programs: Identification of Disparities in Residency Program Data",
    authors: "Perera I",
    journal: "Virginia Osteopathic Medical Association",
    year: 2022,
    tags: ["Medical Education", "Advocacy"],
  },
];

export const researchInProgress = [
  "Improvement of Adult-Onset Post Pump Chorea Following Transcarotid Artery Revascularization — Editor Review",
  "Retrograde Migration of Gastrojejunostomy Tube Following Rapid Feeding — Manuscript in Progress",
  "Comparison of Novel Voice Recognition Models in Medical Student Medical Decision-Making During Case Presentation — Manuscript in Progress",
  "A Transformational Health Approach to Evaluation of the Virginia REVIVE! Training Course — Manuscript in Progress",
  "Impact of Virginia's REVIVE! Course and Naloxone Distribution Efforts on Opioid Overdose Morbidity and Mortality — Manuscript in Progress",
  "Investigation of Increased Prevalence of Prostate Cancer in Black Patients — Manuscript in Progress",
  "Investigating the success of dermatologic procedures with silicone skin models — In Progress",
  "Investigation of Suboccipital Release, Muscle Energy, and combination therapy evaluating their effect on vertebral artery blood flow — Preliminary Study in Progress",
];

export const allCategories: PublicationCategory[] = [
  "Neurosurgery",
  "AI/ML",
  "Medical Education",
  "OMM",
  "Case Report",
  "Advocacy",
];
