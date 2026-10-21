import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import PublicationsPage from "./pages/PublicationsPage";
import ArticlePage from "./pages/ArticlePage";
import ProjectsPage from "./pages/ProjectsPage";
import CloudnosysCaseStudyPage from "./pages/CloudnosysCaseStudyPage";
import QuickNotesCaseStudyPage from "./pages/QuickNotesCaseStudyPage";
import MailSpendCaseStudyPage from "./pages/MailSpendCaseStudyPage";
import LangXCaseStudyPage from "./pages/LangXCaseStudyPage";
import ChatbotCaseStudyPage from "./pages/ChatbotCaseStudyPage";
import InsightEduCaseStudyPage from "./pages/InsightEduCaseStudyPage";
import ContactPage from "./pages/ContactPage";
import ProblemSolverPage from "./pages/ProblemSolverPage";
import "./lib/firebase.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "publications",
            element: <PublicationsPage />,
          },
          {
            path: "publications/:slug",
            element: <ArticlePage />,
          },
          {
            path: "projects",
            element: <ProjectsPage />,
          },
          {
            path: "projects/cloudnosys",
            element: <CloudnosysCaseStudyPage />,
          },
          {
            path: "projects/quicknotes",
            element: <QuickNotesCaseStudyPage />,
          },
          {
            path: "projects/mailspend",
            element: <MailSpendCaseStudyPage />,
          },
          {
            path: "projects/langx",
            element: <LangXCaseStudyPage />,
          },
          {
            path: "projects/chatbot-authentication",
            element: <ChatbotCaseStudyPage />,
          },
          {
            path: "projects/insightedu",
            element: <InsightEduCaseStudyPage />,
          },
          {
            path: "contact",
            element: <ContactPage />,
          },
          {
            path: "improve",
            element: <ProblemSolverPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
