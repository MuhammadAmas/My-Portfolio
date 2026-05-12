// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { Monitor, Database, Server, Cloud } from "lucide-react";
import { useRef } from "react";
import { fadeIn, staggerContainer } from "../lib/animations";
import { AnimatedElement, AnimatedSection } from "./ui/animated-section";

const Skills = () => {
  const skillCategories = [
    {
      name: "Frontend",
      icon: <Monitor className="h-6 w-6" />,
      colSpan: "md:col-span-4",
      headerColor: "text-blue-500 dark:text-blue-400",
      iconBg: "bg-blue-500/10 text-blue-500 dark:text-blue-400",
      chipBase: "border-blue-500/20 bg-blue-500/5",
      chipHover: "hover:border-blue-500/55 hover:bg-blue-500/12",
      separator: "from-blue-500/50",
      glowColor: "rgba(59, 130, 246, 0.22)",
      skills: [
        { name: "JavaScript", icon: "/skills-logo/javascript-logo.png" },
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
      colSpan: "md:col-span-2",
      headerColor: "text-emerald-500 dark:text-emerald-400",
      iconBg: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
      chipBase: "border-emerald-500/20 bg-emerald-500/5",
      chipHover: "hover:border-emerald-500/55 hover:bg-emerald-500/12",
      separator: "from-emerald-500/50",
      glowColor: "rgba(16, 185, 129, 0.2)",
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
      colSpan: "md:col-span-3",
      headerColor: "text-amber-500 dark:text-amber-400",
      iconBg: "bg-amber-500/10 text-amber-500 dark:text-amber-400",
      chipBase: "border-amber-500/20 bg-amber-500/5",
      chipHover: "hover:border-amber-500/55 hover:bg-amber-500/12",
      separator: "from-amber-500/50",
      glowColor: "rgba(245, 158, 11, 0.2)",
      skills: [
        { name: "MongoDB", icon: "/skills-logo/MongoDB-logo.png" },
        { name: "Firestore", icon: "/skills-logo/firestore.png" },
        { name: "MySQL", icon: "/skills-logo/mysql-logo.png" },
        { name: "PostgreSQL", icon: "/skills-logo/PostgresSQL.png" },
        { name: "Redis", icon: "/skills-logo/Redis.png" },
        { name: "Supabase", icon: "/skills-logo/supabase-logo.png" },
      ],
    },
    {
      name: "Cloud & Tools",
      icon: <Cloud className="h-6 w-6" />,
      colSpan: "md:col-span-3",
      headerColor: "text-violet-500 dark:text-violet-400",
      iconBg: "bg-violet-500/10 text-violet-500 dark:text-violet-400",
      chipBase: "border-violet-500/20 bg-violet-500/5",
      chipHover: "hover:border-violet-500/55 hover:bg-violet-500/12",
      separator: "from-violet-500/50",
      glowColor: "rgba(139, 92, 246, 0.2)",
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

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container px-6 relative z-10">
        <AnimatedSection>

          {/* Section heading */}
          <AnimatedElement
            variants={fadeIn("down", 0.2)}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-[0.2em] mb-3">
              What I build with
            </p>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
              My Skills
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
              A cross-stack toolkit spanning UI to infrastructure — the technologies I reach for daily.
            </p>
          </AnimatedElement>

          {/* Bento cards */}
          <motion.div
            ref={containerRef}
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-6 gap-5"
          >
            {skillCategories.map((category, index) => (
              <AnimatedElement
                key={category.name}
                variants={fadeIn(index % 2 === 0 ? "right" : "left", index * 0.1)}
                className={`glass rounded-2xl p-7 relative overflow-hidden group ${category.colSpan}`}
              >
                {/* Ambient corner glow — brightens on card hover */}
                <div
                  className="absolute -top-20 -left-20 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity duration-500"
                  style={{ background: category.glowColor }}
                />

                {/* Header */}
                <div className="flex items-center gap-4 mb-5 relative">
                  <div className={`p-3 rounded-2xl shrink-0 ${category.iconBg}`}>
                    {category.icon}
                  </div>
                  <h3 className={`text-2xl font-bold leading-none ${category.headerColor}`}>
                    {category.name}
                  </h3>
                </div>

                {/* Colored separator */}
                <div className={`h-px bg-gradient-to-r ${category.separator} to-transparent mb-5`} />

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2.5 relative">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${category.chipBase} ${category.chipHover} transition-colors duration-200 cursor-default`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        delay: skillIndex * 0.035 + index * 0.05,
                        duration: 0.25,
                      }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-7 h-7 object-contain"
                        onError={(e) => { e.target.src = "/skills-logo/placeholder.svg"; }}
                      />
                      <span className="text-sm font-semibold whitespace-nowrap">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </AnimatedElement>
            ))}
          </motion.div>

        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills;
