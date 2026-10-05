import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";
import publicationsData from "../data/publicationsData.json";
import { Clock, Calendar, Search, X, ExternalLink } from "lucide-react";

const defaultImage = "/publications/default-article.svg";

const Publications = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPublications = useMemo(() => {
    if (!searchQuery.trim()) return publicationsData.publications;

    const query = searchQuery.toLowerCase();
    return publicationsData.publications.filter(
      (pub) =>
        pub.title.toLowerCase().includes(query) ||
        pub.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <section className="w-full py-8 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-neutral-900 dark:text-neutral-100">
            Publications
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-[600px] mx-auto mb-8">
            Explore my articles on technology, development, and industry
            insights
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto group">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications..."
                className="w-full px-4 py-3 rounded-full bg-white/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-700 backdrop-blur-xl
                         focus:outline-none focus:ring-2 focus:ring-neutral-400/40 focus:border-neutral-400/50
                         placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-foreground
                         transition-all duration-300 shadow-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                  </button>
                )}
                <Search className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredPublications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-center py-12"
            >
              <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                No publications found matching your search.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filteredPublications.map((pub, index) => (
                <motion.div
                  key={pub.title}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={{
                    initial: { opacity: 0, y: 50 },
                    animate: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.1 },
                    },
                  }}
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
          )}
        </AnimatePresence>

        {/* Medium Follow Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card
            className="max-w-2xl mx-auto bg-card/70 backdrop-blur-sm border-neutral-200/80 dark:border-neutral-800 overflow-hidden
          shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]
          hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.7)]
          transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">
                Stay Updated
              </CardTitle>
              <CardDescription className="text-base text-neutral-600 dark:text-neutral-400">
                Follow me on Medium for the latest articles and insights
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <a
                href="https://muhammadamas.medium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 font-medium transition-colors duration-200 shadow-sm border border-neutral-900 dark:border-white"
              >
                Follow on Medium
                <ExternalLink className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
