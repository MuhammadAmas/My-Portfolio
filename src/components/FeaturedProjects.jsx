import React from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projectsInfo";
import { Link } from "react-router-dom";
import { fadeIn } from "../lib/animations";
import EnhancedProjectCard from "./EnhancedProjectCard";
import { AnimatedSection } from "./ui/animated-section";

const FeaturedProjects = () => {
  // Get the first 3 projects
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-neutral-900 dark:text-neutral-100">
            Featured Projects
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-[600px] mx-auto mb-8">
            Check out some of my recent work
          </p>
        </motion.div>

        <AnimatedSection 
          effect="slide-up"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeIn("up", index * 0.15)}
              initial="hidden"
              animate="show"
            >
              <EnhancedProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatedSection>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to="/projects"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 font-medium text-lg shadow-lg border border-neutral-900 dark:border-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <span className="relative z-10 cursor-pointer">View All Projects</span>
            <motion.div
              className="absolute inset-0 rounded-full bg-white/10 dark:bg-black/10"
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;