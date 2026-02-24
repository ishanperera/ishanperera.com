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
  {
    title: "Principles of Neural Science",
    author: "Eric Kandel et al.",
    category: "neuroscience",
    status: "reading",
    note: "The definitive neuroscience reference — working through it chapter by chapter",
  },
  {
    title: "Greenberg's Handbook of Neurosurgery",
    author: "Mark Greenberg",
    category: "neuroscience",
    status: "reading",
    note: "The neurosurgery bible — always within arm's reach",
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "software",
    status: "finished",
    note: "Best book on distributed systems fundamentals",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "software",
    status: "finished",
    note: "Changed how I think about writing maintainable code",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    category: "business",
    status: "finished",
    note: "Contrarian thinking about building startups",
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "business",
    status: "finished",
    note: "Applied these principles directly at Ravana and EZ Inn",
  },
  {
    title: "When Breath Becomes Air",
    author: "Paul Kalanithi",
    category: "philosophy",
    status: "finished",
    note: "A neurosurgeon's meditation on mortality — deeply personal",
  },
  {
    title: "The Structure of Scientific Revolutions",
    author: "Thomas Kuhn",
    category: "philosophy",
    status: "want-to-read",
  },
  {
    title: "Algorithms to Live By",
    author: "Brian Christian & Tom Griffiths",
    category: "software",
    status: "want-to-read",
  },
  {
    title: "The Innovator's Dilemma",
    author: "Clayton Christensen",
    category: "business",
    status: "want-to-read",
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
