import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();

    return () => {
      removeEventListeners();
    };
  }, []);

  // Skip cursor effect if device doesn't support hover (like touch devices)
  if (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(hover: none)").matches
  ) {
    return null;
  }

  // Colors based on theme - enhanced for better visibility
  const getColors = () => {
    if (theme === "dark") {
      return {
        primary: "rgba(96, 165, 250, 0.8)", // Blue with higher opacity
        secondary: "rgba(147, 197, 253, 0.7)", // Lighter blue
        tertiary: "rgba(191, 219, 254, 0.6)", // Even lighter blue
      };
    } else {
      return {
        primary: "rgba(37, 99, 235, 0.7)", // Deeper blue for light mode
        secondary: "rgba(59, 130, 246, 0.6)",
        tertiary: "rgba(96, 165, 250, 0.5)",
      };
    }
  };

  const colors = getColors();

  const cursorVariants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      opacity: hidden ? 0 : 0.8,
    },
    clicked: {
      x: position.x - 16,
      y: position.y - 16,
      scale: 0.8,
      opacity: hidden ? 0 : 1,
    },
    hovered: {
      x: position.x - 32,
      y: position.y - 32,
      height: 64,
      width: 64,
      opacity: hidden ? 0 : 0.9,
    },
  };

  const cursorTrailVariants = {
    default: {
      x: position.x - 8,
      y: position.y - 8,
      opacity: hidden ? 0 : 0.6,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cursorTrail2Variants = {
    default: {
      x: position.x - 10,
      y: position.y - 10,
      opacity: hidden ? 0 : 0.4,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 z-50 pointer-events-none"
        variants={cursorVariants}
        animate={clicked ? "clicked" : linkHovered ? "hovered" : "default"}
        style={{
          height: 32,
          width: 32,
          borderRadius: "50%",
          backgroundColor: colors.primary,
          filter: "blur(5px)",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        className="cursor-trail fixed top-0 left-0 z-50 pointer-events-none"
        variants={cursorTrailVariants}
        animate="default"
        style={{
          height: 16,
          width: 16,
          borderRadius: "50%",
          backgroundColor: colors.secondary,
          filter: "blur(3px)",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        className="cursor-trail-2 fixed top-0 left-0 z-50 pointer-events-none"
        variants={cursorTrail2Variants}
        animate="default"
        style={{
          height: 20,
          width: 20,
          borderRadius: "50%",
          backgroundColor: colors.tertiary,
          filter: "blur(4px)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
};

export default CursorEffect;
