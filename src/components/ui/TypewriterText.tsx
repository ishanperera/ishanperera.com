"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export function TypewriterText({
  text,
  delay = 0,
  speed = 50,
  className,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay, prefersReducedMotion, text]);

  useEffect(() => {
    if (!started || prefersReducedMotion) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, prefersReducedMotion]);

  return (
    <span className={className}>
      {displayText}
      {started && displayText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}
