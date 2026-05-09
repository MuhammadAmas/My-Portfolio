// Cached once at module load — viewport doesn't meaningfully change during a session
const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

// Easing curves
const EASE_OUT_QUART = [0.25, 0.46, 0.45, 0.94];
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

export const fadeIn = (direction, delay) => {
  const duration = isMobile ? 0.35 : 0.6;
  const distance = isMobile ? 28 : 50;

  return {
    hidden: {
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration,
        delay: isMobile ? delay * 0.5 : delay,
        ease: EASE_OUT_QUART,
      },
    },
  };
};

export const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: isMobile ? staggerChildren * 0.5 : staggerChildren,
      delayChildren: isMobile ? delayChildren * 0.5 : delayChildren,
    },
  },
});

export const textVariant = (delay) => ({
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: isMobile ? 0.45 : 0.9,
      delay: isMobile ? delay * 0.5 : delay,
      ease: EASE_OUT_EXPO,
    },
  },
});

export const slideIn = (direction, type, delay, duration) => {
  const animDuration = isMobile ? duration * 0.5 : duration;
  const distance = isMobile ? "45%" : "100%";

  return {
    hidden: {
      x:
        direction === "left"
          ? `-${distance}`
          : direction === "right"
          ? distance
          : 0,
      y: direction === "up" || direction === "down" ? distance : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay: isMobile ? delay * 0.5 : delay,
        duration: animDuration,
        ease: EASE_OUT_QUART,
      },
    },
  };
};

export const zoomIn = (delay, duration) => ({
  hidden: { scale: 0.85, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      delay: isMobile ? delay * 0.5 : delay,
      duration: isMobile ? duration * 0.5 : duration,
      ease: EASE_OUT_EXPO,
    },
  },
});

export const float = {
  animation: {
    y: [0, -10, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

export const pulse = {
  animation: {
    scale: [1, 1.04, 1],
    transition: {
      duration: 2.5,
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
      duration: 10,
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
      duration: 0.9,
      ease: EASE_OUT_QUART,
    },
  },
};

export const cardHover = {
  whileHover: {
    y: -8,
    boxShadow:
      "0 20px 40px -8px rgba(0,0,0,0.15), 0 8px 16px -4px rgba(0,0,0,0.06)",
    transition: { duration: 0.25, ease: EASE_OUT_QUART },
  },
  whileTap: {
    y: -3,
    scale: 0.98,
    boxShadow: "0 8px 20px -4px rgba(0,0,0,0.12)",
  },
};
