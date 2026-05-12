import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

class Particle {
  constructor(canvas, speed) {
    this.canvas = canvas;
    this.speed = speed;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this._init();
  }

  _init() {
    this.vx = (Math.random() - 0.5) * 0.5 * this.speed;
    this.vy = (Math.random() - 0.5) * 0.5 * this.speed;
    this.life = Math.random() * 0.6 + 0.4;
    this.size = Math.random() * 2 + 0.5;
    this.opacity = 0;
    this.fadeIn = true;
    this.fadeSpeed = Math.random() * 0.02 + 0.005;
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this._init();
  }

  update(mouse) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distSq = dx * dx + dy * dy;
    if (distSq < 10000) {
      const dist = Math.sqrt(distSq);
      const force = (100 - dist) / 100;
      this.vx -= (dx / dist) * force * 0.01;
      this.vy -= (dy / dist) * force * 0.01;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.99;
    this.vy *= 0.99;

    if (this.fadeIn) {
      this.opacity += this.fadeSpeed;
      if (this.opacity >= this.life) {
        this.opacity = this.life;
        this.fadeIn = false;
      }
    } else {
      this.opacity -= this.fadeSpeed * 0.5;
      if (this.opacity <= 0) this.reset();
    }

    if (this.x < 0) this.x = this.canvas.width;
    else if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    else if (this.y > this.canvas.height) this.y = 0;
  }
}

const FloatingParticles = ({ density = 50, speed = 1 }) => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const animationRef = useRef();
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const lastFrameRef = useRef(0);
  const particlesRef = useRef([]);
  const colorRef = useRef("rgba(96,165,250,0.8)");
  const connColorRef = useRef("rgba(96,165,250,0.1)");

  useEffect(() => {
    if (theme === "dark") {
      colorRef.current = "rgba(96,165,250,0.8)";
      connColorRef.current = "rgba(96,165,250,0.1)";
    } else {
      colorRef.current = "rgba(37,99,235,0.6)";
      connColorRef.current = "rgba(37,99,235,0.05)";
    }
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowPower = prefersReducedMotion || window.innerWidth <= 768;
    const frameInterval = 1000 / (isLowPower ? 30 : 60);
    const effectiveDensity = isLowPower ? Math.min(15, density) : density;

    particlesRef.current = Array.from(
      { length: effectiveDensity },
      () => new Particle(canvas, speed)
    );

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", onMouseMove);
    }

    const animate = (time) => {
      if (time - lastFrameRef.current < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameRef.current = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = particlesRef.current;
      const mouse = mouseRef.current;
      const color = colorRef.current;

      for (const p of pts) {
        p.update(mouse);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!isLowPower && pts.length > 1) {
        ctx.strokeStyle = connColorRef.current;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 14400) {
              const dist = Math.sqrt(distSq);
              ctx.globalAlpha =
                ((120 - dist) / 120) * 0.5 * Math.min(pts[i].opacity, pts[j].opacity);
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.stroke();
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
};

export default FloatingParticles;
