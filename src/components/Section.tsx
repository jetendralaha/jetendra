import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-6 py-24 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent to-transparent" />
      </motion.div>
      {children}
    </section>
  );
}
