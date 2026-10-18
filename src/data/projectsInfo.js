/**
 * Projects Information Document
 *
 * This file contains all project information for the portfolio.
 * When adding a new project or updating existing ones, modify this file.
 */

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
      "Developed a real-time chatbot system using NestJS with GraphQL subscriptions to handle live, bidirectional communication. Integrated Supabase Auth for secure user authentication and access control, managing user-specific conversations within Supabase. Leveraged Supabase Realtime events to provide dynamic message updates, ensuring smooth, real-time interactions across multiple users. Designed efficient data models, optimized queries, and implemented best practices for scalability and reliability.",
    image: "/projects-images/chatbotandauthapis.png",
    technologies: ["NestJS", "GraphQL", "Supabase"],
    category: ["Backend"],
    demoLink: "https://github.com/MuhammadAmas/nestjs-graphql-chatbot",
    githubLink: "https://github.com/MuhammadAmas/nestjs-graphql-chatbot",
    highlights: [
      "Real-time chatbot system using NestJS with GraphQL subscriptions",
      "Integrated Supabase Auth for secure user authentication and access control",
    ],
    yearCompleted: 2025,
  },
  {
    id: "12",
    title: "InsightEdu: AI-Powered EdTech Platform",
    description:
      "Firebase, Redis, and AgoraRTC, it supports secure authentication, live engagement insights, and automated analytics. Hosted on Vercel and Railway, it ensures scalability, accessibility, and a seamless user experience across devices.",
    image: "/projects-images/acadist1.jpg",
    technologies: [
      "React.js",
      "Node.js",
      "Tailwind CSS",
      "TensorFlow",
      "Firebase",
      "Redis",
      "Agora.io",
    ],
    category: ["Full Stack"],
    demoLink: "https://acadist-beta.vercel.app",
    githubLink: "https://github.com/MuhammadAmas/Tutorly-Frontend",
    highlights: [
      "AI-driven personalized learning paths and real-time engagement insights",
      "Secure authentication and seamless video interactions",
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
    // description: `CLI based compiler for the Custom LangX programming language. It supports syntax and semantic analysis, lexical and parsing analysis.<br/><br/><b>#Undergraduate Project</b>`,
    description: `CLI based compiler for the custom LangX programming language. It includes robust syntax and semantic analysis, lexical scanning, and parsing logic.<br/><br/><b>#Undergraduate Project</b>`,

    image: "/projects-images/langx.jpg",
    technologies: ["Python"],
    category: ["Backend"],
    demoLink: "",
    githubLink: "https://github.com/MuhammadAmas/LangX-Compiler",
    highlights: [
      "Complete syntax and semantic analysis, including custom grammar rules",
      "Lexical scanning and parsing logic for efficient code interpretation",
    ],
    yearCompleted: 2023,
  },
];

// Categories derived from projects
const categories = [
  "All",
  ...new Set(projects.flatMap((project) => project.category)),
];

export { projects, categories };
