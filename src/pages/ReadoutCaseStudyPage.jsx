import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, AppWindow, Zap, FileText, SlidersHorizontal, ShieldCheck, RefreshCw, Github, Copy, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { projects } from "../data/projectsInfo";
import { trackExternalLink } from "../lib/analytics";

const project = projects.find(({ id }) => id === "14");
const installUrl = "https://github.com/MuhammadAmas/Readout#install";
const installCommand = "curl -fsSL https://raw.githubusercontent.com/MuhammadAmas/Readout/main/install.sh | bash";

const steps = [
  ["Select", "Highlight text in Safari, Chrome, Notes, Slack, a PDF or anywhere else."],
  ["Press ⌃⌥R", "Readout starts reading at once. Press it again to stop, or ⌃⌥P to pause."],
  ["Steer", "The mini player fills in word by word. Jump, skip a sentence or change speed."],
];

const cleanup = [
  ["# Heading, **bold**, `code`, > quote", "the words, without the symbols"],
  ["A Markdown table", "one sentence per row: “Name: Alice, Age: 30.”"],
  ["A fenced code block", "“Code block skipped.”"],
  ["https://www.example.com/a/b?c=d", "“example.com”"],
  ["&, ->, e.g., vs.", "“and”, “to”, “for example”, “versus”"],
  ["A line break mid-sentence, as in PDFs", "one sentence, with split words rejoined"],
];

const features = [
  [AppWindow, "Works in any app", "Readout reads the selection through macOS Accessibility. Where an app doesn’t share it, as in most browsers and Electron apps, it copies the selection for a moment and restores the clipboard exactly as it was."],
  [Zap, "Starts at once, stops at once", "Long selections start speaking almost immediately, and pressing the shortcut again stops within milliseconds."],
  [FileText, "Reads Markdown properly", "Tables become sentences, code blocks are skipped, and links are read as their domain instead of a string of symbols."],
  [SlidersHorizontal, "A mini player you can steer", "Words fill in as they’re spoken. Click the track to jump, skip a sentence either way, and change speed without losing your place."],
  [ShieldCheck, "Private by design", "Text is processed on the Mac and never saved or sent. There are no accounts and no analytics; the only network request is the update check."],
  [RefreshCw, "Updates itself safely", "New releases install only after their SHA-256 and code signature are checked, and only when Readout isn’t reading."],
];

const timings = [
  ["Selection to first audio", "35–76 ms", "0.6–0.9 s"],
  ["Stop", "2–3 ms", "1 ms"],
  ["Clean up and split 5,000 words", "25–31 ms", "25–31 ms"],
];

