import { useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import {
  AnimatedSection,
  AnimatedElement,
  AnimatedCard,
} from "./ui/animated-section";
import { Button } from "./ui/button";
import { fadeIn } from "../lib/animations";
import { ChevronLeft, ChevronRight, Quote, Linkedin } from "lucide-react";

const testimonials = [
  {
    id: 0,
    name: "Shahmeer S.",
    position: "Project Manager, FuturConnect",
    relationship: "client",
    date: "Nov 2024",
    linkedin: "https://www.linkedin.com/",
    image:
      "https://ui-avatars.com/api/?name=Shahmeer+S&background=0D8ABC&color=fff",
    content:
      "I reached out to Amas on very short notice as my Front End team became unavailable just before I had to demo the project to my client. He understood the flow and code requirements instantly and got to work. Something was scheduled for another dev team for almost a month and in their unavailability, Amas worked relentlessly and gave me a pixel-perfect conversion of the Figma design in less than 3 days. I had nothing to worry about as I handed him over the files, he actively updated me with everything that was going on so I could stay in the loop. His communication skills and cooperation helped me deliver the project on time. Given it was a very short deadline, I was worried he wouldn't be able to complete it all but he went beyond my expectations. I highly recommend Amas for Front End!",
  },
  {
    id: 1,
    name: "Hassan Rehman",
    position: "Cloudnosys | Unity Foods limited | Szabist'23",
    relationship: "worked with Muhammad on the same team",
    date: "September 17, 2024",
    linkedin: "https://www.linkedin.com/",
    image:
      "https://ui-avatars.com/api/?name=Hassan+Rehman&background=0D8ABC&color=fff",
    content:
      "Working with Amas has been an exceptional experience. As he is great in managing his workload and tackling all the tasks that are put infront of him. His friendly nature and quality of gelling in with his colleagues is a plus that every team needs. Amas understanding of developing is on another level as his interest towards his work is also his passion. Having such an amazing resource at your hand is important for the company to make their teams' more efficient.",
  },
  {
    id: 2,
    name: "Ahmed Anis",
    position:
      "Engineering Lead @Cloudnosys | Cloud Security | Compliance | AWS | GCP | Azure | Cybersecurity | MERN",
    relationship: "managed Muhammad directly",
    date: "September 4, 2024",
    linkedin: "https://www.linkedin.com/",
    image:
      "https://ui-avatars.com/api/?name=Ahmed+Anis&background=0D8ABC&color=fff",
    content:
      "Amas is a dedicated and hard-working professional, consistently demonstrating a strong work ethic and commitment. He has a remarkable ability to tackle complex issues independently, showing both initiative and resourcefulness in finding effective solutions. Moreover, Amas is always eager to learn and grow, and he is equally willing to assist others, offering his help whenever needed.\n\nIn summary, Amas is a valuable asset to any team, and I truly recommend him for any opportunity he pursues.",
  },
  {
    id: 3,
    name: "Muhammad Owais Javaid",
    position: "Full-stack Engineer",
    relationship: "worked with Muhammad on the same team",
    date: "March 18, 2024",
    linkedin: "https://www.linkedin.com/",
    image:
      "https://ui-avatars.com/api/?name=Muhammad+Owais+Javaid&background=0D8ABC&color=fff",
    content:
      "I am thrilled to recommend Muhammad Amas for his exceptional contributions to team. From his internship to becoming a permanent member, he has impressed us with his quick learning and willingness to take on challenges. He seamlessly adapts to new tasks and approaches each challenge with enthusiasm, making him a valuable asset to any team.",
  },
  {
    id: 4,
    name: "Qamar Zeeshan",
    position:
      "Infrastructure & Cloud Engineer | Multi-Cloud Certified (AWS | Azure | GCP) | Windows/Linux Servers | M365 | Monitoring | Virtualization",
    relationship: "worked with Muhammad on the same team",
    date: "February 25, 2024",
    linkedin: "https://www.linkedin.com/",
    image:
      "https://ui-avatars.com/api/?name=Qamar+Zeeshan&background=0D8ABC&color=fff",
    content:
      "I highly recommend Muhammad Amas for his outstanding performance and contributions as a Full Stack Developer at Cloudnosys. During his time with us, Amas has showcased a remarkable can-do attitude, strong technical skills, and dedication to excellence. His proficiency in technologies like Firebase, React.js, and Node.js has been invaluable to our team's success. Muhammad's proactive involvement in extracurricular activities, certifications, and contributions to technical discussions on LinkedIn and in university reflect his passion for continuous learning and growth in the field.\n\nHe will be a valuable asset to any organization and I have no doubt he will continue to excel in his career.",
  },
  {
    id: 5,
    name: "Daniyal Ali Syed",
    position:
      "Product @ Mahaana (YC W22) • Business Analyst • Agile (Scrum) • Project Management • Data Analysis • User Experience (UX)",
    relationship: "managed Muhammad directly",
    date: "December 11, 2023",
    linkedin: "https://www.linkedin.com/",
    image:
      "https://ui-avatars.com/api/?name=Daniyal+Ali+Syed&background=0D8ABC&color=fff",
    content:
      "Amas' contributions as a Software Engineer have been pivotal, particularly in leveraging their React JS and Node JS expertise to enhance our product's user interface and functionality, significantly boosting user engagement and satisfaction.\n\nTheir proficiency in Firebase and AntDesign has been a game-changer, enabling seamless data integration and creating intuitive, visually appealing interfaces that stand out in our market segment.\n\nAmas has utilized AWS and GCP to continue aligning our product with cutting-edge cloud technologies, ensuring robust scalability and performance that align perfectly with our strategic objectives.\n\nThrough effective collaboration and a deep understanding of frontend technologies, Amas has significantly enhanced team dynamics, fostering a more innovative and efficient development environment.",
  },
  {
    id: 6,
    name: "Syed Zawwar Ahmed",
    position:
      "Software Engineer @ IOMechs | Full Stack Developer | JavaScript | Typescript | MERN Stack | React Native | I help building high performing Web and Mobile Apps",
    relationship: "worked with Muhammad but on different teams",
    date: "April 25, 2023",
    linkedin: "https://www.linkedin.com/",
    image:
      "https://ui-avatars.com/api/?name=Syed+Zawwar+Ahmed&background=0D8ABC&color=fff",
    content:
      "Amas is one of the those individuals who excels both in technical and soft skills. He is an extremely quick learner and exhibits excellent interpersonal capabilities. I would highly recommend anyone who is looking forward to working with him.",
  },
  {
    id: 7,
    name: "Muhammad Omer Khan",
    position:
      "I transform visions into reality with effective project management | Project Manager | Fintech | Digital Banking Transformation | Temenos | SFPCO | Debater-Gold Medallist UOK",
    relationship: "managed Muhammad directly",
    date: "March 26, 2023",
    linkedin: "https://www.linkedin.com/",
    image:
      "https://ui-avatars.com/api/?name=Muhammad+Omer+Khan&background=0D8ABC&color=fff",
    content:
      "I have had the pleasure of working with Muhammad Amas, who is a member of the Karachi University Debating Society. As his lead Parliamentary debates, I had the opportunity to witness his enthusiasm for learning and passion.\n\nMuhammad is a dedicated and hardworking individual who is always eager to learn new skills and take on new challenges. In our time working together, Muhammad has demonstrated a keen attention to detail and a strong work ethic. His ability to work collaboratively with others and take constructive criticism is an asset to any team.\n\nI have no doubt that Muhammad will continue to excel in his career and make significant contributions to the field of software development. I highly recommend him to any organization looking for a talented and motivated individual to join their team.",
  },
  {
    id: 8,
    name: "Muhammad Hamza Khan",
    position:
      "Solving Everyday Problems aka Software Engineer 😉 | I love Web 🌐",
    relationship: "managed Muhammad directly",
    date: "March 8, 2023",
    linkedin: "https://www.linkedin.com/",
    image:
      "https://ui-avatars.com/api/?name=Muhammad+Hamza+Khan&background=0D8ABC&color=fff",
    content:
      "Amas worked as an intern at Tezeract, where I had the privilege of supervising his work.\n\nDuring his internship, Amas demonstrated a remarkable level of curiosity and dedication towards learning.\n\nHe always had a positive attitude and was open to feedback and suggestions, making him a great asset to our team.\n\nOverall, Amas was a joy to work with, and I have no doubt that he will continue to excel in any future endeavors. I highly recommend him without hesitation, and I am confident that he will make a valuable addition to any team.",
  },
  {
    id: 9,
    name: "Hafsa Ahmed Siddiqu",
    position:
      "Employer Branding Executive - Jaffer Brothers | Software Engineer | UBIT'22 | Digital Marketing | SEO Content Writer | Social Media Marketing| Affiliate Marketing",
    relationship: "worked with Muhammad on the same team",
    date: "February 12, 2023",
    linkedin: "https://www.linkedin.com/",
    image:
      "https://ui-avatars.com/api/?name=Hafsa+Ahmed+Siddiqu&background=0D8ABC&color=fff",
    content:
      "I highly recommend Amas. His attention to detail, creativity and enthusiasm make him an excellent team member. He is always willing to take on new challenges and his determination in getting the work done no matter how difficult it is makes him a great asset to any team.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const sectionRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <AnimatedSection
      id="testimonials"
      className="py-16 md:py-24 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-40 left-5 md:left-20 w-40 h-40 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 right-5 md:right-20 w-60 h-60 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container px-4">
        <AnimatedElement
          variants={fadeIn("down", 0.2)}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What People Say
          </h2>
          <div className="w-40 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Testimonials from professionals I've had the pleasure of working
            with throughout my career.
          </p>
        </AnimatedElement>

        <div className="max-w-4xl mx-auto">
          <AnimatedCard
            variants={fadeIn(direction === "left" ? "right" : "left", 0.3)}
            key={currentTestimonial.id}
            className="glass p-8 rounded-xl relative overflow-hidden min-h-[500px] md:min-h-[400px] flex flex-col"
          >
            <Quote className="absolute top-6 right-6 h-12 w-12 text-blue-600/20 dark:text-blue-600/30" />

            <div className="flex flex-col md:flex-row gap-6 items-start flex-grow">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-600/20">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <div className="flex-grow">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="h-full flex flex-col"
                >
                  <h3 className="text-xl font-bold mb-1 flex items-center">
                    {currentTestimonial.name}
                    <a
                      href={currentTestimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {currentTestimonial.position}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                    {currentTestimonial.date} •{" "}
                    {currentTestimonial.relationship}
                  </p>

                  <div className="prose prose-sm dark:prose-invert max-w-none overflow-y-auto max-h-[300px] md:max-h-[200px] pr-2 custom-scrollbar">
                    {currentTestimonial.content
                      .split("\n\n")
                      .map((paragraph, i) => (
                        <p
                          key={i}
                          className="mb-3 text-gray-700 dark:text-gray-300"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedCard>

          <div className="flex justify-center items-center mt-6 gap-6">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="relative overflow-hidden rounded-full h-10 w-10 border-gray-300 dark:border-gray-700"
              >
                <motion.div
                  className="absolute inset-0 bg-blue-600/10 -z-10 opacity-0 rounded-full"
                  whileHover={{ opacity: 1 }}
                />
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === index
                      ? "w-6 bg-blue-600"
                      : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-800"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="relative overflow-hidden rounded-full h-10 w-10 border-gray-300 dark:border-gray-700"
              >
                <motion.div
                  className="absolute inset-0 bg-blue-600/10 -z-10 opacity-0 rounded-full"
                  whileHover={{ opacity: 1 }}
                />
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Testimonials;
