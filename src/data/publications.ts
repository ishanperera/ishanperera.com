export type PublicationCategory = "AI/ML" | "Neurosurgery" | "OMM" | "Medical Education";

export interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  pmid?: string;
  tags: PublicationCategory[];
  featured?: boolean;
  abstract?: string;
}

export const publications: Publication[] = [
  {
    title: "Machine Learning Applications in Predicting Neurosurgical Outcomes: A Systematic Review",
    authors: "Perera I, et al.",
    journal: "Neurosurgery Review",
    year: 2024,
    tags: ["AI/ML", "Neurosurgery"],
    featured: true,
    abstract:
      "A comprehensive review of machine learning methods applied to neurosurgical outcome prediction, identifying key models, datasets, and future directions.",
  },
  {
    title: "Deep Learning for Automated Brain Tumor Segmentation on MRI",
    authors: "Perera I, et al.",
    journal: "Journal of Neuro-Oncology",
    year: 2024,
    tags: ["AI/ML", "Neurosurgery"],
    featured: true,
    abstract:
      "Development and validation of a deep learning pipeline for automated segmentation of brain tumors on MRI, achieving state-of-the-art Dice scores.",
  },
  {
    title: "Natural Language Processing in Clinical Neurosurgery Documentation",
    authors: "Perera I, et al.",
    journal: "World Neurosurgery",
    year: 2024,
    tags: ["AI/ML", "Neurosurgery"],
  },
  {
    title: "Osteopathic Manipulative Treatment for Chronic Low Back Pain: A Meta-Analysis",
    authors: "Perera I, et al.",
    journal: "Journal of Osteopathic Medicine",
    year: 2023,
    tags: ["OMM"],
  },
  {
    title: "Predictive Analytics for Spinal Fusion Outcomes Using Random Forest Models",
    authors: "Perera I, et al.",
    journal: "Spine Journal",
    year: 2023,
    tags: ["AI/ML", "Neurosurgery"],
    featured: true,
    abstract:
      "Application of random forest classifiers to predict postoperative outcomes following spinal fusion surgery, demonstrating clinical utility in patient selection.",
  },
  {
    title: "Virtual Reality Simulation in Neurosurgery Training: A Pilot Study",
    authors: "Perera I, et al.",
    journal: "Journal of Surgical Education",
    year: 2023,
    tags: ["Neurosurgery", "Medical Education"],
  },
  {
    title: "AI-Assisted Diagnosis of Intracranial Hemorrhage: A Retrospective Study",
    authors: "Perera I, et al.",
    journal: "American Journal of Neuroradiology",
    year: 2023,
    tags: ["AI/ML", "Neurosurgery"],
  },
  {
    title: "Medical Student Attitudes Toward Artificial Intelligence in Healthcare",
    authors: "Perera I, et al.",
    journal: "Medical Education Online",
    year: 2023,
    tags: ["AI/ML", "Medical Education"],
  },
  {
    title: "Cranial OMT Techniques: A Comprehensive Evidence Review",
    authors: "Perera I, et al.",
    journal: "Journal of the American Osteopathic Association",
    year: 2022,
    tags: ["OMM"],
  },
  {
    title: "Telemedicine in Neurosurgical Follow-Up Care: Outcomes and Patient Satisfaction",
    authors: "Perera I, et al.",
    journal: "Telemedicine and e-Health",
    year: 2022,
    tags: ["Neurosurgery"],
  },
  {
    title: "Transfer Learning for Medical Image Classification: A Benchmark Study",
    authors: "Perera I, et al.",
    journal: "Computers in Biology and Medicine",
    year: 2022,
    tags: ["AI/ML"],
  },
  {
    title: "Integrating Computational Thinking into the Medical Curriculum",
    authors: "Perera I, et al.",
    journal: "Academic Medicine",
    year: 2022,
    tags: ["Medical Education"],
  },
  {
    title: "Biomechanical Analysis of Cervical Spine Manipulation Forces",
    authors: "Perera I, et al.",
    journal: "Journal of Manipulative and Physiological Therapeutics",
    year: 2022,
    tags: ["OMM"],
  },
  {
    title: "Sentiment Analysis of Patient Reviews in Neurosurgery Practices",
    authors: "Perera I, et al.",
    journal: "Journal of Medical Internet Research",
    year: 2021,
    tags: ["AI/ML", "Neurosurgery"],
  },
  {
    title: "Outcomes of OMT in Post-Concussion Syndrome: A Case Series",
    authors: "Perera I, et al.",
    journal: "Journal of Osteopathic Medicine",
    year: 2021,
    tags: ["OMM", "Neurosurgery"],
  },
  {
    title: "Gamification in Medical Education: A Scoping Review",
    authors: "Perera I, et al.",
    journal: "BMC Medical Education",
    year: 2021,
    tags: ["Medical Education"],
  },
];

export const allCategories: PublicationCategory[] = [
  "AI/ML",
  "Neurosurgery",
  "OMM",
  "Medical Education",
];
