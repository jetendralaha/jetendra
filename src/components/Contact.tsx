import { motion } from "framer-motion";
import { personal, socials } from "../data/portfolio";
import Section from "./Section";
import { LocationIcon, MailIcon, PhoneIcon, SocialIcon } from "./Icons";

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Let's talk" title="Get in Touch">
      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-base leading-relaxed text-slate-300">
            I love turning bold ideas into reality. If you want to build
            something new — an innovative product, a secure cloud-native
            platform, or an AI-driven idea you've been dreaming up — let's
            connect and make it happen together.
          </p>

          <div className="space-y-4">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-ink-800/50 p-4 transition-colors hover:border-accent/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                <MailIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-slate-400">
                  Email
                </span>
                <span className="text-sm text-slate-100">{personal.email}</span>
              </span>
            </a>

            <a
              href={`tel:${personal.phone.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-ink-800/50 p-4 transition-colors hover:border-accent/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-slate-400">
                  Phone
                </span>
                <span className="text-sm text-slate-100">{personal.phone}</span>
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-ink-800/50 p-4">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent/10 text-accent">
                <LocationIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-slate-400">
                  Location
                </span>
                <span className="text-sm text-slate-100">
                  {personal.location}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-slate-300 transition-all hover:border-accent hover:text-accent"
              >
                <SocialIcon icon={s.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col justify-center rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 to-transparent p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-100">
            Got an idea? Let's build something amazing.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            I'm an innovator at heart — from hardened Kubernetes platforms to
            AI-driven security, I love building things that make a difference.
            If you want to create something new, let's connect and bring it to
            life.
          </p>
          <a
            href={`mailto:${personal.email}`}
            className="mx-auto mt-6 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-105"
          >
            Let's build together
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
