import { Button } from "./ui/button";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-4 overflow-hidden">
              <img
                src="/logo.jpeg"
                alt="Muhammad Amas"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Full Stack Developer</h3>

            <p className="text-gray-600 dark:text-gray-400">
              I'm Muhammad Amas, a passionate Full Stack Developer. With a
              strong focus on building clean, efficient, and user-friendly web
              applications, I strive to create digital experiences that make a
              positive impact.
            </p>

            <p className="text-gray-600 dark:text-gray-400">
              My journey in web development began 5 years ago, and since then
              I've worked on a variety of projects ranging from small business
              websites to complex web applications. I enjoy solving problems
              through code and constantly learning new technologies to enhance
              my skill set.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Name:</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Muhammad Amas
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Email:</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  amaswaseem@gmail.com
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Availability:</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Available for Freelance
                </p>
              </div>
            </div>

            <Button asChild>
              <a
                href="/Muhammad_Amas_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
