import React, { useEffect } from "react";
import Projects from "../components/Projects";
import { logPageView } from "../lib/analytics";

const ProjectsPage = () => {
  useEffect(() => {
    logPageView("projects", "Projects - Muhammad Amas Portfolio");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Projects />
    </div>
  );
};

export default ProjectsPage;
