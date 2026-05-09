import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar, Star } from "lucide-react";
import { Button } from "./ui/button";
import { trackProjectView, trackExternalLink } from "../lib/analytics";

const EnhancedProjectCard = ({ project, index, featured = false }) => {
  const date = project.date || project.yearCompleted;
  const type = project.type || project.category?.[0];

  return (
    <motion.div
      className="group relative h-full"
      data-cursor="view"
      whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
    >
      <div
        className={`glass rounded-xl overflow-hidden h-full flex relative transition-shadow duration-300 group-hover:shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_16px_48px_rgba(59,130,246,0.1)] ${
          featured ? "flex-col md:flex-row" : "flex-col"
        }`}
      >
        {/* Image */}
        <div
          className={`relative overflow-hidden ${
            featured
              ? "aspect-video md:aspect-auto md:w-1/2 md:shrink-0"
              : "aspect-video"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "/api/placeholder/400/300";
            }}
          />

          {type && (
            <span className="absolute bottom-4 left-4 z-30 px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-100 rounded-full backdrop-blur-sm border border-blue-400/30">
              {type}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl" />

          <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>

            <p className="text-muted-foreground mb-4 text-sm line-clamp-3 flex-1">
              {project.description}
            </p>

            {/* Tech badges — static, no per-badge animations */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies?.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-md"
                >
                  {tech}
                </span>
              ))}
              {project.technologies?.length > 4 && (
                <span className="px-2 py-1 text-xs bg-gray-100/80 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 rounded-md">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mb-4">
              {project.demoLink && (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="relative overflow-hidden group/btn"
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
                    <div className="absolute inset-0 bg-blue-600/10 -z-10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <ExternalLink className="mr-2 h-4 w-4" /> Demo
                  </a>
                </Button>
              )}
              {project.githubLink && (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="relative overflow-hidden group/btn"
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
                    <div className="absolute inset-0 bg-blue-600/10 -z-10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    <Github className="mr-2 h-4 w-4" /> Code
                  </a>
                </Button>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
              {date && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {date}
                </div>
              )}
              {project.featured && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedProjectCard;
