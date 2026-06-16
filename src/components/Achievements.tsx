import { motion } from "framer-motion";
import { achievements } from "../data/portfolio";
import Section from "./Section";
import { TrophyIcon } from "./Icons";

export default function Achievements() {
  return (
    <Section id="achievements" eyebrow="Highlights" title="Key Achievements">
      <div className="grid gap-6 sm:grid-cols-2">
        {achievements.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="flex gap-4 rounded-2xl border border-white/10 bg-ink-800/50 p-6 transition-colors hover:border-accent/40"
          >
            <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
              <TrophyIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-slate-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
