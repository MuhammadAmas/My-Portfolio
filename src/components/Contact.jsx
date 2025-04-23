import { useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import {
  AnimatedSection,
  AnimatedElement,
  AnimatedCard,
} from "./ui/animated-section";
import { fadeIn, staggerContainer } from "../lib/animations";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using FormSubmit.co service
      const formSubmitUrl = "https://formsubmit.co/amaswaseem@gmail.com";

      const formSubmitData = new FormData(e.target);
      // Instead of redirecting to a thanks page, we'll handle the success directly
      formSubmitData.append("_captcha", "false");
      // JSON response instead of redirect
      formSubmitData.append("_redirect", "false");

      const response = await fetch(formSubmitUrl, {
        method: "POST",
        body: formSubmitData,
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset success message after a delay
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      // You could add error handling UI here
      alert("Failed to send message. Please try again later.");
    }
  };

  const contactDetails = [
    {
      title: "Email",
      content: "amaswaseem@gmail.com",
      link: "mailto:amaswaseem@gmail.com",
      icon: <Mail className="h-6 w-6" />,
    },
    {
      title: "Phone",
      content: "+92 323 3263278",
      link: "tel:+923335894738",
      icon: <Phone className="h-6 w-6" />,
    },
  ];

  return (
    <AnimatedSection
      id="contact"
      className="py-16 md:py-24 relative z-10 overflow-hidden"
      staggerDelay={0.1}
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full -z-10"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full -z-10"
        animate={{
          y: [0, -20, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container md:pl-24">
        <AnimatedElement
          variants={fadeIn("down", 0.2)}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" id="contact">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? Drop me a
            message using the form below.
          </p>
        </AnimatedElement>
        Get In Touch
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedElement
            variants={fadeIn("right", 0.3)}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold">Let's Talk</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Whether you have a question about a project, job opportunity, or
              just want to say hi, I'll try my best to get back to you as soon
              as possible.
            </p>

            <motion.div
              variants={staggerContainer(0.1, 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {contactDetails.map((info, index) => (
                <AnimatedCard
                  key={index}
                  variants={fadeIn("left", index * 0.1)}
                  className="glass flex items-center p-4 rounded-lg transition-transform"
                >
                  <motion.div
                    className="p-3 bg-blue-600/10 rounded-full mr-4 relative overflow-hidden"
                    whileHover={{
                      scale: 1.05,
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-blue-600/20 -z-10 opacity-0"
                      whileHover={{ opacity: 1 }}
                    />
                    {info.icon}
                  </motion.div>
                  <div>
                    <h4 className="text-sm text-gray-500 dark:text-gray-400">
                      {info.title}
                    </h4>
                    <motion.p className="font-medium" whileHover={{ x: 2 }}>
                      {info.content}
                    </motion.p>
                  </div>
                </AnimatedCard>
              ))}
            </motion.div>
          </AnimatedElement>

          <AnimatedElement variants={fadeIn("left", 0.3)} ref={formRef}>
            <motion.div
              className="glass rounded-xl p-8 md:p-8 relative overflow-hidden"
              animate={isInView ? { y: [50, 0], opacity: [0, 1] } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Animated background gradient effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent -z-10"
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {submitted ? (
                <motion.div
                  className="text-center py-8 space-y-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="mx-auto w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, 0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Send className="h-8 w-8 text-blue-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for your message. I'll get back to you as soon as
                    possible.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  variants={staggerContainer(0.07, 0.1)}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <AnimatedElement variants={fadeIn("up", 0.1)}>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name
                      </label>
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your name"
                        whileFocus={{
                          scale: 1.01,
                          borderColor: "rgb(37, 99, 235)",
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </AnimatedElement>
                    <AnimatedElement variants={fadeIn("up", 0.2)}>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Your email"
                        whileFocus={{
                          scale: 1.01,
                          borderColor: "rgb(37, 99, 235)",
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </AnimatedElement>
                  </div>
                  <AnimatedElement variants={fadeIn("up", 0.3)}>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <motion.input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Subject"
                      whileFocus={{
                        scale: 1.01,
                        borderColor: "rgb(37, 99, 235)",
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </AnimatedElement>
                  <AnimatedElement variants={fadeIn("up", 0.4)}>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                      placeholder="Your message"
                      whileFocus={{
                        scale: 1.01,
                        borderColor: "rgb(37, 99, 235)",
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </AnimatedElement>
                  <AnimatedElement variants={fadeIn("up", 0.5)}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="overflow-hidden relative"
                    >
                      <Button
                        type="submit"
                        className="w-full relative overflow-hidden"
                        disabled={isSubmitting}
                      >
                        <motion.div
                          className="absolute inset-0 bg-blue-700 -z-10 opacity-0"
                          whileHover={{ opacity: 1 }}
                        />
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" /> Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </AnimatedElement>
                </motion.form>
              )}
            </motion.div>
          </AnimatedElement>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Contact;
