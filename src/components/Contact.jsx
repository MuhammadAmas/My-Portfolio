import { useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { Button } from "./ui/button";
import { Mail, Phone, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { fadeIn } from "../lib/animations";
import { trackContactFormEvent } from "../lib/analytics";

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

    // Track form submission attempt
    trackContactFormEvent("form_submit_attempt", "email_form");

    try {
      const formSubmitUrl = "https://formsubmit.co/amaswaseem@gmail.com";
      const formSubmitData = new FormData(e.target);
      formSubmitData.append("_captcha", "false");
      formSubmitData.append("_redirect", "false");

      const response = await fetch(formSubmitUrl, {
        method: "POST",
        body: formSubmitData,
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);

        // Track successful form submission
        trackContactFormEvent("form_submit_success", "email_form");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      alert("Failed to send message. Please try again later.");

      // Track failed form submission
      trackContactFormEvent("form_submit_failed", "email_form");
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
      link: "tel:+923233263278",
      icon: <Phone className="h-6 w-6" />,
    },
  ];

  return (
    <section className="w-full py-8 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto mb-8">
            Have a project in mind or want to discuss opportunities? Drop me a
            message using the form below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactDetails.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card
                  className="bg-card/50 backdrop-blur-sm border-gray-200/20 dark:border-gray-800/30 overflow-hidden
                  shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.1)]
                  hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_-4px_rgba(255,255,255,0.15)]
                  transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-600/10 rounded-full">
                        {info.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{info.title}</CardTitle>
                        <CardDescription>
                          <a
                            href={info.link}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {info.content}
                          </a>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card
              className="bg-card/50 backdrop-blur-sm border-gray-200/20 dark:border-gray-800/30 overflow-hidden
              shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.1)]
              hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_30px_-4px_rgba(255,255,255,0.15)]
              transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                      Thank you for your message. I'll get back to you as soon
                      as possible.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    ref={formRef}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded-md bg-white/5 dark:bg-gray-950/50 border border-gray-200/20 dark:border-gray-800/30 backdrop-blur-xl
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20
                            placeholder:text-gray-400 dark:placeholder:text-gray-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded-md bg-white/5 dark:bg-gray-950/50 border border-gray-200/20 dark:border-gray-800/30 backdrop-blur-xl
                            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20
                            placeholder:text-gray-400 dark:placeholder:text-gray-500"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-md bg-white/5 dark:bg-gray-950/50 border border-gray-200/20 dark:border-gray-800/30 backdrop-blur-xl
                          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20
                          placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-md bg-white/5 dark:bg-gray-950/50 border border-gray-200/20 dark:border-gray-800/30 backdrop-blur-xl
                          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20
                          placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none"
                        placeholder="Your message"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full relative overflow-hidden"
                      disabled={isSubmitting}
                    >
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
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
