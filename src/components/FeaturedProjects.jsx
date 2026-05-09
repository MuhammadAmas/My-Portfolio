import React from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projectsInfo";
import { Link } from "react-router-dom";
import { fadeIn } from "../lib/animations";
import EnhancedProjectCard from "./EnhancedProjectCard";

const FeaturedProjects = () => {
  const featuredProjects = projects.slice(0, 4);

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Check out some of my recent work
          </p>
        </motion.div>

        {/* Bento grid — two rows, featured card alternates sides */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Row 1: Featured (col-span-2) + Card 2 */}
          <motion.div
            className="lg:col-span-2"
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <EnhancedProjectCard
              project={featuredProjects[0]}
              index={0}
              featured
            />
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <EnhancedProjectCard project={featuredProjects[1]} index={1} />
          </motion.div>

          {/* Row 2: Card 3 + Featured (col-span-2) */}
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <EnhancedProjectCard project={featuredProjects[2]} index={2} />
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            variants={fadeIn("left", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <EnhancedProjectCard
              project={featuredProjects[3]}
              index={3}
              featured
            />
          </motion.div>
        </div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
