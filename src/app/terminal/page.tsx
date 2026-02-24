import type { Metadata } from "next";
import { TerminalEmulator } from "@/components/terminal/TerminalEmulator";

export const metadata: Metadata = {
  title: "Terminal",
  description: "You found the easter egg.",
  robots: { index: false, follow: false },
};

export default function TerminalPage() {
  return <TerminalEmulator />;
}