function Screenshot({ name, alt, width, height, caption, className = "" }) {
  const src = `/projects-images/readout/${name}.png`;
  return (
    <figure className={`overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 ${className}`}>
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size screenshot: ${alt}`} className="block p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 md:p-6">
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className="mx-auto h-auto max-w-full" />
      </a>
      <figcaption className="border-t border-neutral-200 px-5 py-4 text-sm leading-relaxed text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">{caption}</figcaption>
    </figure>
  );
}

function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100">
      <div className="flex items-center justify-between gap-4 border-b border-neutral-800 px-4 py-2">
        <span className="text-xs uppercase tracking-widest text-neutral-400">Terminal</span>
        <button type="button" onClick={copy} className="inline-flex min-h-11 items-center gap-2 text-sm text-neutral-300 hover:text-white md:min-h-9" aria-label={copied ? "Install command copied" : "Copy install command"}>
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-sm leading-7"><code>{installCommand}</code></pre>
    </div>
  );
}

export default function ReadoutCaseStudyPage() {
  return (
    <article className="mx-auto max-w-6xl py-8 text-neutral-900 dark:text-neutral-100 md:py-16">
      <Link to="/projects" className="inline-flex items-center gap-2 py-3 text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"><ArrowLeft className="h-4 w-4" /> All projects</Link>
      <header className="pb-10 pt-8 md:pb-14">
        <img src="/projects-images/readout/icon.png" alt="" width={72} height={72} className="mb-6 h-16 w-16 md:h-[72px] md:w-[72px]" />
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">Case study / macOS utility</p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">Readout<span className="text-indigo-500">.</span></h1>
        <p className="mt-6 max-w-3xl text-2xl font-medium leading-snug md:text-3xl">Select text anywhere. Hear it at once.</p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">A macOS menu bar app that reads the text you select in any app aloud, with the Mac’s own voices or with on-device neural voices that sound close to a real person. Nothing you read leaves your Mac.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild><a href={installUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink(installUrl, "Readout install")}>Install Readout <ArrowUpRight className="ml-2 h-4 w-4" /></a></Button>
          <Button asChild variant="outline"><a href={project.githubLink} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink(project.githubLink, "Readout source")}><Github className="mr-2 h-4 w-4" /> View source</a></Button>
        </div>
      </header>

      <dl className="mb-10 grid grid-cols-2 gap-6 border-y border-neutral-200 py-6 dark:border-neutral-800 md:grid-cols-4">
        {[["Platform", "macOS 14+, Apple silicon"], ["Built with", "Swift, SwiftUI & AppKit"], ["Focus", "Text-to-speech in any app"], ["Year", "2026"]].map(([label, value]) => (
          <div key={label}><dt className="mb-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">{label}</dt><dd className="text-sm font-medium">{value}</dd></div>
        ))}
      </dl>
      <div className="mx-auto max-w-3xl"><Screenshot name="mini-player" width={856} height={516} alt="The Readout mini player reading a sentence: spoken words are bright, the current word is highlighted, the rest is grey, with a progress track and playback controls" caption="The mini player while reading: spoken words stay bright and the current word is highlighted. Screenshots throughout this case study use sample text." /></div>

      <section className="grid gap-8 py-16 md:grid-cols-[1fr_2fr] md:py-20" aria-labelledby="challenge-title">
        <div><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">01 / The challenge</p><h2 id="challenge-title" className="text-3xl font-semibold tracking-tight">Listening shouldn’t need another app.</h2></div>
        <div className="space-y-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400"><p>Listening is often easier than reading a long article, a dense PDF or a busy Slack thread. Getting text read aloud usually means pasting it into a separate tool, sitting through a whole page when you wanted one paragraph, or putting up with the robotic voices macOS installs by default.</p><p>Readout reads exactly what you select, in the app you’re already using, and starts almost immediately. Pressing the same shortcut again stops it.</p></div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/60 md:p-10" aria-labelledby="how-title">
        <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">02 / How it works</p>
        <h2 id="how-title" className="text-3xl font-semibold tracking-tight">Select. Press <kbd className="rounded border border-neutral-300 px-2 py-0.5 font-sans text-2xl dark:border-neutral-600">⌃⌥R</kbd>. Listen.</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">{steps.map(([title, detail], i) => <div key={title} className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-700"><p className="mb-3 text-sm text-indigo-600 dark:text-indigo-400">0{i + 1}</p><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{detail}</p></div>)}</div>
        <p className="mt-10 max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-400">Readout installs with one command on an Apple silicon Mac running macOS 14 or later. Add <code className="whitespace-nowrap rounded bg-neutral-200 px-1.5 py-0.5 text-sm text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">--with-neural-voice</code> for the natural-sounding voices, a one-time 360 MB download.</p>
        <InstallCommand />
        <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
          <Screenshot name="onboarding" width={960} height={906} alt="The Readout welcome window after access is allowed, titled You're all set, with a sample sentence to select and the buttons Read It to Me and Done" caption="First launch walks through allowing Accessibility, notices when it’s granted, and offers a sample sentence to try." />
          <Screenshot name="settings-general" width={1040} height={1062} alt="Readout General settings: the two shortcuts, Show mini player while reading, Open at login, Update automatically and the Accessibility status" caption="Shortcuts can be changed, and the menu bar app can open at login and keep itself up to date." />
        </div>
      </section>

      <section className="grid items-start gap-10 py-16 md:grid-cols-2 md:py-20" aria-labelledby="cleanup-title">
        <div className="min-w-0">
          <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">03 / Clean speech</p>
          <h2 id="cleanup-title" className="text-3xl font-semibold tracking-tight">It reads what you mean, not the symbols.</h2>
          <p className="mt-5 leading-relaxed text-neutral-600 dark:text-neutral-400">Copied text is full of formatting that sounds absurd read aloud. Readout cleans it up before speaking, and the Try it box in Settings shows exactly what will be said.</p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 text-xs uppercase tracking-widest text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400"><tr><th scope="col" className="px-4 py-3 font-medium">You select</th><th scope="col" className="px-4 py-3 font-medium">Readout says</th></tr></thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">{cleanup.map(([input, output]) => <tr key={input}><td className="px-4 py-3 font-mono text-xs text-neutral-800 dark:text-neutral-200">{input}</td><td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{output}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
        <Screenshot name="settings-text" width={1040} height={1226} alt="Readout Text settings: clean-up switches and a Try it box showing a Markdown sample and the sentence Readout will say" caption="The Try it box turns a Markdown table, a link and symbols into one natural sentence." />
      </section>

      <section className="grid items-start gap-10 border-t border-neutral-200 py-16 dark:border-neutral-800 md:grid-cols-2 md:py-20" aria-labelledby="voices-title">
        <Screenshot name="settings-voice" width={1040} height={1326} alt="Readout Voice settings: Language set to Automatic using the Heart neural voice, the speed slider with Preview, and the More voices section" caption="Automatic picks the best installed voice; neural voices are marked and installed with one command." className="md:order-2" />
        <div className="md:order-1">
          <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">04 / Voices</p>
          <h2 id="voices-title" className="text-3xl font-semibold tracking-tight">Natural voices that never leave your Mac.</h2>
          <div className="mt-5 space-y-5 leading-relaxed text-neutral-600 dark:text-neutral-400">
            <p>Beyond the system voices, Readout offers 27 English neural voices with US and UK accents from the open Kokoro model, generated on the Mac itself. Once installed, Automatic uses them, and the voice can switch when the selection is in another language.</p>
            <p>Speed runs from 0.5× to 2×. Changing it mid-reading carries on from where Readout is: neural voices change speed instantly, mid-word, and system voices pick up again at the word being spoken.</p>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 py-12 dark:border-neutral-800" aria-labelledby="features-title">
        <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">05 / Product details</p>
        <h2 id="features-title" className="mb-8 text-3xl font-semibold tracking-tight">Small surface, careful behavior.</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map(([Icon, title, description]) => <div key={title} className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800"><Icon className="mb-6 h-6 w-6 text-indigo-500" aria-hidden="true" /><h3 className="mb-3 text-xl font-semibold">{title}</h3><p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{description}</p></div>)}</div>
      </section>

      <section className="grid gap-8 border-t border-neutral-200 py-16 dark:border-neutral-800 md:grid-cols-[1fr_2fr]" aria-labelledby="engineering-title">
        <div><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">06 / Engineering</p><h2 id="engineering-title" className="text-3xl font-semibold tracking-tight">Fast to start, safe to interrupt.</h2></div>
        <div className="min-w-0 space-y-5 leading-relaxed text-neutral-600 dark:text-neutral-400">
          <p>Readout first asks the macOS Accessibility API for the selected text. Browsers and Electron apps don’t share it, so Readout copies the selection for a moment and puts the clipboard back exactly as it was, which adds roughly 50–150 ms.</p>
          <p>A reading queue hands the speech engine one sentence at a time with the next one queued, and owns skipping, jumping, speed and voice changes. System voices use AVSpeechSynthesizer. Kokoro runs through sherpa-onnx, which Readout loads at runtime, so the app builds and runs with or without the neural voices. The next sentence renders while the current one plays, and neural audio passes through AVAudioUnitTimePitch, which is why speed changes are instant.</p>
          <p>Every six hours Readout checks GitHub for a newer release. It verifies the download’s SHA-256 and that the new app is signed by the same certificate, so a tampered download is refused, then replaces itself once it isn’t reading. The text clean-up and speech core form a separate target with no AppKit dependency, covered by unit tests.</p>
          <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-left text-sm">
              <caption className="caption-bottom px-4 py-3 text-left text-xs text-neutral-500 dark:text-neutral-400">Measured with Readout’s built-in self-test on an Apple silicon Mac running macOS 27.2.</caption>
              <thead className="bg-neutral-50 text-xs uppercase tracking-widest text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400"><tr><th scope="col" className="px-4 py-3 font-medium">Measure</th><th scope="col" className="px-4 py-3 font-medium">System voice</th><th scope="col" className="px-4 py-3 font-medium">Neural voice</th></tr></thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">{timings.map(([measure, system, neural]) => <tr key={measure}><th scope="row" className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">{measure}</th><td className="px-4 py-3">{system}</td><td className="px-4 py-3">{neural}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">{project.technologies.map((tech) => <span key={tech} className="rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">{tech}</span>)}</div>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800 md:p-10" aria-labelledby="takeaway-title"><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">07 / Takeaway</p><h2 id="takeaway-title" className="text-3xl font-semibold tracking-tight">Make the useful thing instant.</h2><p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">Readout is deliberately small: one shortcut, one floating player, no account. The effort goes into the parts people never see, from restoring the clipboard to starting long selections almost immediately, so reading aloud feels like a built-in part of the Mac.</p></section>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-neutral-200 py-8 dark:border-neutral-800"><Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium"><ArrowLeft className="h-4 w-4" /> More projects</Link><Button asChild variant="outline"><Link to="/contact">Let’s work together <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button></div>
    </article>
  );
}
