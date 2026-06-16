import { personal, socials } from "../data/portfolio";
import { SocialIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-slate-400">
          © {year} {personal.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-slate-400 transition-colors hover:text-accent"
            >
              <SocialIcon icon={s.icon} className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
