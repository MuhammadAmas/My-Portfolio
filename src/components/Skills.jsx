// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { Monitor, Database, Wrench, Server, Cloud } from "lucide-react";
import { useRef } from "react";
import { fadeIn, staggerContainer } from "../lib/animations";
import { AnimatedElement, AnimatedSection } from "./ui/animated-section";

const Skills = () => {
  const skillCategories = [
    {
      name: "Frontend",
      icon: <Monitor className="h-6 w-6" />,
      skills: [
        {
          name: "JavaScript",
          icon: "/skills-logo/javascript-logo.png",
        },
        { name: "TypeScript", icon: "/skills-logo/typescript-logo.png" },
        { name: "React.js", icon: "/skills-logo/react-logo.png" },
        { name: "Next.js", icon: "/skills-logo/Next.js.png" },
        { name: "Redux", icon: "/skills-logo/Redux.png" },
        { name: "Tailwind CSS", icon: "/skills-logo/Tailwind CSS.png" },
        { name: "Material UI", icon: "/skills-logo/Material UI.png" },
        { name: "Ant Design", icon: "/skills-logo/Ant Design.png" },
        { name: "Bootstrap", icon: "/skills-logo/Bootstrap.png" },
        { name: "HTML", icon: "/skills-logo/html-logo.png" },
        { name: "CSS", icon: "/skills-logo/css-logo.png" },
      ],
    },
    {
      name: "Backend",
      icon: <Server className="h-6 w-6" />,
      skills: [
        { name: "Node.js", icon: "/skills-logo/nodejs-logo.png" },
        { name: "Express.js", icon: "/skills-logo/expressjs-logo.png" },
        { name: "Python", icon: "/skills-logo/python-logo.png" },
        { name: "Nest.js", icon: "/skills-logo/nestjs-logo.png" },
        { name: "GraphQL", icon: "/skills-logo/graphql-logo.png" },
      ],
    },
    {
      name: "Database",
      icon: <Database className="h-6 w-6" />,
      skills: [
        { name: "MongoDB", icon: "/skills-logo/MongoDB-logo.png" },
        { name: "Firestore", icon: "/skills-logo/firestore.png" },
        { name: "MY SQL", icon: "/skills-logo/mysql-logo.png" },
        { name: "PostgreSQL", icon: "/skills-logo/PostgresSQL.png" },
        { name: "Redis", icon: "/skills-logo/Redis.png" },
        { name: "Supabase", icon: "/skills-logo/supabase-logo.png" },
      ],
    },
    {
      name: "Cloud & Tools",
      icon: <Cloud className="h-6 w-6" />,
      skills: [
        { name: "AWS", icon: "/skills-logo/AWS.png" },
        { name: "GCP", icon: "/skills-logo/Google Cloud.png" },
        { name: "Azure", icon: "/skills-logo/Azure.png" },
        { name: "Firebase", icon: "/skills-logo/firebase-logo.png" },
        { name: "Git", icon: "/skills-logo/git.png" },
        { name: "Docker", icon: "/skills-logo/Docker.png" },
      ],
    },
  ];

  // Create reference for the skill items
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [270, 180, 90, 0, 270],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="container px-4 md:pl-24 relative z-10">
        <AnimatedSection>
          <AnimatedElement
            variants={fadeIn("down", 0.2)}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
              My Skills
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I've worked with a variety of technologies in the web development
              world. Here are the main areas I specialize in:
            </p>
          </AnimatedElement>

          <motion.div
            ref={containerRef}
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {skillCategories.map((category, index) => (
              <AnimatedElement
                key={category.name}
                variants={fadeIn(
                  index % 2 === 0 ? "right" : "left",
                  index * 0.1
                )}
                className="glass rounded-xl p-6 backdrop-blur-sm relative overflow-hidden hover:shadow-lg transition-shadow duration-500"
                whileHover={{
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                {/* Decorative gradient blob that animates on hover */}
                <motion.div
                  className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.h3
                  className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    {category.icon}
                  </motion.div>
                  {category.name}
                </motion.h3>

                <motion.div
                  variants={staggerContainer(0.05, 0)}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-6"
                >
                  {category.skills.map((skill, skillIndex) => (
                    <AnimatedElement
                      key={skill.name}
                      variants={fadeIn("up", skillIndex * 0.05 + 0.2)}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <motion.div
                        className="glass rounded-lg p-3 w-16 h-16 flex items-center justify-center transition-all duration-300"
                        whileHover={{
                          scale: 1.1,
                          boxShadow:
                            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          y: -5,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            e.target.src = "/skills-logo/placeholder.svg";
                          }}
                          whileHover={{ rotate: 10 }}
                          animate={
                            isInView ? { opacity: [0, 1], scale: [0.5, 1] } : {}
                          }
                          transition={{
                            duration: 0.3,
                            delay: skillIndex * 0.05,
                          }}
                        />
                      </motion.div>
                      <motion.span
                        className="text-sm font-medium"
                        animate={isInView ? { opacity: [0, 1] } : {}}
                        transition={{
                          duration: 0.3,
                          delay: skillIndex * 0.05 + 0.2,
                        }}
                      >
                        {skill.name}
                      </motion.span>
                    </AnimatedElement>
                  ))}
                </motion.div>
              </AnimatedElement>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills;
