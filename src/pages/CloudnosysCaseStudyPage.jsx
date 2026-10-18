import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ShieldCheck, Layers, Sparkles, Network, Route } from "lucide-react";
import { Button } from "../components/ui/button";
import { projects } from "../data/projectsInfo";
import { trackExternalLink } from "../lib/analytics";

const project = projects.find(({ id }) => id === "5");

const capabilities = [
  {
    icon: Network,
    title: "Explore the resource graph",
    description: "An interactive graph maps cloud assets, identities, permissions, and their relationships across AWS, Azure, and GCP. Teams can explore connections and drill into the resources behind a risk.",
  },
  {
    icon: Route,
    title: "Trace potential attack paths",
    description: "Connect exposed workloads, vulnerable assets, excessive permissions, and risky trust relationships to understand potential lateral movement and prioritize the paths that put critical data at risk.",
  },
  {
    icon: ShieldCheck,
    title: "Detect misconfigurations, CVEs & malware",
    description: "Posture checks identify cloud configuration risks, while Cloudxray adds agentless scanning for known OS vulnerabilities (CVEs) and malware. Findings become inputs to investigation and risk prioritization.",
  },
  {
    icon: Layers,
    title: "Connect security and compliance",
    description: "Show compliance posture alongside security findings, with framework-level progress and passed or failed controls. SOAR remediation and third-party integrations extend the response workflow.",
  },
  {
    icon: Sparkles,
    title: "Give teams an AI entry point",
    description: "A conversational security assistant and quick-start prompts let users ask about vulnerabilities, permissions, and exposed resources, with dashboard visualizations for ongoing monitoring.",
  },
];

function ProductScreenshot({ src, alt, caption, height = 1010 }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <a href={src} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" aria-label={`Open full-size screenshot: ${alt}`}>
        <img src={src} alt={alt} width="1920" height={height} loading="lazy" decoding="async" className="h-auto w-full" />
      </a>
      <figcaption className="px-5 py-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{caption}</figcaption>
    </figure>
  );
}

