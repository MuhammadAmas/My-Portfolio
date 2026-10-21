
const projects = [
  {
    id: "5",
    title: "Cloudnosys",
    description:
      "Cloud security SaaS platform that detects misconfigurations, CVEs, and malware. An interactive resource graph and attack path analysis connect infrastructure risks, with compliance visibility and remediation workflows.",
    image: "/projects-images/cloudnosys/overview.jpg",
    caseStudyLink: "/projects/cloudnosys",
    demoLink: "https://cloudnosys.com",
    technologies: [
      "React.js",
      "Node.js",
      "Redux",
      "Firebase",
      "Ant Design",
      "Frontend",
      "GCP",
      "AWS",
      "OpenAI",
    ],
    category: ["Full Stack", "SaaS", "Cloud", "AI"],
    githubLink: "",
    highlights: [
      "Interactive resource graph and attack path analysis",
      "Misconfiguration, CVE, and malware detection",
    ],
    yearCompleted: "In Progress",
  },
  {
    id: "4",
    title: "MailSpend",
    description:
      "An AI-powered expense tracker that categorizes spending and provides personalized financial management insights, all wrapped in a user-friendly interface designed for maximum accessibility.",
    image: "/projects-images/mailSpend.jpg",
    caseStudyLink: "/projects/mailspend",
    technologies: ["React.js", "Node.js", "Ant Design", "Charts.js", "Vite"],
    category: ["Full Stack"],
    demoLink: "https://mail-spend.vercel.app",
    githubLink: "https://github.com/MuhammadAmas/MailSpend",
    highlights: [
      "AI-powered categorization of spending",
      "Personalized financial insights with interactive charts",
    ],
    yearCompleted: 2024,
  },
  {
    id: "7",
    title: "PartyGo",
    description:
      "Event-services marketplace connecting customers with vendors for bookings, payments, and event management. Includes vendor dashboards, secure payments, messaging, disputes, scheduling, and analytics.",
    image: "/projects-images/partygo.jpg",
    technologies: ["React.js", "Nest.js", "Tailwind CSS", "MongoDB", "AWS"],
    category: ["Full Stack"],
    demoLink: "https://partygo.app",
    highlights: [
      "Verified vendors with secure escrow bookings and payments",
      "Complete marketplace with real-time vendor management",
    ],
    yearCompleted: 2024,
  },
  {
    id: "3",
    title: "FuturConnect",
    description:
      "Effortlessly manage your meeting rooms with a streamlined platform designed for maximum efficiency and convenience. Ideal for businesses looking to optimize their space and reduce scheduling conflicts.",
    image: "/projects-images/futurConnect.jpg",
    technologies: [
      "React",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase Authentication",
    ],
    category: ["Full Stack"],
    demoLink: "https://futur-connect.vercel.app",
    githubLink: "https://github.com/MuhammadAmas/FuturConnect",
    highlights: [
      "Clean and easy-to-use frontend design with responsive layouts",
      "Integrated Firebase Authentication with efficient room handling",
    ],
    yearCompleted: 2024,
  },
  {
    id: "2",
    title: "Chatbot and Authentication APIs",
    description:
      "NestJS backend combining Supabase authentication, stored conversation history, Gemini AI replies, and GraphQL subscriptions for message and typing events. Exposes REST and GraphQL interfaces through a shared chat service.",
    image: "/projects-images/chatbotandauthapis.png",
    caseStudyLink: "/projects/chatbot-authentication",
    technologies: ["NestJS", "TypeScript", "GraphQL", "Supabase", "Gemini"],
    category: ["Backend"],
    demoLink: "",
    githubLink: "https://github.com/MuhammadAmas/nestjs-graphql-chatbot",
    highlights: [
      "Real-time chatbot system using NestJS with GraphQL subscriptions",
      "Supabase authentication, stored history, and Gemini replies",
    ],
    yearCompleted: 2025,
  },
  {
    id: "12",
    title: "InsightEdu: AI-Powered EdTech Platform",
    description:
      "Full stack EdTech platform combining class enrollment, Agora video sessions, MediaPipe engagement estimates, and activity reports. React and TypeScript connect to a Node.js backend with Firebase and Redis PubSub.",
    image: "/projects-images/acadist1.jpg",
    caseStudyLink: "/projects/insightedu",
    technologies: [
      "React.js",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "MediaPipe",
      "Firebase",
      "Redis",
      "Agora.io",
    ],
    category: ["Full Stack"],
    demoLink: "https://acadist-beta.vercel.app",
    githubLink: "https://github.com/MuhammadAmas/Tutorly-Frontend",
    highlights: [
      "Agora video classrooms with browser-side engagement estimates",
      "Class enrollment, Redis activity pipeline, and session reports",
    ],
    yearCompleted: 2024,
  },
  {
    id: "13",
    title: "QuickNotes",
    description:
      "Capture action items without leaving your meeting: press ⌘⇧N on a floating Mac bubble, type and hit Enter. Notes sync live to a web app, phone (PWA) and Chrome extension, where you tick them off, prioritize and move them to another day.",
    image: "/projects-images/quicknotes.jpg",
    caseStudyLink: "/projects/quicknotes",
    technologies: [
      "JavaScript",
      "Swift",
      "Firebase",
      "Firestore",
      "Chrome Extension",
      "PWA",
      "Go",
      "MCP",
    ],
    category: ["Full Stack", "Cloud"],
    demoLink: "https://quicknotes-hq.web.app",
    githubLink: "https://github.com/MuhammadAmas/QuickNotes",
    highlights: [
      "One account across a native macOS app, web/phone app and Chrome extension",
      "Screenshot and voice notes, checklists, reminders and a weekly summary, all working offline",
    ],
    yearCompleted: 2026,
  },
  {
    id: "1",
    title: "Queuing Model",
    description:
      "To optimize a queueing system using mathematical models to minimize wait times, eliminate bottlenecks, and improve overall efficiency and customer satisfaction.",
    image: "/projects-images/queingModel.png",
    technologies: ["React.js", "MUI", "Vite"],
    category: ["Frontend"],
    demoLink: "https://queuing-model.vercel.app",
    githubLink: "https://github.com/MuhammadAmas/Queuing-Model",
    highlights: [
      "Implemented a queueing system using mathematical models",
      "Minimized wait times and improved overall efficiency and customer satisfaction",
    ],
    yearCompleted: 2023,
  },
  {
    id: "6",
    title: "LangX Compiler",
    description: "A Python compiler front end for LangX, a custom language inspired by Python and C++. A collaborative university project covering tokenization, recursive-descent parsing, symbol tables, and semantic diagnostics.",

    image: "/projects-images/langx.jpg",
    caseStudyLink: "/projects/langx",
    technologies: ["Python"],
    category: ["Backend"],
    demoLink: "",
    githubLink: "https://github.com/MuhammadAmas/LangX-Compiler",
    highlights: [
      "Lexical analysis and recursive-descent parsing for a custom language",
      "Scope-aware symbol tables and semantic diagnostics",
    ],
    yearCompleted: 2023,
  },
];

const categories = [
  "All",
  ...new Set(projects.flatMap((project) => project.category)),
];

export { projects, categories };
