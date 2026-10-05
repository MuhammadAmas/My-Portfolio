import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Github, Linkedin, FileText, Mail } from "lucide-react";
import { AnimatedDecoration } from "./ui/animated-section";
import { fadeIn, slideIn, zoomIn } from "../lib/animations";
import { handleSmoothScroll } from "../lib/smoothScroll";
import { trackExternalLink, trackResumeDownload } from "../lib/analytics";
import { Link } from "react-router-dom";

const roles = [
  "Full Stack Developer",
  "React Engineer",
  "Problem Solver",
  "UI Craftsman",
];

const stats = [
  { value: "4+", label: "Years Exp." },
  { value: "20+", label: "Projects" },
  { value: "5★", label: "Upwork" },
];

const MagneticButton = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, restDelta: 0.001 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, restDelta: 0.001 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
};

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const current = roles[roleIndex];

    if (phase === "typing") {
      if (displayText.length < current.length) {
        const t = setTimeout(
          () => setDisplayText(current.slice(0, displayText.length + 1)),
          75,
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("deleting"), 2200);
        return () => clearTimeout(t);
      }
    }

    if (phase === "deleting") {
      if (displayText.length > 0) {
        const t = setTimeout(
          () => setDisplayText((d) => d.slice(0, -1)),
          35,
        );
        return () => clearTimeout(t);
      } else {
        setRoleIndex((r) => (r + 1) % roles.length);
        setPhase("typing");
      }
    }
  }, [displayText, phase, roleIndex]);

  return (
    <section id="home" className="relative py-16 md:py-24">
      <div className="absolute -z-10" />

      <AnimatedDecoration
        className="absolute top-20 left-10 w-12 h-12 rounded-full bg-neutral-900/5 dark:bg-white/5 border border-neutral-200/50 dark:border-neutral-800/50 -z-5"
        animation="float"
      />
      <AnimatedDecoration
        className="absolute bottom-40 right-10 w-16 h-16 rounded-full bg-neutral-900/5 dark:bg-white/5 border border-neutral-200/50 dark:border-neutral-800/50 -z-5"
        animation="pulse"
      />
      <AnimatedDecoration
        className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-neutral-900/5 dark:bg-white/5 border border-neutral-200/50 dark:border-neutral-800/50 -z-5"
        animation="float"
      />

      <div className="container px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-12">
        <motion.div
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I'm{" "}
            <span className="text-gradient-animate">Muhammad Amas</span>
          </h1>

          {/* Typewriter */}
          <div className="h-9 mb-4 flex items-center justify-center lg:justify-start">
            <span className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              {displayText}
            </span>
            <span className="ml-0.5 inline-block w-[2px] h-6 bg-neutral-900 dark:bg-neutral-100 animate-pulse" />
          </div>

          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto lg:mx-0"
          >
            I build modern, responsive web applications with a focus on clean
            code and exceptional user experiences.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeIn("up", 0.45)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex gap-8 justify-center lg:justify-start mb-8"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="text-2xl font-bold text-neutral-900 dark:text-white font-display leading-none">
                  {stat.value}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <MagneticButton>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="overflow-hidden relative animated-gradient w-full cursor-pointer shadow-md"
                >
                  <span className="relative z-10">Get in Touch</span>
                </Button>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="overflow-hidden relative pulse-glow w-full cursor-pointer border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white"
              >
                <motion.a
                  href="/Muhammad Amas Resume.pdf"
                  target="_blank"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => trackResumeDownload()}
                >
                  <motion.div
                    className="absolute inset-0 shimmer -z-10 opacity-0"
                    whileHover={{ opacity: 1 }}
                  />
                  <FileText className="mr-2 h-4 w-4" /> Resume
                </motion.a>
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 flex justify-center lg:justify-start space-x-4"
          >
            <motion.div whileHover={{ y: -5 }} whileTap={{ y: 0 }}>
              <Button variant="ghost" size="icon" asChild className="relative cursor-pointer">
                <a
                  href="https://github.com/muhammadamas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  onClick={() =>
                    trackExternalLink(
                      "https://github.com/muhammadamas",
                      "GitHub Profile",
                    )
                  }
                >
                  <Github className="h-5 w-5" />
                  <motion.div
                    className="absolute inset-0 bg-neutral-900/10 dark:bg-white/10 rounded-full -z-10 opacity-0"
                    whileHover={{ opacity: 1, scale: 1.2 }}
                  />
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} whileTap={{ y: 0 }}>
              <Button variant="ghost" size="icon" asChild className="relative cursor-pointer">
                <a
                  href="https://linkedin.com/in/amaswaseem"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  onClick={() =>
                    trackExternalLink(
                      "https://linkedin.com/in/amaswaseem",
                      "LinkedIn Profile",
                    )
                  }
                >
                  <Linkedin className="h-5 w-5" />
                  <motion.div
                    className="absolute inset-0 bg-neutral-900/10 dark:bg-white/10 rounded-full -z-10 opacity-0"
                    whileHover={{ opacity: 1, scale: 1.2 }}
                  />
                </a>
              </Button>
            </motion.div>
             <motion.div whileHover={{ y: -5 }} whileTap={{ y: 0 }}>
              <Button variant="ghost" size="icon" asChild className="relative cursor-pointer">
                <a
                  href="mailto:amaswaseem@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                  onClick={() =>
                    trackExternalLink(
                      "mailto:amaswaseem@gmail.com",
                      "Email Link",
                    )
                  }
                >
                  <Mail className="h-5 w-5" />
                  <motion.div
                    className="absolute inset-0 bg-neutral-900/10 dark:bg-white/10 rounded-full -z-10 opacity-0"
                    whileHover={{ opacity: 1, scale: 1.2 }}
                  />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={zoomIn(0.5, 0.8)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="hidden lg:flex justify-end"
        >
          <div className="relative">
            <div className="glass rounded-2xl p-4 w-[400px] h-[400px] overflow-hidden">
              <motion.img
                src="/logo.jpeg"
                alt="Muhammad Amas"
                className="w-full h-full object-cover rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </div>
            <motion.div
              className="absolute -bottom-4 -right-4 glass rounded-xl p-4 shadow-lg border border-neutral-200/60 dark:border-neutral-800"
              variants={slideIn("right", "spring", 0.8, 0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="text-sm font-medium">
                <a
                  href="https://www.upwork.com/freelancers/~01a884fcaeb317020c?mp_source=share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 dark:text-neutral-100 hover:text-black dark:hover:text-white transition-colors duration-300 flex items-center gap-1.5"
                >
                  <span className="relative inline-flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 dark:bg-neutral-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-900 dark:bg-white" />
                  </span>
                  Available for freelance
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={fadeIn("up", 0.7)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="absolute left-0 right-0 mx-auto mt-4 bottom-6 w-12 z-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full p-2 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
        onClick={(e) => handleSmoothScroll(e, "about", 100)}
      >
        <motion.div
          aria-label="Scroll down"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          whileHover={{ scale: 1.2 }}
          className="flex justify-center items-center"
        >
          <ArrowDown className="h-6 w-6 text-neutral-900 dark:text-white" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
