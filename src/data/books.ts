export type BookCategory = "neuroscience" | "software" | "business" | "philosophy" | "other";
export type BookStatus = "reading" | "finished" | "want-to-read";

export interface Book {
  title: string;
  author: string;
  category: BookCategory;
  status: BookStatus;
  note?: string;
}

export const books: Book[] = [
  // Currently Reading
  {
    title: "Greenberg's Handbook of Neurosurgery",
    author: "Mark Greenberg",
    category: "neuroscience",
    status: "reading",
    note: "The neurosurgery bible — always within arm's reach",
  },
  {
    title: "Clinical Neuroimaging",
    author: "Defined by imaging modalities and pathology",
    category: "neuroscience",
    status: "reading",
    note: "Building fluency in reading CT, MRI, and angiographic studies",
  },
  {
    title: "Neurocritical Care: What Do I Do Now?",
    author: "Jose Suarez & Romergryko Geocadin",
    category: "neuroscience",
    status: "reading",
    note: "Practical decision-making for neuro ICU scenarios",
  },

  // Finished
  {
    title: "When Breath Becomes Air",
    author: "Paul Kalanithi",
    category: "philosophy",
    status: "finished",
    note: "A neurosurgeon's meditation on mortality — deeply personal",
  },
  {
    title: "Neuroanatomy Text and Atlas",
    author: "John Martin",
    category: "neuroscience",
    status: "finished",
    note: "Foundational neuroanatomy with excellent illustrations",
  },
  {
    title: "Breath",
    author: "James Nestor",
    category: "other",
    status: "finished",
    note: "The science of breathing — fascinating intersection of physiology and wellness",
  },
  {
    title: "The Numerical Discourses of the Buddha",
    author: "Bhikkhu Bodhi (translator)",
    category: "philosophy",
    status: "finished",
    note: "The Anguttara Nikaya — ancient wisdom organized by numerical sets",
  },

  // Want to Read
  {
    title: "Rhoton's Cranial Anatomy and Surgical Approaches",
    author: "Albert Rhoton Jr.",
    category: "neuroscience",
    status: "want-to-read",
    note: "The gold standard of microsurgical anatomy",
  },
  {
    title: "Youmans and Winn Neurological Surgery",
    author: "H. Richard Winn et al.",
    category: "neuroscience",
    status: "want-to-read",
    note: "The comprehensive neurosurgery reference set",
  },
];

export const categoryLabels: Record<BookCategory, string> = {
  neuroscience: "Neuroscience",
  software: "Software",
  business: "Business",
  philosophy: "Philosophy",
  other: "Other",
};

export const statusLabels: Record<BookStatus, string> = {
  reading: "Currently Reading",
  finished: "Finished",
  "want-to-read": "Want to Read",
};
