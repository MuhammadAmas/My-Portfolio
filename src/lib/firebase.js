import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Analytics is optional: a missing or malformed config must never take the
// whole site down, so failures are logged and analytics stays null.
let app = null;
let analytics = null;

try {
  const rawConfig = import.meta.env.VITE_FIREBASE_CONFIG;
  if (rawConfig && typeof window !== "undefined") {
    app = initializeApp(JSON.parse(rawConfig));
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.warn("Firebase analytics disabled:", error);
}

export { app, analytics };
