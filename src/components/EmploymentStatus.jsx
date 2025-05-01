import { AnimatedSection, AnimatedElement } from "./ui/animated-section";
import { fadeIn } from "../lib/animations";

const EmploymentStatus = () => {
  return (
    <AnimatedSection
      id="employment-status"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5 -z-10 bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-20 left-10 md:left-40 w-80 h-80 bg-blue-100/50 dark:bg-blue-600/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 md:right-40 w-60 h-60 bg-indigo-100/50 dark:bg-indigo-600/5 rounded-full blur-3xl -z-10" />

      {/* Code-like decorative elements */}
      <div className="absolute top-10 right-20 text-gray-200 dark:text-gray-600/20 text-6xl font-mono">
        {"{"}
      </div>
      <div className="absolute bottom-10 left-20 text-gray-200 dark:text-gray-600/20 text-6xl font-mono">
        {"}"}
      </div>

      <div className="container px-4">
        <AnimatedElement
          variants={fadeIn("up", 0.2)}
          className="text-center max-w-5xl mx-auto"
        >
          <p className="mb-12 text-xl">I'm currently looking for employment.</p>

          <div className="flex flex-col items-center">
            <pre className="text-left font-mono">
              <AnimatedElement
                variants={fadeIn("up", 0.3)}
                className="text-4xl md:text-5xl font-bold mb-2"
              >
                FullStackDev: {"{"}
              </AnimatedElement>

              <AnimatedElement variants={fadeIn("up", 0.4)}>
                <div className="pl-8 md:pl-12 mb-2">
                  <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text">
                    Full Stack Engineer,
                  </span>
                </div>
                <div className="pl-8 md:pl-12">
                  <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
                    Cloud Engineer,
                  </span>
                </div>
              </AnimatedElement>

              <AnimatedElement
                variants={fadeIn("up", 0.5)}
                className="text-4xl md:text-5xl font-bold mt-2"
              >
                {"}"}
              </AnimatedElement>
            </pre>
          </div>

          <AnimatedElement
            variants={fadeIn("up", 0.6)}
            className="mt-16 text-gray-500 dark:text-gray-400 text-xl max-w-3xl mx-auto"
          >
            I am particularly interested in Full Stack positions where I can
            help make an organization wide impact.
          </AnimatedElement>
        </AnimatedElement>
      </div>
    </AnimatedSection>
  );
};

export default EmploymentStatus;
