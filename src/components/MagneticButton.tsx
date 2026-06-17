import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  /** How strongly the element is pulled toward the pointer (0–1). */
  strength?: number;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

/**
 * Wraps a link/button so it gently moves toward the pointer while hovered —
 * a tactile "magnetic" micro-interaction. Falls back to a static element when
 * the user prefers reduced motion.
 */
export default function MagneticButton({
  children,
  href,
  className = "",
  strength = 0.4,
  target,
  rel,
  ...rest
}: MagneticButtonProps) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reducedMotion ? undefined : { x: springX, y: springY }}
      className={className}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
