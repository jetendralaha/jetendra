import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { personal, socials } from "../data/portfolio";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { SocialIcon } from "./Icons";
import ProfileImage from "./ProfileImage";

// Lazy-load the heavy 3D canvas so the page paints fast.
const ParticleNetwork = lazy(() => import("./ParticleNetwork"));

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* 3D background (skipped when reduced motion is requested) */}
      <div className="absolute inset-0 -z-10">
        {!reducedMotion && (
          <Suspense fallback={null}>
            <ParticleNetwork />
          </Suspense>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/30 via-ink-950/40 to-ink-950" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              {personal.name}
            </h1>
            <p className="mt-3 bg-gradient-to-r from-accent via-accent-soft to-accent bg-clip-text text-lg font-semibold text-transparent sm:text-2xl">
              {personal.title}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {personal.tagline}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-105"
              >
                Get in touch
              </a>
            </div>

            <div className="mt-9 flex items-center gap-3">
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="hidden justify-center lg:flex"
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-accent/20 blur-2xl" />
              <div className="relative h-64 w-64 animate-float overflow-hidden rounded-full border-2 border-accent/40 bg-ink-800 ring-4 ring-accent/10">
                <ProfileImage
                  src={personal.photoUrl}
                  alt={personal.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500">
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-slate-600 p-1">
          <span className="block h-2 w-1 animate-float rounded-full bg-accent" />
        </div>
      </div>
    </section>
  );
}
