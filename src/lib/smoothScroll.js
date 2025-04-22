// Utility function to handle smooth scrolling
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
      // Use shorter duration for mobile devices through custom implementation
    });
  }
};

// Custom hook to intercept anchor clicks and apply smooth scrolling
export const initSmoothScrolling = () => {
  // Don't run during SSR
  if (typeof window === "undefined") return;

  // Detect if device is mobile - will be used to adjust scroll behavior
  const isMobile =
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    window.innerWidth <= 768;

  // If on mobile, use a shorter duration for smooth scrolling
  if (isMobile) {
    // Override the default smooth scrolling with a more performant version for mobile
    const originalScrollTo = window.scrollTo;
    window.scrollTo = function () {
      if (arguments[0] && arguments[0].behavior === "smooth") {
        const options = { ...arguments[0], behavior: "auto" };
        originalScrollTo.call(this, options);

        // For mobile, use a custom smooth scroll with shorter duration
        if (typeof arguments[0].top === "number") {
          const start = window.pageYOffset;
          const target = arguments[0].top;
          const distance = target - start;
          const duration = 300; // Shorter duration for mobile
          const startTime = performance.now();

          function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeInOutCubic =
              progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo({
              top: start + distance * easeInOutCubic,
              behavior: "auto",
            });

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          }

          window.requestAnimationFrame(step);
        }
        return;
      }
      originalScrollTo.apply(this, arguments);
    };
  }

  document.addEventListener("click", (e) => {
    // Find closest anchor element
    const anchor = e.target.closest("a");

    // If it's an anchor and it links to an ID on the current page
    if (
      anchor &&
      anchor.href &&
      anchor.href.includes(window.location.origin) &&
      anchor.hash
    ) {
      const targetId = anchor.hash.substring(1); // Remove the # character
      const targetElement = document.getElementById(targetId);

      // If the target element exists on the page
      if (targetElement) {
        e.preventDefault();

        // Calculate header offset - adjust this based on your fixed header height
        const headerOffset = 80;
        scrollToElement(targetId, headerOffset);

        // Update URL without causing a page jump
        window.history.pushState(null, null, anchor.hash);
      }
    }
  });
};

// Function to handle smooth scrolling for buttons
export const handleSmoothScroll = (e, targetId, offset = 80) => {
  e.preventDefault();
  scrollToElement(targetId, offset);
};
