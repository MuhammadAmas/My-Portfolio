import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

// Glow color per theme (for the blurred glow div)
const GLOW = {
  dark: "rgba(96,165,250,0.3)",
  light: "rgba(37,99,235,0.22)",
};

// Trail RGB per theme
const TRAIL_RGB = {
  dark: [147, 197, 253],
  light: [37, 99, 235],
};

const TRAIL_LIFE_MS = 480;
const TRAIL_INTERVAL_MS = 18;

const CursorEffect = () => {
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const trailCanvasRef = useRef(null);

  const rafRef = useRef(null);

  // Shared mutable state — no React state, no re-renders
  const mouse = useRef({ x: -200, y: -200, hidden: true, clicked: false, hovered: false });
  const glowPos = useRef({ x: -200, y: -200 });
  const trailPoints = useRef([]); // { x, y, t }
  const lastTrailAdd = useRef(0);

  // Keep theme ref current for use inside RAF loop
  useEffect(() => {
    themeRef.current = theme;
    if (glowRef.current) {
      glowRef.current.style.backgroundColor = GLOW[theme] ?? GLOW.light;
    }
  }, [theme]);

  useEffect(() => {
    // Only run on pointer devices
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cursor = cursorRef.current;
    const glow = glowRef.current;
    const trailCanvas = trailCanvasRef.current;
    if (!cursor || !glow || !trailCanvas) return;

    const ctx = trailCanvas.getContext("2d");

    const resize = () => {
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const m = mouse.current;
    const gp = glowPos.current;

    // Cache fill style string to avoid template literal creation each frame
    let lastTrailTheme = themeRef.current;
    let trailFill = `rgb(${(TRAIL_RGB[lastTrailTheme] ?? TRAIL_RGB.dark).join(",")})`;

    // --- RAF loop: all cursor/trail rendering ---
    const loop = (time) => {
      rafRef.current = requestAnimationFrame(loop);

      // Lerp glow blob behind cursor
      gp.x += (m.x - gp.x) * 0.1;
      gp.y += (m.y - gp.y) * 0.1;

      if (!m.hidden) {
        // Cursor dot — direct style, no React
        const size = m.clicked ? 18 : m.hovered ? 44 : 26;
        cursor.style.transform = `translate(${m.x - size / 2}px, ${m.y - size / 2}px)`;
        cursor.style.width = `${size}px`;
        cursor.style.height = `${size}px`;

        // Glow blob
        glow.style.transform = `translate(${gp.x - 50}px, ${gp.y - 50}px)`;

        // Collect trail point
        if (time - lastTrailAdd.current > TRAIL_INTERVAL_MS) {
          lastTrailAdd.current = time;
          trailPoints.current.push({ x: m.x, y: m.y, t: time });
        }
      }

      // --- Trail canvas ---
      const pts = trailPoints.current;

      // Remove expired points from front
      let removeUntil = 0;
      while (removeUntil < pts.length && time - pts[removeUntil].t > TRAIL_LIFE_MS) {
        removeUntil++;
      }
      if (removeUntil > 0) pts.splice(0, removeUntil);

      if (pts.length === 0) return;

      // Update cached fill string only on theme change
      if (themeRef.current !== lastTrailTheme) {
        lastTrailTheme = themeRef.current;
        trailFill = `rgb(${(TRAIL_RGB[lastTrailTheme] ?? TRAIL_RGB.light).join(",")})`;
      }

      ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      ctx.fillStyle = trailFill;
      for (const pt of pts) {
        const life = 1 - (time - pt.t) / TRAIL_LIFE_MS;
        ctx.globalAlpha = life * life * 0.55;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3.5 * life + 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    // --- Event handlers ---
    const onMove = (e) => {
      m.x = e.clientX;
      m.y = e.clientY;
      if (m.hidden) {
        m.hidden = false;
        cursor.style.opacity = "1";
        glow.style.opacity = "1";
      }
    };

    const onLeave = () => {
      m.hidden = true;
      cursor.style.opacity = "0";
      glow.style.opacity = "0";
    };

    const onEnter = () => {
      m.hidden = false;
      cursor.style.opacity = "1";
      glow.style.opacity = "1";
    };

    const onDown = () => {
      m.clicked = true;
    };

    const onUp = () => {
      m.clicked = false;
    };

    // Event delegation — one listener instead of N per element
    const onOver = (e) => {
      if (e.target.closest("a, button, [data-cursor]")) {
        m.hovered = true;
        cursor.style.opacity = "0.15";
        cursor.style.border = "2px solid rgba(255,255,255,0.95)";
      }
    };

    const onOut = (e) => {
      if (e.target.closest("a, button, [data-cursor]")) {
        m.hovered = false;
        cursor.style.opacity = "1";
        cursor.style.border = "none";
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't mount on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      {/* Trail canvas — drawn each RAF, transparent otherwise */}
      <canvas
        ref={trailCanvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9990 }}
      />

      {/* Main cursor dot — white + mix-blend-mode:exclusion → always visible */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          zIndex: 9999,
          width: 26,
          height: 26,
          backgroundColor: "rgba(255,255,255,0.92)",
          mixBlendMode: "exclusion",
          opacity: 0,
          willChange: "transform, width, height",
          // Only transition size/opacity — NOT transform (that's RAF-driven)
          transition: "width 0.12s ease, height 0.12s ease, opacity 0.18s ease, border 0.1s ease",
        }}
      />

      {/* Outer glow blob — follows with lerp */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          zIndex: 9988,
          width: 100,
          height: 100,
          backgroundColor: GLOW[theme] ?? GLOW.light,
          filter: "blur(32px)",
          opacity: 0,
          willChange: "transform",
          transition: "opacity 0.2s ease",
        }}
      />
    </>
  );
};

export default CursorEffect;
