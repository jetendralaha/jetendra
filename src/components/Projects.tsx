import { motion } from "framer-motion";
import { projects } from "../data/portfolio";
import Section from "./Section";
import { ExternalIcon, GithubIcon } from "./Icons";

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Selected work" title="Projects">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/50 p-6 transition-all hover:-translate-y-1 hover:border-accent/40"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl transition-opacity group-hover:opacity-100" />

            <h3 className="text-lg font-semibold text-slate-100">
              {project.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
              {project.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-accent/20 bg-accent/5 px-2.5 py-1 text-xs font-medium text-accent-soft"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {(project.link || project.repo) && (
              <div className="mt-5 flex items-center gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-accent"
                  >
                    <ExternalIcon className="h-4 w-4" /> Live
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-accent"
                  >
                    <GithubIcon className="h-4 w-4" /> Code
                  </a>
                )}
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
