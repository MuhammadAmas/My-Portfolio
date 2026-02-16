import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lightbulb, ArrowRight, Sparkles } from "lucide-react";

const ProblemSolverCTA = () => {
  return (
    <section className="w-full py-8 md:py-12 lg:py-20">
      <div className="container px-3 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 dark:from-blue-700 dark:via-purple-700 dark:to-blue-800 p-5 sm:p-8 md:p-12 lg:p-16"
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-purple-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 lg:flex-row lg:gap-12">
            {/* Icon - Smaller on mobile */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
              className="flex-shrink-0"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-grow text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/20 text-white text-xs sm:text-sm font-medium mb-3 sm:mb-4"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                Free Expert Feedback
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4"
              >
                Let Me Improve Your Website
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-blue-100 text-sm sm:text-base md:text-lg max-w-xl mb-4 sm:mb-5 md:mb-6 leading-relaxed"
              >
                Submit your website, product, or idea and get personalized
                suggestions for UX, performance, growth, and accessibility —
                completely free.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start text-xs sm:text-sm text-blue-100"
              >
                <span className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  UX Suggestions
                </span>
                <span className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  Performance Tips
                </span>
                <span className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Growth Ideas
                </span>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0"
            >
              <Link
                to="/improve"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-blue-600 font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Get Free Feedback
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolverCTA;
