import { motion } from "framer-motion";

/**
 * Floating glass decorative elements for visual interest
 * Add this component inside sections for a modern glassmorphism effect
 */
const GlassDecorations = ({ variant = "default" }) => {
  const decorations = {
    default: [
      {
        size: "w-32 h-32",
        position: "top-10 right-10",
        delay: 0,
        gradient: "from-blue-500/10 to-purple-500/10",
      },
      {
        size: "w-24 h-24",
        position: "bottom-20 left-10",
        delay: 2,
        gradient: "from-pink-500/10 to-orange-500/10",
      },
      {
        size: "w-16 h-16",
        position: "top-1/3 left-1/4",
        delay: 4,
        gradient: "from-cyan-500/10 to-teal-500/10",
      },
    ],
    minimal: [
      {
        size: "w-20 h-20",
        position: "top-20 right-20",
        delay: 0,
        gradient: "from-blue-500/5 to-purple-500/5",
      },
    ],
    hero: [
      {
        size: "w-64 h-64",
        position: "-top-32 -right-32",
        delay: 0,
        gradient: "from-blue-500/20 to-transparent",
      },
      {
        size: "w-48 h-48",
        position: "-bottom-24 -left-24",
        delay: 3,
        gradient: "from-purple-500/15 to-transparent",
      },
      {
        size: "w-32 h-32",
        position: "top-1/2 right-1/4",
        delay: 6,
        gradient: "from-cyan-500/10 to-transparent",
      },
    ],
  };

  const elements = decorations[variant] || decorations.default;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
      {elements.map((el, index) => (
        <motion.div
          key={index}
          className={`absolute ${el.size} ${el.position} rounded-full bg-gradient-to-br ${el.gradient}`}
          style={{
            backdropFilter: "blur(40px)",
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, -10, 5, 0],
            scale: [1, 1.05, 0.95, 1.02, 1],
            rotate: [0, 5, -5, 3, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: el.delay,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Glass section wrapper with built-in decorations
 */
export const GlassSection = ({
  children,
  className = "",
  decorations = true,
  decorationVariant = "default",
}) => {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {decorations && <GlassDecorations variant={decorationVariant} />}
      {children}
    </section>
  );
};

/**
 * Small floating glass pill badges
 */
export const GlassPill = ({ children, className = "" }) => {
  return (
    <motion.span
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium glass-badge ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );
};

/**
 * Glass container with gradient border effect
 */
export const GlassContainer = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`glass-gradient-border p-6 ${className}`}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

/**
 * Animated glass card with spotlight effect
 */
export const SpotlightCard = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`glass-card p-6 relative overflow-hidden group ${className}`}
      whileHover="hover"
      initial="initial"
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.1), transparent 40%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassDecorations;
