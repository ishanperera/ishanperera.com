"use client";

import { motion, useReducedMotion } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  type?: "character" | "word";
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  staggerDelay = 0.03,
  type = "character",
}: AnimatedTextProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const items = type === "character" ? text.split("") : text.split(" ");

  return (
    <span className={className} role="text" aria-label={text}>
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * staggerDelay,
            ease: "easeOut",
          }}
          className="inline-block"
          aria-hidden="true"
        >
          {item}
          {type === "word" && i < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}
