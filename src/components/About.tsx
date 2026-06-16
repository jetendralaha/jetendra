import { motion } from "framer-motion";
import { personal } from "../data/portfolio";
import Section from "./Section";
import ProfileImage from "./ProfileImage";

export default function About() {
  return (
    <Section id="about" eyebrow="Who I am" title="About Me">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative max-w-xs">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-accent/30 to-transparent blur-xl" />
            <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-ink-800">
              <ProfileImage
                src={personal.photoUrl}
                alt={personal.name}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          <div className="space-y-5 text-base leading-relaxed text-slate-300">
            {personal.about.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {personal.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-ink-800/60 p-5 backdrop-blur transition-colors hover:border-accent/40"
              >
                <p className="text-xl font-bold text-accent">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
