import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { personal } from "../data/portfolio";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const initials = personal.name
  .split(" ")
  .map((n) => n[0])
  .join("");

/**
 * A brief intro overlay that animates the user's initials and a progress bar,
 * then fades away. Skipped (renders nothing) when reduced motion is preferred.
 */
export default function Loader() {
  const reducedMotion = usePrefersReducedMotion();
  const [done, setDone] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => setDone(true), 1900);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] grid place-items-center bg-ink-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative grid h-24 w-24 place-items-center">
              <motion.span
                className="absolute inset-0 rounded-2xl border border-accent/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="gradient-text text-3xl font-extrabold tracking-tight"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {initials}
              </motion.span>
            </div>

            <div className="h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent-soft"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />
            </div>

            <motion.p
              className="text-xs uppercase tracking-[0.3em] text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {personal.name}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
