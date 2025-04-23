// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatedSection, AnimatedElement } from "./ui/animated-section";
import { fadeIn } from "../lib/animations";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const Publications = () => {
  return (
    <AnimatedSection
      id="publications"
      className="py-16 md:py-24 relative z-10 overflow-hidden"
      staggerDelay={0.1}
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full -z-10"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full -z-10"
        animate={{
          y: [0, -20, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container">
        <AnimatedElement
          variants={fadeIn("down", 0.2)}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" id="publications">
            Publications
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My research articles, blog posts, and other published works.
          </p>
        </AnimatedElement>

        <AnimatedElement variants={fadeIn("up", 0.3)}>
          <motion.div
            className="glass rounded-xl p-8 md:p-16 relative overflow-hidden text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Animated background gradient effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent -z-10"
              animate={{
                opacity: [0, 0.5, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="mx-auto w-24 h-24 bg-blue-600/10 rounded-full flex items-center justify-center mb-6"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">Coming Soon</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              I'm currently working on some exciting publications that will be
              shared here.
            </p>
            <motion.p
              className="text-blue-600 font-medium mb-8"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Stay tuned for updates!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8"
            >
              <Link to="/">
                <Button className="group" variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatedElement>
      </div>
    </AnimatedSection>
  );
};

export default Publications;
