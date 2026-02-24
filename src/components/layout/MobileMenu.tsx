"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { navLinks, footerExtraLinks } from "@/data/navigation";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-secondary text-text-secondary transition-colors hover:text-accent-primary"
        aria-label="Open menu"
      >
        <Menu size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-bg-primary/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-bg-secondary border-l border-border p-6"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="mb-8 flex h-9 w-9 items-center justify-center self-end rounded-lg border border-border text-text-secondary transition-colors hover:text-accent-primary"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>

              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg px-4 py-3 font-display text-lg text-text-primary transition-colors hover:bg-bg-tertiary hover:text-accent-primary"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="px-4 pb-2 font-mono text-xs text-text-muted tracking-widest">MORE</p>
                <div className="flex flex-col gap-1">
                  {footerExtraLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (navLinks.length + i) * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-lg px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-accent-primary"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
