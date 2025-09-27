import { useEffect, useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [trail, setTrail] = useState([]);
  const [hoverType, setHoverType] = useState("default");
  const { theme } = useTheme();
  const trailIdCounter = useRef(0);

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

      // Update trail positions with unique IDs
      setTrail((prevTrail) => {
        trailIdCounter.current += 1;
        const newTrail = [
          ...prevTrail,
          {
            x: e.clientX,
            y: e.clientY,
            id: `trail-${trailIdCounter.current}`,
          },
        ];
        return newTrail.slice(-8); // Keep only last 8 positions
      });
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
        el.addEventListener("mouseenter", () => {
          setLinkHovered(true);
          setHoverType("button");
        });
        el.addEventListener("mouseleave", () => {
          setLinkHovered(false);
          setHoverType("default");
        });
      });

      // Special hover for project cards
      document.querySelectorAll("[data-cursor='view']").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setLinkHovered(true);
          setHoverType("view");
        });
        el.addEventListener("mouseleave", () => {
          setLinkHovered(false);
          setHoverType("default");
        });
      });

      // Special hover for code buttons
      document.querySelectorAll("[data-cursor='code']").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setLinkHovered(true);
          setHoverType("code");
        });
        el.addEventListener("mouseleave", () => {
          setLinkHovered(false);
          setHoverType("default");
        });
      });

      // Special hover for interactive elements
      document.querySelectorAll("[data-cursor='grab']").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setLinkHovered(true);
          setHoverType("grab");
        });
        el.addEventListener("mouseleave", () => {
          setLinkHovered(false);
          setHoverType("default");
        });
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
      scale: 1,
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
      scale: 1,
    },
  };

  const getHoverContent = () => {
    switch (hoverType) {
      case "view":
        return "VIEW";
      case "code":
        return "CODE";
      case "grab":
        return "DRAG";
      case "button":
        return "CLICK";
      default:
        return "";
    }
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="cursor-dot fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center"
        variants={cursorVariants}
        animate={clicked ? "clicked" : linkHovered ? "hovered" : "default"}
        style={{
          height: linkHovered ? 64 : 32,
          width: linkHovered ? 64 : 32,
          borderRadius: "50%",
          backgroundColor: colors.primary,
          border: `2px solid ${colors.secondary}`,
          boxShadow: `0 0 20px ${colors.primary}`,
          backdropFilter: "blur(5px)",
        }}
      >
        {linkHovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-xs font-bold text-white"
            style={{
              textShadow: "0 0 10px rgba(255,255,255,0.8)",
              fontSize: "8px",
            }}
          >
            {getHoverContent()}
          </motion.span>
        )}
      </motion.div>

      {/* Cursor trail */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="cursor-trail-point fixed top-0 left-0 z-40 pointer-events-none"
          initial={{
            x: point.x - 4,
            y: point.y - 4,
            opacity: 0.6,
            scale: 1,
          }}
          animate={{
            x: point.x - 4,
            y: point.y - 4,
            opacity: 0,
            scale: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          style={{
            height: 8,
            width: 8,
            borderRadius: "50%",
            backgroundColor: colors.tertiary,
            filter: "blur(3px)",
            mixBlendMode: "screen",
          }}
        />
      ))}

      {/* Outer glow effect */}
      <motion.div
        className="cursor-glow fixed top-0 left-0 z-30 pointer-events-none"
        animate={{
          x: position.x - 40,
          y: position.y - 40,
          opacity: hidden ? 0 : 0.3,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        style={{
          height: 80,
          width: 80,
          borderRadius: "50%",
          backgroundColor: colors.primary,
          filter: "blur(20px)",
        }}
      />
    </>
  );
};

export default CursorEffect;
