import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const useLiteBackground = () => {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const queries = [
      window.matchMedia("(max-width: 768px)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];
    const update = () => setLite(queries.some((q) => q.matches));

    update();
    queries.forEach((q) => q.addEventListener("change", update));
    return () => queries.forEach((q) => q.removeEventListener("change", update));
  }, []);

  return lite;
};

const ORBS = [
  {
    className: "w-[500px] h-[500px]",
    style: {
      background:
        "radial-gradient(circle, rgba(120, 120, 120, 0.07) 0%, transparent 70%)",
      top: "5%",
      left: "10%",
      filter: "blur(40px)",
    },
    animate: {
      x: [0, 50, -30, 0],
      y: [0, -40, 30, 0],
      scale: [1, 1.1, 0.95, 1],
    },
    transition: { duration: 20, repeat: Infinity, ease: "easeInOut" },
  },
  {
    className: "w-[400px] h-[400px]",
    style: {
      background:
        "radial-gradient(circle, rgba(160, 160, 160, 0.05) 0%, transparent 70%)",
      top: "50%",
      right: "5%",
      filter: "blur(40px)",
    },
    animate: {
      x: [0, -40, 30, 0],
      y: [0, 50, -20, 0],
      scale: [1, 0.9, 1.1, 1],
    },
    transition: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 },
  },
  {
    className: "w-[350px] h-[350px]",
    style: {
      background:
        "radial-gradient(circle, rgba(100, 100, 100, 0.05) 0%, transparent 70%)",
      bottom: "10%",
      left: "20%",
      filter: "blur(40px)",
    },
    animate: {
      x: [0, 30, -50, 0],
      y: [0, -30, 40, 0],
      scale: [1, 1.05, 0.95, 1],
    },
    transition: { duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 },
  },
  {
    className: "w-[300px] h-[300px]",
    style: {
      background:
        "radial-gradient(circle, rgba(140, 140, 140, 0.05) 0%, transparent 70%)",
      top: "30%",
      left: "50%",
      filter: "blur(40px)",
    },
    animate: {
      x: [0, -30, 20, 0],
      y: [0, 40, -30, 0],
      scale: [1, 0.95, 1.05, 1],
    },
    transition: { duration: 16, repeat: Infinity, ease: "easeInOut", delay: 6 },
  },
];

const GlassBackground = () => {
  const lite = useLiteBackground();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient background - Clean Minimal Monochrome */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-neutral-50/50 to-neutral-100/30 dark:from-neutral-950 dark:via-neutral-900/90 dark:to-neutral-950" />

      {/* Monochrome gradient orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${orb.className}`}
          style={orb.style}
          animate={lite ? undefined : orb.animate}
          transition={lite ? undefined : orb.transition}
        />
      ))}

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(128, 128, 128, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(128, 128, 128, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default GlassBackground;
