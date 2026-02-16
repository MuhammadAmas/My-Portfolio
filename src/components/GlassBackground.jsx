import { motion } from "framer-motion";

const GlassBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          top: "5%",
          left: "10%",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, transparent 70%)",
          top: "50%",
          right: "5%",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 50, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
          bottom: "10%",
          left: "20%",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 30, -50, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
          top: "30%",
          left: "50%",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default GlassBackground;
