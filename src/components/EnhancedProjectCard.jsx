import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Calendar, Eye, Code, Star } from "lucide-react";

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
      transition: { duration: 0.3 }
    },
  };

  const contentVariants = {
    initial: { y: 20, opacity: 0 },
    hover: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.3,
        delay: 0.1 
      }
    },
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10 
      }
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
        className="glass rounded-xl overflow-hidden h-full flex flex-col relative"
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
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
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

          {/* Floating action buttons */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                variants={contentVariants}
                className="absolute top-4 right-4 flex gap-2 z-30"
              >
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                    variants={iconVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Eye className="w-4 h-4 text-white" />
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                    variants={iconVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Code className="w-4 h-4 text-white" />
                  </motion.a>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project type badge */}
          <div className="absolute bottom-4 left-4 z-30">
            <motion.span
              className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-100 rounded-full backdrop-blur-sm border border-blue-400/30"
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
            className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), transparent 50%)`,
            }}
          />

          <div className="relative z-10">
            <motion.h3 
              className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
              layout
            >
              {project.title}
            </motion.h3>
            
            <motion.p 
              className="text-muted-foreground mb-4 text-sm line-clamp-3 flex-1"
              layout
            >
              {project.description}
            </motion.p>

            {/* Tech stack */}
            <motion.div 
              className="flex flex-wrap gap-2 mb-4"
              layout
            >
              {project.technologies?.slice(0, 4).map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className="px-2 py-1 text-xs bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index * 0.1) + (techIndex * 0.05) }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.technologies?.length > 4 && (
                <motion.span
                  className="px-2 py-1 text-xs bg-gray-100/80 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 rounded-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index * 0.1) + 0.2 }}
                >
                  +{project.technologies.length - 4}
                </motion.span>
              )}
            </motion.div>

            {/* Footer with date and links */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 dark:border-gray-700/50">
              {project.date && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                      repeatDelay: 3 
                    }}
                  >
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </motion.div>
                )}
                
                <div className="flex gap-1">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.2), transparent)",
            padding: "1px",
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full bg-background dark:bg-gray-900 rounded-xl" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedProjectCard;