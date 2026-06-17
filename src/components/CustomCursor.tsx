import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useIsTouchDevice } from "../hooks/useIsTouchDevice";

/**
 * A custom dual-ring cursor that trails the pointer and grows when hovering
 * interactive elements. Disabled on touch devices and when the user prefers
 * reduced motion (the native cursor is kept in those cases).
 */
export default function CustomCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const enabled = !reducedMotion && !isTouch;

  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("custom-cursor");
      return;
    }
    document.documentElement.classList.add("custom-cursor");

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, [data-cursor]';

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest(interactiveSelector)));
    };
    const onLeave = () => setHidden(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring (trailing) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 rounded-full border border-accent/70 md:block"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: hovering ? 1.8 : 1,
          opacity: hidden ? 0 : hovering ? 0.5 : 0.9,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
      {/* Inner dot (instant) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-accent md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hidden ? 0 : 1, scale: hovering ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
