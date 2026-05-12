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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto mb-8">
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
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-medium text-lg shadow-lg shadow-blue-500/20 dark:shadow-blue-800/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-800/40 hover:-translate-y-1"
          >
            <span className="relative z-10">View All Projects</span>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-transparent dark:from-blue-300/20"
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