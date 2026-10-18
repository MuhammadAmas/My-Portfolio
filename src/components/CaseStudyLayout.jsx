import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Button } from "./ui/button";
import { trackExternalLink } from "../lib/analytics";

export default function CaseStudyLayout({ project, name, eyebrow, subtitle, description, facts, repositories, children }) {
  return (
    <article className="mx-auto max-w-6xl py-8 text-neutral-900 dark:text-neutral-100 md:py-16">
      <Link to="/projects" className="inline-flex items-center gap-2 py-3 text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"><ArrowLeft className="h-4 w-4" /> All projects</Link>
      <header className="pb-10 pt-8 md:pb-14">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">Case study / {eyebrow}</p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">{name}<span className="text-violet-500">.</span></h1>
        <p className="mt-6 max-w-3xl text-2xl font-medium leading-snug md:text-3xl">{subtitle}</p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.demoLink && <Button asChild><a href={project.demoLink} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink(project.demoLink, `${project.title} demo`)}>Explore the demo <ArrowUpRight className="ml-2 h-4 w-4" /></a></Button>}
          {repositories.map(([label, href]) => <Button key={href} asChild variant="outline"><a href={href} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink(href, `${project.title} ${label}`)}><Github className="mr-2 h-4 w-4" />{label}</a></Button>)}
        </div>
      </header>
      <dl className="mb-10 grid grid-cols-2 gap-6 border-y border-neutral-200 py-6 dark:border-neutral-800 md:grid-cols-4">{facts.map(([label, value]) => <div key={label}><dt className="mb-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">{label}</dt><dd className="text-sm font-medium">{value}</dd></div>)}</dl>
      {children}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-neutral-200 py-8 dark:border-neutral-800"><Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium"><ArrowLeft className="h-4 w-4" /> More projects</Link><Button asChild variant="outline"><Link to="/contact">Let’s work together <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button></div>
    </article>
  );
}

export function CaseStudySection({ id, number, title, children }) {
  return <section className="border-t border-neutral-200 py-12 dark:border-neutral-800" aria-labelledby={id}><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">{number}</p><h2 id={id} className="mb-6 text-3xl font-semibold tracking-tight">{title}</h2>{children}</section>;
}

export function CaseStudyFeatures({ features }) {
  return <div className="grid gap-5 md:grid-cols-2">{features.map(([Icon, title, description]) => <div key={title} className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"><Icon className="mb-6 h-6 w-6 text-violet-500" aria-hidden="true" /><h3 className="mb-3 text-xl font-semibold">{title}</h3><p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{description}</p></div>)}</div>;
}

export function CaseStudyStack({ technologies }) {
  return <div className="mt-6 flex flex-wrap gap-2">{technologies.map((tech) => <span key={tech} className="rounded-full border border-neutral-200 px-4 py-2 text-sm dark:border-neutral-700">{tech}</span>)}</div>;
}
