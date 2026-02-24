"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface HistoryEntry {
  command: string;
  output: string[];
}

const PROMPT = "visitor@ishanperera.com:~$ ";

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "",
    "  about        — Who is Ishan Perera?",
    "  skills       — Technical skills",
    "  research     — Research highlights",
    "  ventures     — Companies and ventures",
    "  blog         — Recent blog posts",
    "  contact      — Get in touch",
    "  cat resume   — Download CV",
    "  whoami       — Who are you?",
    "  clear        — Clear terminal",
    "  exit         — Return to the matrix",
    "",
    "  sudo rm -rf  — Try it. I dare you.",
  ],
  about: [
    "Ishan Perera, D.O.",
    "PGY-1 Neurological Surgery Resident",
    "Henry Ford Health Providence Hospital",
    "MSU College of Human Medicine",
    "",
    "Neurosurgeon by training. Developer by passion.",
    "Entrepreneur by nature. Researcher by curiosity.",
    "",
    "VCOM Class of 2025 | ODU Class of 2020",
    "11 publications | 19 poster presentations | $33K+ in grants",
  ],
  skills: [
    "Languages:   C++ · Java · JavaScript · Python · Swift · PHP · SQL · R",
    "Frontend:    React · Next.js · React Native · Tailwind CSS",
    "Backend:     Django · Node.js · PostgreSQL · REST APIs",
    "Tools:       Git · Docker · Vercel · Figma · 3D Slicer",
    "Medical:     Neurosurgery · OMM/OMT · ACLS · BLS",
  ],
  research: [
    "Research Focus Areas:",
    "",
    "  → Chiari I Malformation (3D geometric morphometrics)",
    "  → AI in Medical Education (NLP / voice recognition)",
    "  → Osteopathic Manipulative Medicine",
    "",
    "11 published works | 8+ in progress",
    "19 poster presentations (including AANS)",
    "$33,000+ in research grants secured",
    "",
    "Published in: Frontiers in Neuroanatomy, Scientific Reports (Nature),",
    "  J Craniovertebral Junction & Spine, Cureus, and more.",
  ],
  ventures: [
    "Ravana Solutions  — Co-Founder (2021-present)",
    "  Full-service digital agency: web, mobile, AI",
    "",
    "EZ Inn            — Co-Founder (2020-present)",
    "  Hospitality venture in Norfolk, VA",
    "",
    "HOLO Labs         — Co-Founder (2022-present)",
    "  First student-led research lab at VCOM",
    "  Research brokership model",
  ],
  blog: [
    "Recent posts:",
    "",
    "  → Rethinking Chiari I Diagnosis with 3D Geometric Morphometrics",
    "  → Building a Startup While Surviving Medical School",
    "  → How We Used Voice Recognition AI to Predict Heart Failure",
    "  → Why Neurosurgeons Should Learn to Code",
    "",
    "Visit /blog for more.",
  ],
  contact: [
    "Email:    ishanperera07@gmail.com",
    "GitHub:   github.com/ishanperera",
    "LinkedIn: linkedin.com/in/ishanperera07",
    "X:        x.com/ishanperera07",
    "",
    "Or visit /contact to send a message.",
  ],
  whoami: [
    "visitor — but you could be a collaborator.",
    "",
    "Type 'contact' to reach out.",
  ],
  "cat resume": [
    "Downloading CV...",
    "",
    "→ /Ishan-Perera-CV.pdf",
    "",
    "(Opening in new tab)",
  ],
  "sudo rm -rf": [
    "Nice try.",
    "",
    "This brain is read-only.",
    "",
    "   🧠 Permission denied: consciousness is immutable.",
  ],
  "sudo rm -rf /": [
    "Nice try.",
    "",
    "This brain is read-only.",
    "",
    "   🧠 Permission denied: consciousness is immutable.",
  ],
  "cd ..": [
    "You've reached the root of consciousness.",
    "There is no parent directory.",
  ],
  ls: [
    "about.md    blog/       contact.md  projects/",
    "research/   skills.md   ventures/   resume.pdf",
  ],
  pwd: ["/home/visitor/ishanperera.com"],
  neofetch: [
    "       ___       visitor@ishanperera.com",
    "      (.. |      ─────────────────────────",
    "      (<> |      OS: Next.js 16 on Vercel",
    "     / __  \\     Shell: zsh + Oh My Zsh",
    "    ( /  \\ /|    Editor: VS Code + Vim",
    "   _/\\ __)/_)    Languages: TS, Python, C++, Swift",
    "   \\/-____\\/     Uptime: since June 2025",
  ],
};

const BOOT_SEQUENCE = [
  "ishanperera.com terminal v1.0.0",
  "Initializing neural interface...",
  "",
  "Type 'help' for available commands.",
  "",
];

export function TerminalEmulator() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setBooted(true);
    inputRef.current?.focus();

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/");
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [router]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();

      if (trimmed === "clear") {
        setHistory([]);
        return;
      }

      if (trimmed === "exit") {
        router.push("/");
        return;
      }

      if (trimmed === "cat resume" || trimmed === "cat resume.pdf") {
        window.open("/Ishan-Perera-CV.pdf", "_blank");
        setHistory((prev) => [
          ...prev,
          { command: cmd, output: COMMANDS["cat resume"] },
        ]);
        return;
      }

      const output = COMMANDS[trimmed] || [
        `Command not found: ${trimmed}`,
        "Type 'help' for available commands.",
      ];

      setHistory((prev) => [...prev, { command: cmd, output }]);
    },
    [router]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      setHistory((prev) => [...prev, { command: "", output: [] }]);
    } else {
      executeCommand(input);
    }
    setInput("");
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-[#0D0D0D] text-[#00E5FF] font-mono text-sm overflow-hidden cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto p-4 md:p-8 pb-20"
      >
        {/* Boot sequence */}
        {booted &&
          BOOT_SEQUENCE.map((line, i) => (
            <div key={`boot-${i}`} className="leading-relaxed">
              {line || "\u00A0"}
            </div>
          ))}

        {/* Command history */}
        {history.map((entry, i) => (
          <div key={i} className="mt-1">
            <div className="flex">
              <span className="text-[#7B61FF] shrink-0">{PROMPT}</span>
              <span className="text-[#F0F0F5]">{entry.command}</span>
            </div>
            {entry.output.map((line, j) => (
              <div key={j} className="leading-relaxed text-[#00E5FF]">
                {line || "\u00A0"}
              </div>
            ))}
          </div>
        ))}

        {/* Input line */}
        <form onSubmit={handleSubmit} className="flex mt-1">
          <span className="text-[#7B61FF] shrink-0">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-[#F0F0F5] outline-none caret-[#00E5FF]"
            autoFocus
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />
        </form>
      </div>

      {/* Exit hint */}
      <div className="fixed bottom-4 right-4 text-xs text-[#5A5A72]">
        Type &apos;exit&apos; or press Esc to leave
      </div>
    </div>
  );
}
