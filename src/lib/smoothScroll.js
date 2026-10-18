const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Scroll to a section, leaving room for the fixed header. Smooth unless the
// person has Reduce Motion turned on.
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }
};

// Smooth-scroll same-page anchor links. The arrow keys are deliberately left
// alone so they keep their standard scrolling behavior, and the URL is
// replaced rather than pushed so Back still leaves the page.
// Returns a cleanup function for use in an effect.
export const initSmoothScrolling = () => {
  if (typeof window === "undefined") return undefined;

  const onClick = (e) => {
    const anchor = e.target.closest("a");

    if (
      anchor &&
      anchor.href &&
      anchor.href.includes(window.location.origin) &&
      anchor.pathname === window.location.pathname &&
      anchor.hash
    ) {
      const targetId = anchor.hash.substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        scrollToElement(targetId, 80);
        window.history.replaceState(null, "", anchor.hash);
        // Move keyboard focus too (e.g. "Skip to content"), when focusable
        if (target.tabIndex >= 0 || target.hasAttribute("tabindex")) {
          target.focus({ preventScroll: true });
        }
      }
    }
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
};

// Smooth scrolling for buttons
export const handleSmoothScroll = (e, targetId, offset = 80) => {
  e.preventDefault();
  scrollToElement(targetId, offset);
};
