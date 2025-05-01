import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
            Featured Publications
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto mb-8">
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
                  className="h-full flex flex-col overflow-hidden group bg-card/50 dark:bg-card/50 backdrop-blur-sm border-gray-200/20 dark:border-gray-800/30 
                shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.1)] 
                hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_-4px_rgba(255,255,255,0.15)]
                transition-shadow duration-300"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={pub.image || defaultImage}
                      alt={pub.title}
                      onError={handleImageError}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                  </div>
                  <CardHeader className="relative">
                    <CardTitle className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {pub.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-muted-foreground">
                      {pub.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center text-sm text-muted-foreground mt-auto pt-6 border-t border-gray-200/20 dark:border-gray-800/30">
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
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-medium text-lg shadow-lg shadow-blue-500/20 dark:shadow-blue-800/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-800/40 hover:-translate-y-1"
          >
            <span className="relative z-10">View All Publications</span>
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
      </div>
    </section>
  );
};

export default FeaturedPublications;
