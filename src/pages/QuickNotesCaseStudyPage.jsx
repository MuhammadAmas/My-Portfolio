import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Command, Camera, CalendarDays, Cloud, ListChecks, Bot, Github } from "lucide-react";
import { Button } from "../components/ui/button";
import { projects } from "../data/projectsInfo";
import { trackExternalLink } from "../lib/analytics";

const project = projects.find(({ id }) => id === "13");
const features = [
  [Command, "Capture without switching apps", "A floating macOS bubble and global shortcuts open a quick-note box wherever you are. Type and press Enter to save to today; Shift+Enter adds another line."],
  [Camera, "Keep the context", "Capture a screen region, a window, or the full screen and attach a description. Voice input turns speech into note text, with on-device recognition where supported."],
  [ListChecks, "Turn notes into action", "Complete notes, add checklists, drag to set priority, and share individual notes by email. A shared note can be edited and completed by its recipients."],
  [CalendarDays, "Plan beyond today", "Move unfinished notes to another day, organize the week by dragging notes between days, and review a weekly summary of completed work and repeatedly postponed items."],
  [Cloud, "Keep working offline", "The Mac app queues notes and screenshots while offline and uploads them when connectivity returns. The web app supports offline use and live synchronization."],
  [Bot, "Connect AI assistants", "A Go MCP server lets compatible assistants search and organize notes, update checklists, and prepare weekly reviews under the same account permissions as the apps."],
];

function Screenshot({ name, alt, width, height, caption, className = "" }) {
  const src = `/projects-images/quicknotes/${name}.png`;
  return (
    <figure className={`overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 ${className}`}>
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size screenshot: ${alt}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className="mx-auto h-auto max-w-full" />
      </a>
      <figcaption className="border-t border-neutral-200 px-5 py-4 text-sm leading-relaxed text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">{caption}</figcaption>
    </figure>
  );
}

