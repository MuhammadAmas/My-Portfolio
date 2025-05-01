// Animation variants for use with framer-motion
export const fadeIn = (direction, delay) => {
  // Get device type for responsive animations
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const duration = isMobile ? 0.3 : 0.8;
  const distance = isMobile ? 40 : 80;

  return {
    hidden: {
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x:
        direction === "left" ? distance : direction === "right" ? -distance : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: duration,
        delay: isMobile ? delay * 0.5 : delay,
        ease: "easeOut",
      },
    },
  };
};

export const staggerContainer = (staggerChildren, delayChildren) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: isMobile ? staggerChildren * 0.5 : staggerChildren,
        delayChildren: isMobile ? delayChildren * 0.5 : delayChildren,
      },
    },
  };
};

export const textVariant = (delay) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  return {
    hidden: {
      y: 25,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: isMobile ? 0.5 : 1.25,
        delay: isMobile ? delay * 0.5 : delay,
      },
    },
  };
};

export const slideIn = (direction, type, delay, duration) => {
  // Shorter duration on mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const animDuration = isMobile ? duration * 0.5 : duration;
  const distance = isMobile ? "50%" : "100%";

  return {
    hidden: {
      x:
        direction === "left"
          ? `-${distance}`
          : direction === "right"
          ? distance
          : 0,
      y: direction === "up" ? distance : direction === "down" ? distance : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay: isMobile ? delay * 0.5 : delay,
        duration: animDuration,
        ease: "easeOut",
      },
    },
  };
};

export const zoomIn = (delay, duration) => {
  // Shorter duration on mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const animDuration = isMobile ? duration * 0.5 : duration;

  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay: isMobile ? delay * 0.5 : delay,
        duration: animDuration,
        ease: "easeOut",
      },
    },
  };
};

export const float = {
  animation: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

export const pulse = {
  animation: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

export const rotate = {
  animation: {
    rotate: [0, 360],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const reveal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: {
    clipPath: "inset(0 0 0 0)",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export const cardHover = {
  whileHover: {
    y: -10,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  whileTap: {
    y: -5,
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
};
