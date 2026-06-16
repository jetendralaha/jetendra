import { motion } from "framer-motion";
import { education } from "../data/portfolio";
import Section from "./Section";

export default function Education() {
  return (
    <Section id="education" eyebrow="Background" title="Education">
      <div className="grid gap-6 sm:grid-cols-2">
        {education.map((item, i) => (
          <motion.div
            key={item.degree}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="rounded-2xl border border-white/10 bg-ink-800/50 p-6 transition-colors hover:border-accent/40"
          >
            <h3 className="text-lg font-semibold text-slate-100">
              {item.degree}
            </h3>
            <p className="mt-1 text-accent">{item.institution}</p>
            {item.period && (
              <p className="mt-1 text-sm text-slate-400">{item.period}</p>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