export default function QuickNotesCaseStudyPage() {
  return (
    <article className="mx-auto max-w-6xl py-8 text-neutral-900 dark:text-neutral-100 md:py-16">
      <Link to="/projects" className="inline-flex items-center gap-2 py-3 text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"><ArrowLeft className="h-4 w-4" /> All projects</Link>
      <header className="pb-10 pt-8 md:pb-14">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">Case study / Productivity across devices</p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">QuickNotes<span className="text-orange-500">.</span></h1>
        <p className="mt-6 max-w-3xl text-2xl font-medium leading-snug md:text-3xl">Capture the thought. Stay in the conversation.</p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">A connected note-taking system for macOS, the web, your phone, and Chrome. Capture an action item in seconds, then return to the same notes wherever you plan your day.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild><a href={project.demoLink} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink(project.demoLink, "QuickNotes app")}>Open QuickNotes <ArrowUpRight className="ml-2 h-4 w-4" /></a></Button>
          <Button asChild variant="outline"><a href={project.githubLink} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink(project.githubLink, "QuickNotes source")}><Github className="mr-2 h-4 w-4" /> View source</a></Button>
        </div>
      </header>

      <dl className="mb-10 grid grid-cols-2 gap-6 border-y border-neutral-200 py-6 dark:border-neutral-800 md:grid-cols-4">
        {[["Scope", "Full stack & native apps"], ["Platforms", "Mac, web, phone & Chrome"], ["Focus", "Fast capture & daily follow-through"], ["Year", "2026"]].map(([label, value]) => (
          <div key={label}><dt className="mb-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">{label}</dt><dd className="text-sm font-medium">{value}</dd></div>
        ))}
      </dl>
      <Screenshot name="web-today" width={1600} height={1000} alt="QuickNotes web app with daily notes, completion progress, shared notes, and date navigation" caption="The daily workspace keeps open and completed notes together, with quick capture and a clear next step for unfinished work. Screenshots throughout this case study use sample notes." />

      <section className="grid gap-8 py-16 md:grid-cols-[1fr_2fr] md:py-20" aria-labelledby="challenge-title">
        <div><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">01 / The challenge</p><h2 id="challenge-title" className="text-3xl font-semibold tracking-tight">Small tasks disappear between apps.</h2></div>
        <div className="space-y-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400"><p>A meeting produces a follow-up. A browser tab contains something to revisit. A screenshot captures an issue worth fixing. Opening a separate task manager can interrupt the moment, while leaving the thought in place makes it easy to forget.</p><p>QuickNotes separates quick capture from later organization. A small entry point saves the thought to today; a shared workspace makes it available for review, prioritization, and completion.</p></div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/60 md:p-10" aria-labelledby="capture-title">
        <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">02 / The capture experience</p>
        <h2 id="capture-title" className="text-3xl font-semibold tracking-tight">One shortcut from thought to saved note.</h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-400">On a Mac, press <kbd className="rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-600">⌘⇧N</kbd> or <kbd className="rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-600">⌃⌥N</kbd>, type, and press Enter. The floating bubble keeps capture close without needing to navigate a full workspace.</p>
        <div className="mx-auto mt-8 max-w-3xl"><Screenshot name="mac-quick-note" width={860} height={296} alt="QuickNotes native Mac quick capture box with saved-to-today confirmation" caption="The native macOS quick-note box is designed around a single action: capture now and organize later." /></div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">{[["Capture", "Text, screenshots, or voice"], ["Sync", "The same account across devices"], ["Follow through", "Complete, prioritize, or reschedule"]].map(([title, detail], i) => <div key={title} className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-700"><p className="mb-3 text-sm text-orange-500">0{i + 1}</p><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{detail}</p></div>)}</div>
      </section>

      <section className="py-16" aria-labelledby="platforms-title">
        <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">03 / A connected experience</p>
        <h2 id="platforms-title" className="text-3xl font-semibold tracking-tight">One set of notes, wherever you work.</h2>
        <p className="mb-8 mt-5 max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-400">The Chrome popup captures ideas while browsing and saves selected text, links, or pages through the context menu. The responsive web app can be installed on a phone, keeping daily notes available away from the desk.</p>
        <div className="grid items-start gap-6 md:grid-cols-2">
          <Screenshot name="chrome-popup" width={720} height={940} alt="QuickNotes Chrome extension popup with a new note and today's checklist" caption="Chrome extension: add a note, capture the current tab, and complete today's items from the toolbar." />
          <Screenshot name="phone-dark" width={462} height={1000} alt="QuickNotes phone interface in dark mode with open, shared, and completed sample notes" caption="Phone web app: the same day-based workflow with touch controls, sharing, and light or dark themes." />
        </div>
      </section>

      <section className="border-t border-neutral-200 py-12 dark:border-neutral-800" aria-labelledby="features-title">
        <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">04 / Product details</p>
        <h2 id="features-title" className="mb-8 text-3xl font-semibold tracking-tight">Built for capture and follow-through.</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map(([Icon, title, description]) => <div key={title} className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"><Icon className="mb-6 h-6 w-6 text-orange-500" aria-hidden="true" /><h3 className="mb-3 text-xl font-semibold">{title}</h3><p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{description}</p></div>)}</div>
      </section>

      <section className="grid gap-8 border-t border-neutral-200 py-16 dark:border-neutral-800 md:grid-cols-[1fr_2fr]" aria-labelledby="engineering-title">
        <div><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">05 / Engineering</p><h2 id="engineering-title" className="text-3xl font-semibold tracking-tight">Different clients. Shared rules.</h2></div>
        <div className="space-y-5 leading-relaxed text-neutral-600 dark:text-neutral-400"><p>The web app uses vanilla JavaScript and the Firebase SDK. The macOS client uses Swift and AppKit, while the Manifest V3 Chrome extension and Mac client talk to Firestore over REST. Firebase Hosting serves the web app, Google sign-in provides authentication, and Firestore stores notes and synchronizes changes.</p><p>Ownership and sharing rules are enforced in Firestore. Recipients can read and work on shared notes, while deletion and sharing changes stay with the owner. The MCP server signs in as the user and follows those same access rules.</p><p>Screenshot attachments are kept separately from note documents and loaded when opened. The Mac app queues unsynced captures locally, so a temporary loss of connection does not interrupt note-taking.</p><div className="flex flex-wrap gap-2 pt-2">{project.technologies.map((tech) => <span key={tech} className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">{tech}</span>)}</div></div>
      </section>

      <section className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800 md:p-10" aria-labelledby="takeaway-title"><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">06 / Takeaway</p><h2 id="takeaway-title" className="text-3xl font-semibold tracking-tight">Make the first step easy.</h2><p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">QuickNotes treats capture as a small interaction and organization as a separate moment. Native shortcuts, browser entry points, and a shared data model bring that approach across devices without asking the user to learn a different workflow on each one.</p></section>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-neutral-200 py-8 dark:border-neutral-800"><Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium"><ArrowLeft className="h-4 w-4" /> More projects</Link><Button asChild variant="outline"><Link to="/contact">Let’s work together <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button></div>
    </article>
  );
}
