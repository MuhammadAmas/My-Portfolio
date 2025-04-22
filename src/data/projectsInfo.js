/**
 * Projects Information Document
 *
 * This file contains all project information for the portfolio.
 * When adding a new project or updating existing ones, modify this file.
 */

const projects = [
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
    category: "Full Stack",
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
    category: "Frontend",
    demoLink: "https://queuing-model.vercel.app",
    githubLink: "https://github.com/MuhammadAmas/Queuing-Model",
    highlights: [
      "Implemented a queueing system using mathematical models",
      "Minimized wait times and improved overall efficiency and customer satisfaction",
    ],
    yearCompleted: 2023,
  },
  {
    id: "4",
    title: "MailSpend",
    description:
      "An AI-powered expense tracker that categorizes spending and provides personalized financial management insights, all wrapped in a user-friendly interface designed for maximum accessibility.",
    image: "/projects-images/mailSpend.png",
    technologies: ["React.js", "Ant Design", "Charts.js", "Vite"],
    category: "Frontend",
    demoLink: "https://mail-spend.vercel.app",
    githubLink: "https://github.com/MuhammadAmas/MailSpend",
    highlights: [
      "Implemented a queueing system using mathematical models",
      "Minimized wait times and improved overall efficiency and customer satisfaction",
    ],
    yearCompleted: 2024,
  },
];

// Categories derived from projects
const categories = [
  "All",
  ...new Set(projects.map((project) => project.category)),
];

export { projects, categories };
