import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github, ChartNoAxesCombined, MessageCircle, Tags, Target } from "lucide-react";
import { Button } from "../components/ui/button";
import { projects } from "../data/projectsInfo";
import { trackExternalLink } from "../lib/analytics";
import { hasDistinctDemoLink } from "../lib/projectLinks";

const project = projects.find(({ id }) => id === "4");
const features = [
  [Tags, "Categorize the spending", "AI-powered expense categorization helps organize transactions into spending categories, making patterns easier to understand."],
  [ChartNoAxesCombined, "See the patterns", "Spending charts and recent-transaction summaries bring changes over time and individual purchases into the same dashboard."],
  [MessageCircle, "Ask a follow-up", "The conversational interface presents spending insights and lets users ask questions about their habits, alongside quick prompts for common questions."],
  [Target, "Start with personal goals", "Onboarding introduces financial goals such as building an emergency fund or paying off debt, framing the experience around what matters to the user."],
];

function Screenshot({ src, alt, caption, width, height }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size screenshot: ${alt}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className="h-auto w-full" />
      </a>
      <figcaption className="px-5 py-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{caption}</figcaption>
    </figure>
  );
}

export default function MailSpendCaseStudyPage() {
  return (
    <article className="mx-auto max-w-6xl py-8 text-neutral-900 dark:text-neutral-100 md:py-16">
      <Link to="/projects" className="inline-flex items-center gap-2 py-3 text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"><ArrowLeft className="h-4 w-4" /> All projects</Link>
      <header className="pb-10 pt-8 md:pb-14">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">Case study / AI-powered expense tracking</p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">MailSpend<span className="text-indigo-500">.</span></h1>
        <p className="mt-6 max-w-3xl text-2xl font-medium leading-snug md:text-3xl">Turn spending data into a conversation you can understand.</p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">An expense-tracking application with AI-powered categorization, visual spending summaries, and personalized insights. A React frontend and Node.js backend support the full stack product.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {hasDistinctDemoLink(project) && <Button asChild><a href={project.demoLink} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink(project.demoLink, "MailSpend demo")}>Explore MailSpend <ArrowUpRight className="ml-2 h-4 w-4" /></a></Button>}
          <Button asChild variant="outline"><a href={project.githubLink} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink(project.githubLink, "MailSpend source")}><Github className="mr-2 h-4 w-4" /> View source</a></Button>
        </div>
      </header>

      <dl className="mb-10 grid grid-cols-2 gap-6 border-y border-neutral-200 py-6 dark:border-neutral-800 md:grid-cols-4">
        {[["Scope", "Full stack development"], ["Frontend", "React.js"], ["Backend", "Node.js"], ["Year", "2024"]].map(([label, value]) => <div key={label}><dt className="mb-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">{label}</dt><dd className="text-sm font-medium">{value}</dd></div>)}
      </dl>
      <Screenshot src={project.image} width={1280} height={720} alt="MailSpend dashboard with an example spending conversation, total spending chart, quick prompts, and recent transactions" caption="The dashboard combines example transaction data, spending trends, and conversational insights in a single workspace." />

      <section className="grid gap-8 py-16 md:grid-cols-[1fr_2fr] md:py-20" aria-labelledby="challenge-title">
        <div><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">01 / The challenge</p><h2 id="challenge-title" className="text-3xl font-semibold tracking-tight">Transactions need context.</h2></div>
        <div className="space-y-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400"><p>A list of transactions tells someone what they spent, but understanding the pattern takes more work. Categories, dates, and merchants need to come together before the numbers become useful.</p><p>MailSpend brings expense categorization, visual summaries, and a conversational assistant into the same experience. Users can see a trend, explore the spending behind it, and ask a follow-up without moving to a separate tool.</p></div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/60 md:p-10" aria-labelledby="experience-title">
        <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">02 / Product experience</p>
        <h2 id="experience-title" className="mb-8 text-3xl font-semibold tracking-tight">From a financial goal to a clearer daily picture.</h2>
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="space-y-7">
            <div><h3 className="text-xl font-semibold">Set the direction</h3><p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">The preference screen asks users about their financial goals before introducing the dashboard. The options range from paying off debt to travel and long-term saving.</p></div>
            <div><h3 className="text-xl font-semibold">Bring the information together</h3><p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">The dashboard places an import-bank-statement entry point, spending trends, category summaries, recent purchases, and the assistant in one view.</p></div>
            <div><h3 className="text-xl font-semibold">Make the next question easy</h3><p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">The demo conversation shows how a category-level observation can become a follow-up about spending habits. Quick prompts offer another starting point for exploring the data.</p></div>
          </div>
          <div className="mx-auto w-full max-w-md"><Screenshot src="/projects-images/mailspend/preferences.jpg" width={901} height={984} alt="MailSpend preferences screen asking for three financial goals" caption="Financial-goal onboarding captured from the public MailSpend demo." /></div>
        </div>
      </section>

      <section className="py-16" aria-labelledby="features-title">
        <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">03 / Core features</p>
        <h2 id="features-title" className="mb-8 text-3xl font-semibold tracking-tight">Categorize. Visualize. Ask.</h2>
        <div className="grid gap-5 md:grid-cols-2">{features.map(([Icon, title, description]) => <div key={title} className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"><Icon className="mb-6 h-6 w-6 text-indigo-500" aria-hidden="true" /><h3 className="mb-3 text-xl font-semibold">{title}</h3><p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{description}</p></div>)}</div>
      </section>

      <section className="grid gap-8 border-t border-neutral-200 py-16 dark:border-neutral-800 md:grid-cols-[1fr_2fr]" aria-labelledby="engineering-title">
        <div><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">04 / Engineering</p><h2 id="engineering-title" className="text-3xl font-semibold tracking-tight">React on the frontend. Node.js on the backend.</h2></div>
        <div className="space-y-5 leading-relaxed text-neutral-600 dark:text-neutral-400"><p>The project spans a React.js interface and a Node.js backend. Ant Design provides interface components, Charts.js supports spending visualizations, and Vite provides the frontend development and build setup.</p><p>The interface brings together distinct views of the same financial picture: a chart for trends, transaction lists for detail, and conversation for explanation. Keeping them together makes the relationship between the data and an insight easier to follow.</p><div className="flex flex-wrap gap-2 pt-2">{project.technologies.map((tech) => <span key={tech} className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">{tech}</span>)}</div></div>
      </section>

      <section className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800 md:p-10" aria-labelledby="takeaway-title"><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">05 / Takeaway</p><h2 id="takeaway-title" className="text-3xl font-semibold tracking-tight">Help people understand the numbers.</h2><p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">The product combines visual exploration with conversational guidance. The goal is to help users move from individual transactions to a clearer understanding of their spending habits, with their personal goals providing the context.</p></section>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-neutral-200 py-8 dark:border-neutral-800"><Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium"><ArrowLeft className="h-4 w-4" /> More projects</Link><Button asChild variant="outline"><Link to="/contact">Let’s work together <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button></div>
    </article>
  );
}
