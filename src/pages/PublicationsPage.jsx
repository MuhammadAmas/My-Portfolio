import React, { useEffect } from "react";
import Publications from "../components/Publications";
import { logPageView } from "../lib/analytics";

const PublicationsPage = () => {
  useEffect(() => {
    logPageView("publications", "Publications - Muhammad Amas Portfolio");
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Publications />
    </main>
  );
};

export default PublicationsPage;
