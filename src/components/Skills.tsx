import { motion } from "framer-motion";
import { skills } from "../data/portfolio";
import Section from "./Section";
import TiltCard from "./TiltCard";
import { SkillIcon } from "./Icons";

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
              <div className="flex items-center gap-3">
                {/* Floating category icon box */}
                <span
                  className="grid h-11 w-11 shrink-0 animate-float place-items-center rounded-xl border border-accent/30 bg-gradient-to-br from-accent/20 to-accent/5 text-accent shadow-lg shadow-accent/10"
                  style={{ animationDelay: `${(i % 4) * 0.4}s` }}
                >
                  <SkillIcon category={group.category} className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-accent">
                  {group.category}
                </h3>
              </div>

              <ul className="mt-5 grid grid-cols-2 gap-2.5">
                {group.items.map((item, j) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 + j * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="group/box flex items-center gap-2 rounded-xl border border-white/10 bg-ink-700/40 px-3 py-2 text-sm text-slate-200 transition-colors hover:border-accent/50 hover:bg-accent/5"
                  >
                    <SkillIcon
                      category={group.category}
                      className="h-3.5 w-3.5 shrink-0 text-accent/70 transition-colors group-hover/box:text-accent"
                    />
                    <span className="truncate">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
