import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const FloatingParticles = ({ density = 50, speed = 1 }) => {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const { theme } = useTheme();
  const animationRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Particle class
  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
      this.y = Math.random() * canvas.height;
      this.fadeDelay = Math.random() * 600 + 100;
      this.fadeStart = Date.now() + this.fadeDelay;
      this.fadingOut = false;
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5 * speed;
      this.vy = (Math.random() - 0.5) * 0.5 * speed;
      this.life = Math.random() * 0.6 + 0.4;
      this.maxLife = this.life;
      this.size = Math.random() * 2 + 0.5;
      this.opacity = 0;
      this.fadeIn = true;
      this.fadeSpeed = Math.random() * 0.02 + 0.005;
    }

    update(mouse) {
      // Mouse interaction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 100;

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const angle = Math.atan2(dy, dx);
        this.vx -= Math.cos(angle) * force * 0.01;
        this.vy -= Math.sin(angle) * force * 0.01;
      }

      this.x += this.vx;
      this.y += this.vy;

      // Fade in/out animation
      if (this.fadeIn && this.opacity < this.life) {
        this.opacity += this.fadeSpeed;
        if (this.opacity >= this.life) {
          this.fadeIn = false;
        }
      } else if (!this.fadeIn) {
        this.opacity -= this.fadeSpeed * 0.5;
        if (this.opacity <= 0) {
          this.reset();
        }
      }

      // Boundary wrapping
      if (this.x < 0) this.x = this.canvas.width;
      if (this.x > this.canvas.width) this.x = 0;
      if (this.y < 0) this.y = this.canvas.height;
      if (this.y > this.canvas.height) this.y = 0;

      // Add slight damping
      this.vx *= 0.99;
      this.vy *= 0.99;
    }

    draw(ctx, colors) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      
      // Create gradient for particle
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size * 3
      );
      gradient.addColorStop(0, colors.center);
      gradient.addColorStop(0.4, colors.middle);
      gradient.addColorStop(1, colors.outer);
      
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add a subtle glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = colors.glow;
      ctx.fill();
      
      ctx.restore();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const particleArray = [];
    for (let i = 0; i < density; i++) {
      particleArray.push(new Particle(canvas));
    }
    setParticles(particleArray);

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get theme colors
      const colors = getParticleColors();

      particleArray.forEach((particle) => {
        particle.update(mouseRef.current);
        particle.draw(ctx, colors);
      });

      // Draw connections between nearby particles
      drawConnections(ctx, particleArray, colors);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme, density, speed]);

  const getParticleColors = () => {
    if (theme === "dark") {
      return {
        center: "rgba(96, 165, 250, 0.8)", // Blue
        middle: "rgba(147, 197, 253, 0.4)",
        outer: "rgba(191, 219, 254, 0.1)",
        glow: "rgba(96, 165, 250, 0.6)",
        connection: "rgba(96, 165, 250, 0.1)",
      };
    } else {
      return {
        center: "rgba(37, 99, 235, 0.6)",
        middle: "rgba(59, 130, 246, 0.3)",
        outer: "rgba(96, 165, 250, 0.1)",
        glow: "rgba(37, 99, 235, 0.4)",
        connection: "rgba(37, 99, 235, 0.05)",
      };
    }
  };

  const drawConnections = (ctx, particles, colors) => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const opacity = (120 - distance) / 120 * 0.5;
          ctx.save();
          ctx.globalAlpha = opacity * Math.min(particles[i].opacity, particles[j].opacity);
          ctx.strokeStyle = colors.connection;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  };

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{
        background: "transparent",
      }}
    />
  );
};

export default FloatingParticles;