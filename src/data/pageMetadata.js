import { articles } from "./articles/index.js";

export const SITE_URL = "https://muhammadamas.vercel.app";

const portfolioImage = "/social/portfolio.jpg";

export const pageMetadata = {
  "/": {
    title: "Muhammad Amas · Full Stack Software Engineer",
    description: "Full stack software engineer building SaaS, cloud platforms, and productivity tools with React, Node.js, and AI. Explore projects and case studies.",
    image: portfolioImage,
    imageAlt: "Muhammad Amas — Full Stack Software Engineer",
  },
  "/projects": {
    title: "Projects & Case Studies — Muhammad Amas",
    description: "Explore Cloudnosys, QuickNotes, MailSpend, and more: full stack projects spanning cloud security, native apps, productivity, and AI.",
    image: portfolioImage,
    imageAlt: "Projects and case studies by Muhammad Amas",
  },
  "/projects/cloudnosys": {
    title: "Cloudnosys Case Study — Muhammad Amas",
    description: "Explore a cloud security platform with resource graphs, attack path analysis, and misconfiguration, CVE, and malware detection. A full stack case study.",
    image: "/social/cloudnosys.jpg",
    imageAlt: "Cloudnosys case study — cloud security, resource graphs, and attack path analysis",
    type: "article",
  },
  "/projects/quicknotes": {
    title: "QuickNotes Case Study — Muhammad Amas",
    description: "Capture a thought without leaving your meeting. Explore QuickNotes across macOS, web, phone, Chrome, and an MCP server for AI assistants.",
    image: "/social/quicknotes.jpg",
    imageAlt: "QuickNotes case study — capture notes across macOS, web, Chrome, and MCP",
    type: "article",
  },
  "/projects/mailspend": {
    title: "MailSpend Case Study — Muhammad Amas",
    description: "Understand spending through AI-powered categorization, charts, and conversation. Explore MailSpend, built with a React frontend and Node.js backend.",
    image: "/social/mailspend.jpg",
    imageAlt: "MailSpend case study — spending insights, charts, and conversation with React and Node.js",
    type: "article",
  },
  "/projects/langx": {
    title: "LangX Compiler Case Study — Muhammad Amas",
    description: "Inside a Python compiler front end for a custom language: tokenization, recursive-descent parsing, scope-aware symbol tables, and semantic diagnostics.",
    image: "/social/langx.jpg",
    imageAlt: "LangX Compiler case study — lexical analysis, parsing, and semantic diagnostics in Python",
    type: "article",
  },
  "/projects/chatbot-authentication": {
    title: "Chatbot & Authentication APIs Case Study — Muhammad Amas",
    description: "Inside a NestJS backend combining Supabase authentication, persistent conversation history, Gemini replies, and GraphQL subscriptions for live chat events.",
    image: "/social/chatbot-authentication.jpg",
    imageAlt: "Chatbot and Authentication APIs — NestJS, Supabase, Gemini, and GraphQL subscriptions",
    type: "article",
  },
  "/projects/insightedu": {
    title: "InsightEdu Case Study — Muhammad Amas",
    description: "Explore InsightEdu's Agora video classrooms, MediaPipe engagement estimates, and Node.js activity-reporting pipeline with Firebase and Redis.",
    image: "/social/insightedu.jpg",
    imageAlt: "InsightEdu — video classrooms, engagement estimates, and activity reports",
    type: "article",
  },
  "/publications": {
    title: "Publications — Muhammad Amas",
    description: "Read Muhammad Amas's articles on software development, cloud computing, and technology.",
    image: portfolioImage,
    imageAlt: "Technical writing by Muhammad Amas",
  },
  ...Object.fromEntries(
    articles.map((article) => [
      `/publications/${article.slug}`,
      {
        title: `${article.title} — Muhammad Amas`,
        description: article.description,
        image: `/social/articles/${article.slug}.jpg`,
        imageAlt: `${article.title} — an article by Muhammad Amas`,
        type: "article",
      },
    ]),
  ),
  "/contact": {
    title: "Contact — Muhammad Amas",
    description: "Get in touch with Muhammad Amas to discuss full stack development, SaaS products, cloud platforms, and your next project.",
    image: portfolioImage,
    imageAlt: "Contact Muhammad Amas — Full Stack Software Engineer",
  },
  "/improve": {
    title: "Free Website Feedback — Muhammad Amas",
    description: "Get practical feedback on your website, product, or idea, covering usability, performance, accessibility, and opportunities to improve.",
    image: portfolioImage,
    imageAlt: "Website and product feedback from Muhammad Amas",
  },
};

export function getPageMetadata(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const entry = pageMetadata[path] || pageMetadata["/"];
  return {
    ...entry,
    url: `${SITE_URL}${pageMetadata[path] ? path : "/"}`,
    image: `${SITE_URL}${entry.image}`,
    type: entry.type || "website",
  };
}

// Shared by the static HTML build and React navigation, so previews and the
// browser stay in sync. Crawlers receive these tags in the initial response.
export function getMetadataTags(meta) {
  return [
    ["name", "description", meta.description],
    ["property", "og:type", meta.type],
    ["property", "og:site_name", "Muhammad Amas"],
    ["property", "og:locale", "en_US"],
    ["property", "og:title", meta.title],
    ["property", "og:description", meta.description],
    ["property", "og:url", meta.url],
    ["property", "og:image", meta.image],
    ["property", "og:image:type", "image/jpeg"],
    ["property", "og:image:width", "1200"],
    ["property", "og:image:height", "630"],
    ["property", "og:image:alt", meta.imageAlt],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:title", meta.title],
    ["name", "twitter:description", meta.description],
    ["name", "twitter:image", meta.image],
    ["name", "twitter:image:alt", meta.imageAlt],
  ];
}
