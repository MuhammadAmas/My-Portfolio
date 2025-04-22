import { useEffect, useState } from "react";
import { Button } from "./ui/button";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, FileText } from "lucide-react";
import {
  AnimatedElement,
  AnimatedText,
  AnimatedDecoration,
} from "./ui/animated-section";
import { fadeIn, slideIn, zoomIn } from "../lib/animations";
import { handleSmoothScroll } from "../lib/smoothScroll";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Full Stack Developer";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative pt-36 pb-16 md:pt-40 md:pb-24">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-white/80 dark:to-gray-900/80 -z-10"></div>

      {/* Decorative Elements */}
      <AnimatedDecoration
        className="absolute top-20 left-10 w-12 h-12 rounded-full bg-blue-600/10 dark:bg-blue-600/20 -z-5"
        animation="float"
      />
      <AnimatedDecoration
        className="absolute bottom-40 right-10 w-16 h-16 rounded-full bg-blue-600/10 dark:bg-blue-600/20 -z-5"
        animation="pulse"
      />
      <AnimatedDecoration
        className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-blue-600/10 dark:bg-blue-600/20 -z-5"
        animation="float"
      />

      <div className="container px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div
          variants={fadeIn("right", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I'm <span className="text-blue-600">Muhammad Amas</span>
          </h1>
          <div className="h-8 mb-6">
            <h2 className="text-xl md:text-2xl font-medium">
              {typedText}
              <span className="animate-pulse"> |</span>
            </h2>
          </div>
          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto lg:mx-0"
          >
            I build modern, responsive web applications with a focus on clean
            code and exceptional user experiences.
          </motion.p>

          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button asChild size="lg" className="overflow-hidden relative">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleSmoothScroll(e, "contact")}
              >
                <motion.div
                  variants={slideIn("left", "tween", 0, 0.5)}
                  className="absolute inset-0 bg-blue-700 -z-10 opacity-0"
                  whileHover={{ opacity: 1 }}
                />
                Get in Touch
              </motion.a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="overflow-hidden relative"
            >
              <motion.a
                href="/Muhammad Amas Resume.pdf"
                target="_blank"
                // rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  variants={slideIn("right", "tween", 0, 0.5)}
                  className="absolute inset-0 bg-blue-600/10 -z-10 opacity-0"
                  whileHover={{ opacity: 1 }}
                />
                <FileText className="mr-2 h-4 w-4" /> Resume
              </motion.a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 flex justify-center lg:justify-start space-x-4"
          >
            <motion.div whileHover={{ y: -5 }} whileTap={{ y: 0 }}>
              <Button variant="ghost" size="icon" asChild className="relative">
                <a
                  href="https://github.com/muhammadamas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                  <motion.div
                    className="absolute inset-0 bg-blue-600/10 rounded-full -z-10 opacity-0"
                    whileHover={{ opacity: 1, scale: 1.2 }}
                  />
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} whileTap={{ y: 0 }}>
              <Button variant="ghost" size="icon" asChild className="relative">
                <a
                  href="https://linkedin.com/in/amaswaseem"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                  <motion.div
                    className="absolute inset-0 bg-blue-600/10 rounded-full -z-10 opacity-0"
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
                className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent rounded-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </div>
            <motion.div
              className="absolute -bottom-4 -right-4 glass rounded-xl p-4 shadow-lg"
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
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center gap-1.5"
                >
                  <span className="relative inline-flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Available for freelance
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={fadeIn("up", 1.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="absolute left-0 right-0 mx-auto mt-4 bottom-6 w-12 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-2 shadow-lg cursor-pointer hover:shadow-xl transition-shadow "
        onClick={(e) => handleSmoothScroll(e, "about", 100)}
      >
        <motion.div
          aria-label="Scroll down"
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          whileHover={{ scale: 1.2 }}
          className="flex justify-center items-center"
        >
          <ArrowDown className="h-6 w-6 text-blue-600" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
