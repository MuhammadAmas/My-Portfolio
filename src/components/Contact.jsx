import { useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using FormSubmit.co AJAX endpoint
      const formSubmitUrl = "https://formsubmit.co/ajax/amaswaseem@gmail.com";

      const submitData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        _subject: `New portfolio message from ${formData.name}`,
        _captcha: "false",
        _template: "table",
      };

      const response = await fetch(formSubmitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        trackContactFormSubmit(true);
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      trackContactFormSubmit(false);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactDetails = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "amaswaseem@gmail.com",
      link: "mailto:amaswaseem@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      content: "+92 323 3263278",
      link: "tel:+923233263278",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      content: "Karachi, Pakistan",
      link: "https://maps.google.com/?q=Karachi,Pakistan",
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-neutral-900 dark:text-neutral-100">
            Get In Touch
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-[600px] mx-auto mb-8">
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
                  className="bg-card/60 backdrop-blur-sm border-neutral-200/80 dark:border-neutral-800 overflow-hidden
                  shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]
                  hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.7)]
                  transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-full text-neutral-900 dark:text-white">
                        {info.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg text-neutral-900 dark:text-white">{info.title}</CardTitle>
                        <CardDescription>
                          <a
                            href={info.link}
                            className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
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
              className="bg-card/60 backdrop-blur-sm border-neutral-200/80 dark:border-neutral-800 overflow-hidden
              shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]
              hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.7)]
              transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-neutral-900 dark:text-white">Send Message</CardTitle>
                <CardDescription className="text-neutral-600 dark:text-neutral-400">
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
                      className="mx-auto w-16 h-16 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full flex items-center justify-center text-neutral-900 dark:text-white"
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
                      <Send className="h-8 w-8 text-neutral-900 dark:text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Message Sent!</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
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
                        <label htmlFor="name" className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 rounded-md bg-white/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-700 backdrop-blur-xl
                            focus:outline-none focus:ring-2 focus:ring-neutral-400/40 focus:border-neutral-400/50
                            placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-foreground"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 rounded-md bg-white/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-700 backdrop-blur-xl
                            focus:outline-none focus:ring-2 focus:ring-neutral-400/40 focus:border-neutral-400/50
                            placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-foreground"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-md bg-white/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-700 backdrop-blur-xl
                          focus:outline-none focus:ring-2 focus:ring-neutral-400/40 focus:border-neutral-400/50
                          placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-foreground"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-md bg-white/70 dark:bg-neutral-900/70 border border-neutral-300 dark:border-neutral-700 backdrop-blur-xl
                          focus:outline-none focus:ring-2 focus:ring-neutral-400/40 focus:border-neutral-400/50
                          placeholder:text-neutral-400 dark:placeholder:text-neutral-500 resize-none text-foreground"
                        placeholder="Your message"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full relative overflow-hidden cursor-pointer bg-neutral-900 text-white hover:bg-black dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 border border-neutral-900 dark:border-white shadow-md"
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
