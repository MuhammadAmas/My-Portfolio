import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "../lib/analytics";
import { getPageMetadata, getMetadataTags } from "../data/pageMetadata";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const meta = getPageMetadata(location.pathname);
    document.title = meta.title;
    for (const [attr, key, value] of getMetadataTags(meta)) {
      let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", value);
    }
    document.head.querySelector('link[rel="canonical"]').setAttribute("href", meta.url);
    logPageView(location.pathname === "/" ? "home" : location.pathname.slice(1), meta.title);
  }, [location.pathname]);

  return null;
};

export default AnalyticsTracker;
