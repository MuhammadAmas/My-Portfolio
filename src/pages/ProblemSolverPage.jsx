import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import {
  Lightbulb,
  Globe,
  Package,
  Sparkles,
  Send,
  CheckCircle2,
  Zap,
  Shield,
  TrendingUp,
  Palette,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { logPageView } from "../lib/analytics";

const ProblemSolverPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    submissionType: "website",
    websiteUrl: "",
    productDescription: "",
    ideaDescription: "",
    specificConcerns: "",
    goals: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("website");

  useEffect(() => {
    logPageView("problem-solver", "How I'd Improve Your Website");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData((prev) => ({ ...prev, submissionType: tab }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using FormSubmit.co AJAX endpoint
      const formSubmitUrl = "https://formsubmit.co/ajax/amaswaseem@gmail.com";

      // Build the form data object
      const submitData = {
        name: formData.name,
        email: formData.email,
        submission_type: formData.submissionType,
        _subject: `[Problem Solver] New ${formData.submissionType} review request from ${formData.name}`,
        _captcha: "false",
        _template: "table",
      };

      // Add type-specific field
      if (formData.submissionType === "website") {
        submitData.website_url = formData.websiteUrl;
      } else if (formData.submissionType === "product") {
        submitData.product_description = formData.productDescription;
      } else {
        submitData.idea_description = formData.ideaDescription;
      }

      // Add optional fields if filled
      if (formData.specificConcerns) {
        submitData.specific_concerns = formData.specificConcerns;
      }
      if (formData.goals) {
        submitData.goals = formData.goals;
      }

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
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          submissionType: "website",
          websiteUrl: "",
          productDescription: "",
          ideaDescription: "",
          specificConcerns: "",
          goals: "",
        });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send your request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submissionTypes = [
    {
      id: "website",
      label: "Website",
      icon: <Globe className="h-5 w-5" />,
      description: "Get UX, performance & SEO suggestions",
    },
    {
      id: "product",
      label: "Product",
      icon: <Package className="h-5 w-5" />,
      description: "Improve your product's user experience",
    },
    {
      id: "idea",
      label: "Idea",
      icon: <Lightbulb className="h-5 w-5" />,
      description: "Validate and refine your concept",
    },
  ];

  const benefits = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "UX Suggestions",
      description: "Improve user experience with actionable design feedback",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance Tips",
      description: "Speed up your site with optimization recommendations",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Growth Ideas",
      description: "Scale your project with proven growth strategies",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Accessibility Fixes",
      description: "Make your site inclusive for all users",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section className="w-full py-4 sm:py-6 md:py-16 min-h-screen">
      <div className="container px-3 sm:px-4 md:px-6 mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-3 sm:mb-4 md:mb-6 mx-auto w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25"
          >
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl xl:text-6xl mb-2 sm:mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 px-2">
            How I'd Improve Your Website
          </h1>
          <p className="text-muted-foreground max-w-[700px] mx-auto text-sm sm:text-base md:text-lg lg:text-xl px-4 leading-relaxed">
            Submit your website, product, or idea and I'll provide personalized
            suggestions for UX, performance, growth, and accessibility.
          </p>
        </motion.div>

        {/* Benefits Grid - Compact on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <Card className="h-full border-0 bg-gradient-to-br from-background to-muted/50 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-3 sm:p-4 md:p-6 text-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-lg md:rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="scale-75 sm:scale-90 md:scale-100">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground hidden sm:block">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Form Card */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
                <CardContent className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
                    Request Received! 🎉
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for submitting your{" "}
                    {formData.submissionType || "project"}! I'll review it
                    carefully and get back to you within 48-72 hours with
                    personalized suggestions and actionable insights.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    Submit Another Request
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border-0 shadow-xl sm:shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/5 overflow-hidden rounded-2xl sm:rounded-3xl">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 md:p-8">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl text-center">
                    Get Free Expert Feedback
                  </CardTitle>
                  <CardDescription className="text-blue-100 text-center text-xs sm:text-sm md:text-base mt-1">
                    No strings attached — just genuine advice to help you
                    improve
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-3 sm:p-4 md:p-8">
                  {/* Submission Type Tabs */}
                  <div className="grid grid-cols-3 gap-1 mb-4 sm:mb-6 md:mb-8 p-1 bg-muted rounded-lg sm:rounded-xl">
                    {submissionTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleTabChange(type.id)}
                        className={`flex flex-col items-center justify-center gap-0.5 sm:gap-1 md:flex-row md:gap-2 px-2 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg font-medium text-[10px] sm:text-xs md:text-base transition-all duration-300 ${
                          activeTab === type.id
                            ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-md"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="scale-75 sm:scale-90 md:scale-100">
                          {type.icon}
                        </span>
                        <span>{type.label}</span>
                      </button>
                    ))}
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-5 md:space-y-6"
                  >
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                        >
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Dynamic Field Based on Submission Type */}
                    <AnimatePresence mode="wait">
                      {activeTab === "website" && (
                        <motion.div
                          key="website"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <label
                            htmlFor="websiteUrl"
                            className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                          >
                            Website URL *
                          </label>
                          <input
                            type="url"
                            id="websiteUrl"
                            name="websiteUrl"
                            value={formData.websiteUrl}
                            onChange={handleChange}
                            required={activeTab === "website"}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                            placeholder="https://yourwebsite.com"
                          />
                          <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-sm text-muted-foreground">
                            Enter the full URL including https://
                          </p>
                        </motion.div>
                      )}

                      {activeTab === "product" && (
                        <motion.div
                          key="product"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <label
                            htmlFor="productDescription"
                            className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                          >
                            Describe Your Product *
                          </label>
                          <textarea
                            id="productDescription"
                            name="productDescription"
                            value={formData.productDescription}
                            onChange={handleChange}
                            required={activeTab === "product"}
                            rows={3}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                            placeholder="What does your product do? Who is it for?"
                          />
                        </motion.div>
                      )}

                      {activeTab === "idea" && (
                        <motion.div
                          key="idea"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <label
                            htmlFor="ideaDescription"
                            className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                          >
                            Describe Your Idea *
                          </label>
                          <textarea
                            id="ideaDescription"
                            name="ideaDescription"
                            value={formData.ideaDescription}
                            onChange={handleChange}
                            required={activeTab === "idea"}
                            rows={3}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                            placeholder="What's your idea? What outcome do you envision?"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Specific Concerns */}
                    <div>
                      <label
                        htmlFor="specificConcerns"
                        className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                      >
                        Specific Areas of Concern
                      </label>
                      <textarea
                        id="specificConcerns"
                        name="specificConcerns"
                        value={formData.specificConcerns}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                        placeholder="Any specific issues? (e.g., low conversions, slow load times)"
                      />
                    </div>

                    {/* Goals */}
                    <div>
                      <label
                        htmlFor="goals"
                        className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                      >
                        Your Goals
                      </label>
                      <textarea
                        id="goals"
                        name="goals"
                        value={formData.goals}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
                        placeholder="What are you trying to achieve?"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Get Free Feedback
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                      I typically respond within 48-72 hours with detailed
                      suggestions
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 sm:mt-8 md:mt-12 text-center pb-4"
        >
          <p className="text-muted-foreground mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
            Why get feedback from me?
          </p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:flex md:flex-wrap justify-center md:gap-6 text-[10px] sm:text-xs md:text-sm">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
              <span>Full-Stack Dev</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
              <span>UX/UI Focused</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
              <span>Performance Expert</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
              <span>No Obligation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolverPage;
