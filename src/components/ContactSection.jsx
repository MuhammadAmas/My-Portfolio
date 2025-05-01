import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 mx-auto w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"
          >
            <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </motion.div>

          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-600">
            Let's Connect
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto mb-8 text-lg">
            Have a project in mind or just want to chat? I'd love to hear from
            you. Visit my contact page to get in touch!
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-medium text-lg shadow-lg shadow-blue-500/20 dark:shadow-blue-800/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-800/40 hover:-translate-y-1"
            >
              <span className="relative z-10">Get in Touch</span>
              <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
