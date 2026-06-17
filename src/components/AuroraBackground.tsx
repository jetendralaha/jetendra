/**
 * A soft, animated aurora backdrop made of blurred accent blobs. Pure CSS
 * animation (cheap, GPU-composited) — sits behind page content. Honours
 * reduced motion via the global media query that freezes animations.
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -left-1/4 top-0 h-[42rem] w-[42rem] animate-aurora rounded-full bg-accent/10 blur-[140px]" />
      <div className="absolute right-[-15%] top-1/3 h-[38rem] w-[38rem] animate-aurora rounded-full bg-accent-deep/10 blur-[150px] [animation-delay:-6s]" />
      <div className="absolute bottom-[-10%] left-1/3 h-[34rem] w-[34rem] animate-aurora rounded-full bg-accent-soft/10 blur-[130px] [animation-delay:-12s]" />
      <div className="absolute inset-0 bg-ink-950/40" />
    </div>
  );
}
