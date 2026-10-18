import { Outlet } from "react-router-dom";
import { motion, MotionConfig } from "framer-motion";
import { ThemeProvider } from "./components/ThemeProvider";
import AnalyticsTracker from "./components/AnalyticsTracker";
import GlassBackground from "./components/GlassBackground";

function App() {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      {/* Follow the system Reduce Motion setting for every Framer animation */}
      <MotionConfig reducedMotion="user">
        <motion.div
          className="min-h-screen bg-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GlassBackground />
          <AnalyticsTracker />
          <Outlet />
        </motion.div>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
