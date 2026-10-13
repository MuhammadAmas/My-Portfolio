import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "../lib/analytics";

const pageNames = {
  "/": { name: "home", title: "Muhammad Amas · Full Stack Software Engineer" },
  "/projects": {
    name: "projects",
    title: "Projects - Muhammad Amas Portfolio",
  },
  "/publications": {
    name: "publications",
    title: "Publications - Muhammad Amas Portfolio",
  },
  "/contact": { name: "contact", title: "Contact - Muhammad Amas Portfolio" },
  "/improve": {
    name: "improve",
    title: "Free Website Feedback - Muhammad Amas Portfolio",
  },
};

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const pageInfo = pageNames[location.pathname] || {
      name: location.pathname,
      title: `${location.pathname} - Muhammad Amas Portfolio`,
    };

    document.title = pageInfo.title;
    logPageView(pageInfo.name, pageInfo.title);
  }, [location]);

  return null;
};

export default AnalyticsTracker;
