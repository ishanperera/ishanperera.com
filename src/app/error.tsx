"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container-wide text-center">
        <p className="font-mono text-sm text-accent-primary mb-4">
          // error
        </p>
        <h1 className="font-display text-6xl md:text-8xl font-bold text-text-primary mb-4">
          Something
          <br />
          <span className="text-gradient">short-circuited</span>
        </h1>
        <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-accent-primary px-6 py-3 font-display font-semibold text-bg-primary transition-all hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
        >
          <RefreshCw size={16} /> Try Again
        </button>
      </div>
    </div>
  );
}
