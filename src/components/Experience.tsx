import { motion } from "framer-motion";
import { experience } from "../data/portfolio";
import Section from "./Section";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Where I've worked" title="Experience">
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-white/10 to-transparent sm:left-4" />

        <div className="space-y-10">
          {experience.map((job, i) => (
            <motion.div
              key={`${job.company}-${i}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative pl-12 sm:pl-16"
            >
              {/* Node */}
              <span className="absolute left-0 top-1 grid h-7 w-7 place-items-center rounded-full border border-accent/50 bg-ink-900 sm:left-1">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              </span>

              <div className="rounded-2xl border border-white/10 bg-ink-800/50 p-6 transition-colors hover:border-accent/40">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">
                      {job.role}
                    </h3>
                    <p className="text-accent">{job.company}</p>
                  </div>
                  <div className="text-right text-sm text-slate-400">
                    <p className="font-medium text-slate-300">{job.period}</p>
                    {job.location && <p>{job.location}</p>}
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {job.highlights.map((h, hi) => (
                    <li
                      key={hi}
                      className="flex gap-3 text-sm leading-relaxed text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/70" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
