"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { GridBackground } from "@/components/ui/GridBackground";
import { GlowingOrb } from "@/components/ui/GlowingOrb";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { TypewriterText } from "@/components/ui/TypewriterText";

const taglines = [
  "Building the future of neurosurgery with code.",
  "From the OR to the IDE.",
  "Where medicine meets machine learning.",
  "Surgeon. Builder. Researcher.",
];

export function HeroSection() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <GridBackground />
      <GlowingOrb className="top-1/4 -left-32" color="cyan" />
      <GlowingOrb className="bottom-1/4 -right-32" color="purple" />

      <div className="container-wide relative z-10 flex flex-col items-center text-center">
        {/* Overline */}
        <div className="mb-8 min-h-[1.5rem]">
          <TypewriterText
            text="NEUROSURGEON . DEVELOPER . ENTREPRENEUR"
            delay={600}
            speed={30}
            className="font-mono text-xs md:text-sm tracking-[0.3em] text-accent-primary"
          />
        </div>

        {/* Name */}
        <h1 className="font-display font-bold leading-[0.9] text-text-primary">
          <AnimatedText
            text="ISHAN"
            className="block text-[clamp(3rem,10vw,8rem)]"
            delay={0}
            staggerDelay={0.04}
          />
          <AnimatedText
            text="PERERA"
            className="block text-[clamp(3rem,10vw,8rem)]"
            delay={0.2}
            staggerDelay={0.04}
          />
        </h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 space-y-1"
        >
          <p className="text-lg md:text-xl text-text-secondary">
            PGY-1 Neurological Surgery Resident
          </p>
          <p className="text-base text-text-muted">
            Henry Ford Health Providence Hospital &middot; Michigan State University
          </p>
        </motion.div>

        {/* Rotating tagline */}
        <div className="mt-8 h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-base md:text-lg italic text-text-muted"
            >
              &ldquo;{taglines[taglineIndex]}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-16"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <a
              href="#at-a-glance"
              className="flex flex-col items-center gap-2 text-text-muted transition-colors hover:text-accent-primary"
              aria-label="Scroll to explore"
            >
              <span className="font-mono text-xs tracking-widest">EXPLORE</span>
              <ChevronDown size={20} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
