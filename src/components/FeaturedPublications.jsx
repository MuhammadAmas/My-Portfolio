import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Clock, Calendar, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import publicationsData from "../data/publicationsData.json";
import { fadeIn } from "../lib/animations";

const FeaturedPublications = () => {
  // Get the 3 most recent publications
  const featuredPublications = publicationsData.publications.slice(0, 3);
  const defaultImage = "/publications/default-article.svg";

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-neutral-900 dark:text-neutral-100">
            Featured Publications
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-[600px] mx-auto mb-8">
            Check out my latest articles and insights
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {featuredPublications.map((pub, index) => (
            <motion.div
              key={pub.title}
              variants={fadeIn("up", index * 0.1 + 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full transform-gpu transition-all duration-300 hover:-translate-y-2"
              >
                <Card
                  className="h-full flex flex-col overflow-hidden group bg-card/60 backdrop-blur-sm border-neutral-200/80 dark:border-neutral-800 
                shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] 
                hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.7)]
                transition-shadow duration-300"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={pub.image || defaultImage}
                      alt={pub.title}
                      onError={handleImageError}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                  </div>
                  <CardHeader className="relative">
                    <CardTitle className="text-xl font-semibold line-clamp-2 text-neutral-900 dark:text-white group-hover:underline transition-colors">
                      {pub.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-neutral-600 dark:text-neutral-400">
                      {pub.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center text-sm text-neutral-500 dark:text-neutral-400 mt-auto pt-6 border-t border-neutral-200/80 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{pub.publishedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{pub.readTime}</span>
                    </div>
                  </CardFooter>
                </Card>
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to="/publications"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 font-medium text-lg shadow-lg border border-neutral-900 dark:border-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <span className="relative z-10 cursor-pointer">View All Publications</span>
            <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            <motion.div
              className="absolute inset-0 rounded-full bg-white/10 dark:bg-black/10"
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
      </div>
    </section>
  );
};

export default FeaturedPublications;
