import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";
import { Github, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, categories } from "../data/projectsInfo";
import { AnimatedSection, AnimatedElement, AnimatedText } from "./ui/animated-section";
import { fadeIn, staggerContainer } from "../lib/animations";
import EnhancedProjectCard from "./EnhancedProjectCard";

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

  // Optimize background animations for mobile
  const backgroundAnimations = isMobile
    ? {
        animate: {
          scale: [1, 1.1, 1],
          transition: { duration: 10, repeat: Infinity, ease: "linear" },
        },
      }
    : {
        animate: {
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, 30, 0],
          transition: { duration: 15, repeat: Infinity, ease: "easeInOut" },
        },
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
            Projects
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto mb-8">
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
          className="flex flex-wrap justify-center gap-4 mb-12"
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
                    relative overflow-hidden
                    ${
                      activeCategory === category
                        ? "border-blue-600 bg-blue-600 hover:bg-blue-700"
                        : "hover:border-blue-600"
                    }
                  `}
                >
                  <AnimatedElement
                    className={`
                      absolute inset-0 -z-10
                      ${
                        activeCategory === category
                          ? "bg-blue-700 opacity-0"
                          : "bg-blue-600/10 opacity-0"
                      }
                    `}
                    whileHover={{ opacity: 1 }}
                  />
                  {category}
                </Button>
              </motion.div>
            </AnimatedElement>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={`${activeCategory}-${project.id}-${index}`}
              variants={fadeIn("up", index * 0.06)}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="h-full"
            >
              <EnhancedProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <motion.div
            variants={fadeIn("up", isMobile ? 0.3 : 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex justify-center mt-12 gap-4"
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
                className="relative overflow-hidden"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </motion.div>
            <span className="flex items-center">
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
                className="relative overflow-hidden"
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
            className="text-gray-600 dark:text-gray-400 mb-4"
            animate={false}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild className="relative overflow-hidden">
              <a
                href="https://github.com/muhammadamas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  className="absolute inset-0 bg-blue-700 -z-10 opacity-0"
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
