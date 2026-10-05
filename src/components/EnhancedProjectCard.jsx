import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar, Star } from "lucide-react";
import { Button } from "./ui/button";
import { trackProjectView, trackExternalLink } from "../lib/analytics";

const EnhancedProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const cardVariants = {
    initial: {
      rotateX: 0,
      rotateY: 0,
      z: 0,
    },
    hover: {
      rotateX: (mousePosition.y - 200) / 20,
      rotateY: -(mousePosition.x - 200) / 20,
      z: 100,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    hover: {
      x: "100%",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="group relative"
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      data-cursor="view"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        variants={cardVariants}
        className="glass rounded-xl overflow-hidden h-full flex flex-col relative border border-neutral-200/80 dark:border-neutral-800"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden rounded-xl z-10 pointer-events-none">
          <motion.div
            variants={shimmerVariants}
            className="absolute inset-0 w-full h-full opacity-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              transform: "skewX(-20deg)",
            }}
          />
        </div>

        {/* Image container */}
        <div className="aspect-video relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-20"
            variants={overlayVariants}
          />

          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            onError={(e) => {
              e.target.src = "/api/placeholder/400/300";
            }}
          />

          {/* Project type badge */}
          <div className="absolute bottom-4 left-4 z-30">
            <motion.span
              className="px-2.5 py-1 text-xs font-medium bg-black/75 dark:bg-white/15 text-white dark:text-neutral-100 rounded-full backdrop-blur-md border border-white/20 dark:border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {project.type || "Web App"}
            </motion.span>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 flex-1 flex flex-col relative">
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(128, 128, 128, 0.2), transparent 50%)`,
            }}
          />

          <div className="relative z-10">
            <motion.h3
              className="text-xl font-bold mb-2 text-neutral-900 dark:text-white group-hover:underline transition-colors"
              layout
            >
              {project.title}
            </motion.h3>

            <motion.p
              className="text-neutral-600 dark:text-neutral-400 mb-4 text-sm line-clamp-3 flex-1"
              layout
            >
              {project.description}
            </motion.p>

            {/* Tech stack */}
            <motion.div className="flex flex-wrap gap-2 mb-4" layout>
              {project.technologies?.slice(0, 4).map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className="px-2.5 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-md border border-neutral-200/80 dark:border-neutral-700/60"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.technologies?.length > 4 && (
                <motion.span
                  className="px-2.5 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md border border-neutral-200/80 dark:border-neutral-700/60"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  +{project.technologies.length - 4}
                </motion.span>
              )}
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-4">
              {project.demoLink && (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="relative overflow-hidden cursor-pointer"
                >
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackProjectView(project.title);
                      trackExternalLink(
                        project.demoLink,
                        `${project.title} Demo`,
                      );
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-neutral-900/10 dark:bg-white/10 -z-10 opacity-0"
                      whileHover={{ opacity: 1 }}
                    />
                    <ExternalLink className="mr-2 h-4 w-4" /> Demo
                  </a>
                </Button>
              )}
              {project.githubLink && (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="relative overflow-hidden cursor-pointer"
                >
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackProjectView(project.title);
                      trackExternalLink(
                        project.githubLink,
                        `${project.title} GitHub`,
                      );
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-neutral-900/10 dark:bg-white/10 -z-10 opacity-0"
                      whileHover={{ opacity: 1 }}
                    />
                    <Github className="mr-2 h-4 w-4" /> Code
                  </a>
                </Button>
              )}
            </div>

            {/* Footer with date and featured star */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60 dark:border-neutral-800">
              {project.date && (
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <Calendar className="w-4 h-4" />
                  {project.date}
                </div>
              )}

              <div className="flex items-center gap-2">
                {project.featured && (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    <Star className="w-4 h-4 text-neutral-900 dark:text-white fill-neutral-900 dark:fill-white" />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background:
              "linear-gradient(45deg, transparent, rgba(128, 128, 128, 0.2), transparent)",
            padding: "1px",
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full bg-background dark:bg-neutral-950 rounded-xl" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedProjectCard;
