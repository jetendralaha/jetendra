import { motion, useScroll, useSpring } from "framer-motion";

/** A thin accent progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[9998] h-0.5 origin-left bg-gradient-to-r from-accent via-accent-soft to-accent"
      style={{ scaleX }}
    />
  );
}
