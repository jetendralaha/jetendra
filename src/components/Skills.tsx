import { motion } from "framer-motion";
import { skills } from "../data/portfolio";
import Section from "./Section";
import TiltCard from "./TiltCard";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="What I work with" title="Skills & Tools">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            <TiltCard className="glow-border h-full rounded-2xl border border-white/10 bg-ink-800/50 p-6 transition-colors hover:border-accent/40">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/10 bg-ink-700/50 px-3 py-1.5 text-sm text-slate-200 transition-colors hover:border-accent/40 hover:text-accent-soft"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
