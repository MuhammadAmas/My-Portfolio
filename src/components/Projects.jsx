import { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { projects, categories } from "../data/projectsInfo";
import {
  AnimatedSection,
  AnimatedElement,
  AnimatedCard,
  AnimatedText,
} from "./ui/animated-section";
import { fadeIn, staggerContainer } from "../lib/animations";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const projectsPerPage = 9;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category.includes(activeCategory));

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const displayedProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <AnimatedSection
      id="projects"
      className="py-8 md:py-24 relative overflow-hidden"
    >
      <div className="container px-4" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-neutral-900 dark:text-neutral-100">
            Projects
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-[600px] mx-auto mb-8">
            Here are some of my recent projects. Each one was built to solve
            specific problems and showcases different skills in my toolkit.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(
            isMobile ? 0.03 : 0.05,
            isMobile ? 0.05 : 0.1
          )}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <AnimatedElement
              key={category}
              variants={fadeIn(
                "up",
                isMobile ? index * 0.03 : index * 0.05 + 0.3
              )}
            >
              <motion.div
                whileHover={!isMobile ? { scale: 1.05 } : undefined}
                whileTap={!isMobile ? { scale: 0.95 } : undefined}
              >
                <Button
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(0);
                  }}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`
                    relative overflow-hidden cursor-pointer rounded-full px-5
                    ${
                      activeCategory === category
                        ? "border-neutral-900 bg-neutral-900 text-white hover:bg-black dark:border-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                        : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white"
                    }
                  `}
                >
                  <AnimatedElement
                    className="absolute inset-0 -z-10 bg-neutral-900/10 dark:bg-white/10 opacity-0"
                    whileHover={{ opacity: 1 }}
                  />
                  {category}
                </Button>
              </motion.div>
            </AnimatedElement>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer(
            isMobile ? 0.05 : 0.1,
            isMobile ? 0.1 : 0.3
          )}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayedProjects.map((project, index) => (
            <AnimatedCard
              key={`${activeCategory}-${project.id}-${index}`}
              variants={fadeIn(
                index === 0
                  ? "right"
                  : index === displayedProjects.length - 1
                  ? "left"
                  : "up",
                isMobile ? index * 0.1 : index * 0.2
              )}
              className="glass rounded-xl overflow-hidden group h-full flex flex-col border border-neutral-200/80 dark:border-neutral-800"
            >
              <div className="aspect-video relative overflow-hidden">
                <motion.div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 z-10 transition-opacity duration-300 group-hover:opacity-100" />

                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  whileHover={{ scale: 1.05 }}
                  onError={(e) => {
                    e.target.src = "/projects-images/placeholder.jpg";
                  }}
                />
                <motion.div
                  className="absolute top-0 right-0 bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-medium px-3 py-1 rounded-bl-lg z-20"
                  whileHover={{ scale: 1.05 }}
                >
                  {project.category.join(", ")}
                </motion.div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <motion.div
                  className="flex justify-between items-center mb-2"
                  whileHover={{ x: 2 }}
                >
                  <motion.h3
                    className="text-xl font-bold text-neutral-900 dark:text-white group-hover:underline"
                    whileHover={{ scale: 1.02, x: 2 }}
                  >
                    {project.title}
                  </motion.h3>
                  <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    {project.yearCompleted}
                  </div>
                </motion.div>
                <p
                  className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-5 text-sm"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                ></p>

                <motion.div
                  variants={staggerContainer(0.03, 0)}
                  initial="hidden"
                  animate="show"
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      variants={fadeIn("up", techIndex * 0.03)}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-full text-xs border border-neutral-200/80 dark:border-neutral-700/60"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                {project.highlights && (
                  <div className="mb-6 mt-auto">
                    <motion.h4
                      className="text-sm font-semibold mb-2 text-neutral-900 dark:text-neutral-200"
                      whileHover={{ x: 2 }}
                    >
                      Key Features:
                    </motion.h4>
                    <motion.ul
                      className="text-sm text-neutral-600 dark:text-neutral-400 list-disc pl-5 space-y-1"
                      variants={staggerContainer(0.05, 0.1)}
                      initial="hidden"
                      animate="show"
                    >
                      {project.highlights.slice(0, 2).map((highlight, i) => (
                        <motion.li
                          key={i}
                          variants={fadeIn("left", i * 0.1)}
                          whileHover={{ x: 2 }}
                        >
                          {highlight}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                )}

                <motion.div
                  className="flex gap-4 mt-auto pt-2"
                  variants={fadeIn("up", 0.5)}
                >
                  {project.demoLink && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
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
                        >
                          <motion.div
                            className="absolute inset-0 bg-neutral-900/10 dark:bg-white/10 -z-10 opacity-0"
                            whileHover={{ opacity: 1 }}
                          />
                          <ExternalLink className="mr-2 h-4 w-4" /> Demo
                        </a>
                      </Button>
                    </motion.div>
                  )}
                  {project.githubLink && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
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
                        >
                          <motion.div
                            className="absolute inset-0 bg-neutral-900/10 dark:bg-white/10 -z-10 opacity-0"
                            whileHover={{ opacity: 1 }}
                          />
                          <Github className="mr-2 h-4 w-4" /> Code
                        </a>
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </AnimatedCard>
          ))}
        </motion.div>

        {totalPages > 1 && (
          <motion.div
            variants={fadeIn("up", isMobile ? 0.3 : 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex justify-center mt-12 gap-4 items-center"
          >
            <motion.div
              whileHover={!isMobile ? { scale: 1.1 } : undefined}
              whileTap={!isMobile ? { scale: 0.9 } : undefined}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="relative overflow-hidden border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </motion.div>
            <span className="flex items-center text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {currentPage + 1} / {totalPages}
            </span>
            <motion.div
              whileHover={!isMobile ? { scale: 1.1 } : undefined}
              whileTap={!isMobile ? { scale: 0.9 } : undefined}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="relative overflow-hidden border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          variants={fadeIn("up", 0.7)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <AnimatedText
            tag="p"
            text="Want to see more of my work?"
            className="text-neutral-600 dark:text-neutral-400 mb-4"
            animate={false}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild className="relative overflow-hidden cursor-pointer bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 border border-neutral-900 dark:border-white shadow-md">
              <a
                href="https://github.com/muhammadamas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  className="absolute inset-0 bg-white/10 dark:bg-black/10 -z-10 opacity-0"
                  whileHover={{ opacity: 1 }}
                />
                <Github className="mr-2 h-4 w-4" /> View All Projects on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default Projects;