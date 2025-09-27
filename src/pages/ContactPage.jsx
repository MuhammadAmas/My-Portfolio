import React, { useEffect } from "react";
import Contact from "../components/Contact";
import { logPageView } from "../lib/analytics";

const ContactPage = () => {
  useEffect(() => {
    logPageView("contact", "Contact - Muhammad Amas Portfolio");
  }, []);

  return (
    <main className="min-h-screen bg-background pt-16 md:pt-24">
      <Contact />
    </main>
  );
};

export default ContactPage;
