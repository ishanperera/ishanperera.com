import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="container-wide text-center">
        <p className="font-mono text-sm text-accent-primary mb-4">// 404</p>
        <h1 className="font-display text-6xl md:text-8xl font-bold text-text-primary mb-4">
          Lost in the
          <br />
          <span className="text-gradient">neural network</span>
        </h1>
        <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-accent-primary px-6 py-3 font-display font-semibold text-bg-primary transition-all hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
        >
          <ArrowLeft size={16} /> Back Home
        </Link>
      </div>
    </div>
  );
}
