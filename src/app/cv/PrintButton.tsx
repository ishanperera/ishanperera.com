"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-secondary px-4 py-2.5 font-display font-semibold text-sm text-text-secondary transition-colors hover:text-accent-primary hover:border-accent-primary/30"
    >
      <Printer size={16} /> Print
    </button>
  );
}