export default function CloudnosysCaseStudyPage() {
  return (
    <article className="mx-auto max-w-6xl py-8 md:py-16 text-neutral-900 dark:text-neutral-100">
      <Link to="/projects" className="inline-flex items-center gap-2 py-3 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      <header className="pb-10 pt-8 md:pb-14">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">Case study / Cloud security SaaS</p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">Cloudnosys<span className="text-blue-500">.</span></h1>
        <p className="mt-6 max-w-3xl text-2xl font-medium leading-snug md:text-3xl">Visualizing cloud infrastructure. Tracing attack paths. Connecting the risks.</p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">A full stack cloud security platform that detects misconfigurations, CVEs, and malware, then connects findings through an interactive resource graph and attack path analysis to help teams prioritize remediation.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" onClick={() => trackExternalLink(project.demoLink, "Cloudnosys website")}>
              Visit Cloudnosys <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline"><a href="#product">Explore the product <ArrowUpRight className="ml-2 h-4 w-4" /></a></Button>
        </div>
      </header>

      <dl className="mb-10 grid grid-cols-2 gap-6 border-y border-neutral-200 py-6 dark:border-neutral-800 md:grid-cols-4">
        {[["Role", "Full Stack Developer"], ["Product", "Cloud security platform"], ["Focus", "Resource graph & attack paths"], ["Status", "Ongoing"]].map(([label, value]) => (
          <div key={label}><dt className="mb-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">{label}</dt><dd className="text-sm font-medium">{value}</dd></div>
        ))}
      </dl>

      <ProductScreenshot src="/projects-images/cloudnosys/overview.jpg" alt="Cloudnosys dashboard with security assistant, compliance overview, and issues by category" caption="The security workspace brings investigation prompts, framework status, and issue categories into a single dashboard." />

      <section className="grid gap-8 py-16 md:grid-cols-[1fr_2fr] md:py-20" aria-labelledby="challenge-title">
        <div><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">01 / The challenge</p><h2 id="challenge-title" className="text-3xl font-semibold tracking-tight">From findings to focus.</h2></div>
        <div className="space-y-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          <p>A misconfiguration, a vulnerable workload, and an overprivileged role can look like separate findings. Together, they may create a route from an exposed service to sensitive data. Security teams need to understand how these risks connect across their cloud infrastructure.</p>
          <p>Cloudnosys combines detection with a resource graph and attack path analysis. Teams can explore infrastructure relationships, investigate potential lateral movement, and prioritize connected risks alongside compliance and remediation workflows.</p>
        </div>
      </section>

      <section id="graph" className="scroll-mt-24 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/60 md:p-10" aria-labelledby="graph-title">
        <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">Core feature / Graph & attack paths</p>
        <h2 id="graph-title" className="text-3xl font-semibold tracking-tight">See how a single exposure can become an attack chain.</h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-400">The resource graph provides the infrastructure context: which workloads connect, what identities can access, and where permissions or trust relationships create risk. Attack path analysis uses those connections to reveal potential routes toward sensitive resources.</p>
        <div className="mt-8">
          <ProductScreenshot
            src="/projects-images/cloudnosys/resource-graph.jpg"
            height={1104}
            alt="Cloudnosys multi-cloud inventory topology connecting the internet with Azure, AWS, and GCP cloud accounts"
            caption="Multi-cloud resource graph showing relationships across Azure, AWS, and GCP. Account names and identifiers have been permanently redacted from the image."
          />
        </div>
        <div className="mt-8">
          <ProductScreenshot
            src="/projects-images/cloudnosys/attack-path.jpg"
            height={960}
            alt="Cloudnosys resource graph highlighting an attack path through AWS Lambda, an IAM role, a KMS key, and an RDS instance"
            caption="Live product view: the highlighted path connects Lambda, an IAM role, a KMS key, and an RDS instance, alongside attack path explanations. Account and resource identifiers have been permanently redacted from the image."
          />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div><h3 className="font-semibold">Investigate connected risks</h3><p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">Explore assets and relationships, then inspect potential routes through vulnerable workloads, permissions, and trust boundaries.</p></div>
          <div><h3 className="font-semibold">Prioritize where to intervene</h3><p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">Use exposure and potential impact to decide which configuration, vulnerability, or permission needs attention first.</p></div>
        </div>
        <div className="mt-10">
          <h3 className="mb-3 text-xl font-semibold">From attack path to investigation</h3>
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">The issue detail view brings the highlighted path together with affected-resource counts, MITRE ATT&CK context, and AI explanations of the risk and its root cause.</p>
          <ProductScreenshot
            src="/projects-images/cloudnosys/issue-details.jpg"
            height={1395}
            alt="Cloudnosys issue details showing an attack path, MITRE ATT&CK techniques, and AI insights, with account and resource identifiers redacted"
            caption="Attack path investigation with issue details and AI insights. Account and resource identifiers are permanently redacted, including labels inside the embedded graph."
          />
        </div>
      </section>

      <section aria-labelledby="scope-title" className="border-t border-neutral-200 py-12 dark:border-neutral-800">
        <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">02 / Development scope</p>
        <h2 id="scope-title" className="mb-5 text-3xl font-semibold tracking-tight">Full stack work across a security platform.</h2>
        <p className="max-w-3xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">My work on Cloudnosys spans the frontend and backend of a SaaS product covering risk management, compliance, SOAR remediation, and third-party integrations. React, Redux, and Ant Design support the application interface, alongside Node.js, Firebase, cloud services, and OpenAI in the project stack.</p>
        <div className="mt-8 flex flex-wrap gap-2">{project.technologies.filter((tech) => tech !== "Frontend").map((tech) => <span key={tech} className="rounded-full border border-neutral-200 bg-white/60 px-4 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900">{tech}</span>)}</div>
      </section>

      <section id="product" className="scroll-mt-24 py-12" aria-labelledby="product-title">
        <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">03 / Product experience</p>
        <h2 id="product-title" className="mb-8 text-3xl font-semibold tracking-tight">Detect. Map. Investigate. Respond.</h2>
        <div className="mb-10 grid gap-5 lg:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
              <Icon className="mb-6 h-6 w-6 text-blue-500" aria-hidden="true" />
              <h3 className="mb-3 text-xl font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{description}</p>
            </div>
          ))}
        </div>
        <ProductScreenshot src="/projects-images/cloudnosys/compliance.jpg" alt="Cloudnosys compliance dashboard showing control status, security categories, and compliance framework cards" caption="Compliance visibility across ISO/IEC 27001, HIPAA, CIS, and Saudi NCA frameworks, with category summaries and control status." />
      </section>

      <section className="grid gap-8 border-t border-neutral-200 py-16 dark:border-neutral-800 md:grid-cols-[1fr_2fr]" aria-labelledby="takeaway-title">
        <div><p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">04 / Takeaway</p><h2 id="takeaway-title" className="text-3xl font-semibold tracking-tight">Context makes the difference.</h2></div>
        <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">The central product challenge is turning detected misconfigurations, CVEs, and malware into an understandable picture of risk. The resource graph and attack paths connect those findings to infrastructure relationships and potential impact, giving teams context for investigation and remediation.</p>
      </section>
      <aside className="mb-10 text-sm text-neutral-500 dark:text-neutral-400" aria-label="Product references">
        <p className="mb-3 font-medium">Further product details</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <a href="https://cloudnosys.com/attack-path" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Attack path analysis</a>
          <a href="https://cloudnosys.com/blog/multi-cloud-security-cloudnosys-v4" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Resource graph & multi-cloud security</a>
          <a href="https://cloudnosys.com/cloudxray" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Cloudxray vulnerability & malware scanning</a>
        </div>
      </aside>
      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-neutral-200 py-8 dark:border-neutral-800">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium"><ArrowLeft className="h-4 w-4" /> More projects</Link>
        <Button asChild variant="outline"><Link to="/contact">Let’s work together <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
      </div>
    </article>
  );
}
