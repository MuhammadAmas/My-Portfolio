/**
 * Projects Information Document
 *
 * This file contains all project information for the portfolio.
 * When adding a new project or updating existing ones, modify this file.
 */

const projects = [
  {
    id: 3,
    title: "Cloudnosys",
    description:
      "Full stack SaaS platform coverage with risk prioritization, compliance, SOAR remediation, misconfigurations, OS vulnerabilities, malware, context-aware alerts, and third-party integrations.",
    image: "/projects-images/cloudnosys.png",
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
      "Threat Detection, Risk Management and Response",
      "Compliance and SOAR Remediation",
    ],
    yearCompleted: "In Progress",
  },
  {
    id: "4",
    title: "MailSpend",
    description:
      "An AI-powered expense tracker that categorizes spending and provides personalized financial management insights, all wrapped in a user-friendly interface designed for maximum accessibility.",
    image: "/projects-images/mailSpend.png",
    technologies: ["React.js", "Ant Design", "Charts.js", "Vite"],
    category: ["Frontend"],
    demoLink: "https://mail-spend.vercel.app",
    githubLink: "https://github.com/MuhammadAmas/MailSpend",
    highlights: [
      "Implemented a queueing system using mathematical models",
      "Minimized wait times and improved overall efficiency and customer satisfaction",
    ],
    yearCompleted: 2024,
  },
  {
    id: 2,
    title: "FuturConnect Dashboard",
    description:
      "Effortlessly manage your meeting rooms with a streamlined platform designed for maximum efficiency and convenience. Ideal for businesses looking to optimize their space and reduce scheduling conflicts.",
    image: "/projects-images/futurConnect.png",
    technologies: [
      "React",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase Authentication",
    ],
    category: ["Full Stack"],
    demoLink: "https://futur-connect.vercel.app",
    githubLink: "https://github.com/MuhammadAmas/FExpressuturConnect",
    highlights: [
      "Clean and easy-to-use frontend design with responsive layouts",
      "Integrated Firebase Authentication with efficient room handling",
    ],
    yearCompleted: 2024,
  },
  {
    id: 1,
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
    id: 2,
    title: "LangX Compiler",
    // description: `CLI based compiler for the Custom LangX programming language. It supports syntax and semantic analysis, lexical and parsing analysis.<br/><br/><b>#Undergraduate Project</b>`,
    description: `CLI based compiler for the custom LangX programming language. It includes robust syntax and semantic analysis, lexical scanning, and parsing logic.<br/><br/><b>#Undergraduate Project</b>`,

    image: "/projects-images/langx.png",
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
