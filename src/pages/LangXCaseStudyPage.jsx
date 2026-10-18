import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github, ScanText, Braces, Layers, Bug } from "lucide-react";
import { Button } from "../components/ui/button";
import { projects } from "../data/projectsInfo";
import { trackExternalLink } from "../lib/analytics";

const project = projects.find(({ id }) => id === "6");
const sourceRoot = "https://github.com/MuhammadAmas/LangX-Compiler/blob/77e78be4be3a6805d1901e446a8cb21c39acae71/Compiler/";
const stages = [
  ["01", "Scan", "Source characters → words", "wordBreaker.py"],
  ["02", "Classify", "Words → typed tokens", "classifyToken.py"],
  ["03", "Parse", "Tokens → grammar checks", "syntaxAnalyzer.py"],
  ["04", "Analyze", "Symbols, scopes & reports", "semanticAnalyzer.py"],
];
const features = [
  [ScanText, "A hand-written lexical layer", "The word breaker handles separators, compound operators, quoted literals, and comments. Tokens carry their value and source line; classification adds keyword, operator, punctuation, literal, or identifier types."],
  [Braces, "Recursive-descent parsing", "Grammar productions are implemented as Python functions that consume a token stream. The syntax analyzer tracks unexpected tokens and reports their value, type, and source line."],
  [Layers, "Symbols and nested scopes", "Class records, attribute tables, and function-scope entries track declarations. A scope stack supports lookup as the analyzer enters and leaves nested blocks."],
  [Bug, "Semantic diagnostics", "The semantic analyzer includes checks for duplicate declarations, unknown names, and invalid inheritance relationships. Its report includes diagnostic details alongside the collected symbol tables."],
];

