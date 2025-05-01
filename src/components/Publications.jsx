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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
            Publications
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto mb-8">
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
                className="w-full px-4 py-3 rounded-full bg-white/5 dark:bg-gray-950/50 border border-gray-200/20 dark:border-gray-800/30 backdrop-blur-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20
                         placeholder:text-gray-400 dark:placeholder:text-gray-500 text-foreground
                         transition-all duration-300 shadow-[0_0_1px_1px_rgba(0,0,0,0.1)] dark:shadow-[0_0_1px_1px_rgba(255,255,255,0.05)]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 hover:bg-white/10 dark:hover:bg-gray-800/50 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </button>
                )}
                <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
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
              <p className="text-muted-foreground text-lg">
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
            className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-gray-200/20 dark:border-gray-800/30 overflow-hidden
          shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.1)]
          hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_-4px_rgba(255,255,255,0.15)]
          transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
                Stay Updated
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Follow me on Medium for the latest articles and insights
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <a
                href="https://muhammadamas.medium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
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
