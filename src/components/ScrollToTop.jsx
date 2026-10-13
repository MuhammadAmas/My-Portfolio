import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToElement } from "../lib/smoothScroll";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Links like "/#about" from another page should land on that section,
    // not the top of the page. Wait a frame so the new page has rendered.
    if (hash) {
      const id = hash.slice(1);
      const frame = requestAnimationFrame(() => scrollToElement(id, 80));
      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