export default function LangXCaseStudyPage() {
  return (
    <article className="mx-auto max-w-6xl py-8 text-neutral-900 dark:text-neutral-100 md:py-16">
      <Link to="/projects" className="inline-flex items-center gap-2 py-3 text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"><ArrowLeft className="h-4 w-4" /> All projects</Link>
      <header className="pb-10 pt-8 md:pb-14">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">Case study / Compiler construction</p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">LangX<span className="text-emerald-500">.</span></h1>
        <p className="mt-6 max-w-3xl text-2xl font-medium leading-snug md:text-3xl">From source text to syntax and meaning.</p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">A compiler front end built in Python for a custom language inspired by Python and C++. This collaborative university project turns language rules into a lexer, parser, and semantic analyzer.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild><a href={project.githubLink} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink(project.githubLink, "LangX source")}><Github className="mr-2 h-4 w-4" /> Explore the code</a></Button>
          <Button asChild variant="outline"><a href="#example">See an analysis example <ArrowUpRight className="ml-2 h-4 w-4" /></a></Button>
        </div>
      </header>

      <dl className="mb-10 grid grid-cols-2 gap-6 border-y border-neutral-200 py-6 dark:border-neutral-800 md:grid-cols-4">
        {[["Project", "Collaborative university project"], ["Implementation", "Python"], ["Focus", "Compiler front end"], ["Year", "2023"]].map(([label, value]) => <div key={label}><dt className="mb-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">{label}</dt><dd className="text-sm font-medium">{value}</dd></div>)}
      </dl>

      <section id="example" className="scroll-mt-24 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 text-neutral-100" aria-labelledby="example-title">
        <div className="border-b border-neutral-800 px-6 py-5"><p className="mb-2 text-xs uppercase tracking-widest text-emerald-400">A verified example</p><h2 id="example-title" className="text-2xl font-semibold">Valid syntax. A declaration conflict.</h2></div>
        <div className="grid md:grid-cols-2">
          <div className="border-b border-neutral-800 p-6 md:border-b-0 md:border-r"><h3 className="mb-6 text-xs uppercase tracking-widest text-neutral-400">Source / example.x</h3><pre className="overflow-x-auto text-sm leading-8 sm:text-base"><code><span className="text-neutral-500">1  </span><span className="text-emerald-400">num</span>{" count = 3;\n"}<span className="text-neutral-500">2  </span><span className="text-emerald-400">num</span>{" count = 5;"}</code></pre><p className="mt-8 text-sm leading-relaxed text-neutral-400">Both statements match the declaration grammar. The second introduces the same name again in the same scope.</p></div>
          <div className="p-6"><h3 className="mb-6 text-xs uppercase tracking-widest text-neutral-400">Analyzer output / condensed</h3><pre className="overflow-x-auto text-sm leading-7"><code><span className="text-emerald-400">{"Your code is syntactically correct\n\n"}</span><span className="text-amber-400">{"*** Re-Declaration Error ***\n"}</span>{"ID:      count\nAs:      Inside Scope No # 0\nLine #:  2"}</code></pre></div>
        </div>
        <p className="border-t border-neutral-800 px-6 py-4 text-sm leading-relaxed text-neutral-400">Executed against the repository’s lexer, syntax analyzer, and semantic analyzer. Output is condensed for readability; the full semantic report also includes symbol-table entries.</p>
      </section>

      <section className="grid gap-8 py-16 md:grid-cols-[1fr_2fr] md:py-20" aria-labelledby="challenge-title">
        <div><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">01 / The challenge</p><h2 id="challenge-title" className="text-3xl font-semibold tracking-tight">Make a language’s rules explicit.</h2></div>
        <div className="space-y-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400"><p>A language specification needs more than recognizable keywords. The implementation has to separate characters into tokens, recognize valid statements, and track what names mean within a scope.</p><p>LangX explores these concerns through separate Python modules. Keeping tokenization, grammar traversal, and semantic utilities visible makes it possible to follow an input from its original text to a diagnostic report.</p></div>
      </section>

      <section className="border-t border-neutral-200 py-12 dark:border-neutral-800" aria-labelledby="pipeline-title">
        <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">02 / Architecture</p>
        <h2 id="pipeline-title" className="mb-8 text-3xl font-semibold tracking-tight">Follow the analysis stages.</h2>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stages.map(([step, title, description, file]) => <li key={step} className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800"><p className="mb-5 text-sm text-emerald-600 dark:text-emerald-400">{step}</p><h3 className="text-xl font-semibold">{title}</h3><p className="mb-4 mt-2 text-sm text-neutral-600 dark:text-neutral-400">{description}</p><a href={`${sourceRoot}${file}`} target="_blank" rel="noopener noreferrer" className="break-all font-mono text-xs underline underline-offset-4">{file}</a></li>)}</ol>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">The current CLI entry point reads the configured input file, tokenizes it, invokes semantic analysis, and writes a report. A standalone syntax analyzer is also present; its invocation in main.py is commented out. The stages above describe the modules, rather than four separate passes run by the CLI.</p>
      </section>

      <section className="py-12" aria-labelledby="implementation-title"><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">03 / Implementation</p><h2 id="implementation-title" className="mb-8 text-3xl font-semibold tracking-tight">The mechanics behind the report.</h2><div className="grid gap-5 md:grid-cols-2">{features.map(([Icon, title, description]) => <div key={title} className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"><Icon className="mb-6 h-6 w-6 text-emerald-500" aria-hidden="true" /><h3 className="mb-3 text-xl font-semibold">{title}</h3><p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{description}</p></div>)}</div></section>

      <section className="grid gap-8 border-t border-neutral-200 py-16 dark:border-neutral-800 md:grid-cols-[1fr_2fr]" aria-labelledby="language-title">
        <div><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">04 / Language design</p><h2 id="language-title" className="text-3xl font-semibold tracking-tight">Familiar ideas, custom grammar.</h2></div>
        <div className="space-y-5 leading-relaxed text-neutral-600 dark:text-neutral-400"><p>The token definitions include types such as <code>num</code>, <code>dec</code>, <code>bool</code>, and <code>string</code>. Control-flow productions cover <code>when / check / otherwise</code> branches and <code>iterate</code> loops.</p><p>The grammar also includes function declarations, arrays and dictionaries, exception-handling blocks, and class-like <code>group</code> declarations with constructors, methods, and inheritance. Semantic tables store class metadata, members, and scoped declarations.</p><p>The project focuses on source analysis and reporting. Its repository does not include machine-code generation or a runtime for executing LangX programs.</p></div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/60 md:p-10" aria-labelledby="takeaway-title"><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">05 / Takeaway</p><h2 id="takeaway-title" className="text-3xl font-semibold tracking-tight">Syntax is only one layer of correctness.</h2><p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">The duplicate-declaration example captures the project’s central lesson: a statement can be grammatically valid while conflicting with the language’s semantic rules. Building both layers connects formal grammar with concrete data structures, scope management, and diagnostic reporting.</p><p className="mt-5 text-sm text-neutral-600 dark:text-neutral-400">Developed collaboratively by Muhammad Amas, Zunain Ali Azam, and Ahmed Ali, as credited in the repository.</p></section>

      <aside className="py-10 text-sm text-neutral-500 dark:text-neutral-400" aria-label="Implementation references"><p className="mb-3 font-medium">Explore the implementation</p><div className="flex flex-wrap gap-x-6 gap-y-3">{[["CLI entry point", "main.py"], ["Token definitions", "classifyToken.py"], ["Scope & symbol tables", "semanticFunctions.py"], ["Semantic analyzer", "semanticAnalyzer.py"]].map(([title, file]) => <a key={file} href={`${sourceRoot}${file}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{title}</a>)}</div></aside>
      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-neutral-200 py-8 dark:border-neutral-800"><Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium"><ArrowLeft className="h-4 w-4" /> More projects</Link><Button asChild variant="outline"><Link to="/contact">Let’s work together <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button></div>
    </article>
  );
}
