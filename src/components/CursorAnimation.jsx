import { useEffect, useState } from "react";
import CursorEffect from "./CursorEffect";
import CursorParticles from "./CursorParticles";

const CursorAnimation = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is a touch device
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: none)").matches
    ) {
      setIsMobile(true);
    }

    // Also check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsMobile(true); // Disable animations for users who prefer reduced motion
    }
  }, []);

  // Don't render cursor animations on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <>
      <CursorEffect />
      <CursorParticles />
    </>
  );
};

export default CursorAnimation;
