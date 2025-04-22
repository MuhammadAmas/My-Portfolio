import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

const CursorParticles = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    // Resize canvas to window size
    function setupCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", setupCanvas);
    setupCanvas();

    // Track mouse movement and add particles
    function handleMouseMove(e) {
      const x = e.clientX;
      const y = e.clientY;
      addParticles(6, x, y); // Increased from 5 to 6 particles
    }

    window.addEventListener("mousemove", handleMouseMove);

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 3; // Larger particles
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.opacity = Math.random() * 0.5 + 0.5; // Higher starting opacity

        // Dynamic color based on theme
        if (theme === "dark") {
          // In dark mode, use brighter blues
          this.hue = Math.random() * 30 + 200; // 200-230 (blue range)
          this.saturation = Math.floor(Math.random() * 30) + 70; // 70-100%
          this.lightness = Math.floor(Math.random() * 20) + 70; // 70-90% (brighter)
        } else {
          // In light mode, use deeper blues
          this.hue = Math.random() * 40 + 210; // 210-250 (deeper blue range)
          this.saturation = Math.floor(Math.random() * 30) + 70; // 70-100%
          this.lightness = Math.floor(Math.random() * 20) + 40; // 40-60% (deeper)
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.08; // Slower size reduction
        this.opacity -= 0.015; // Slower opacity reduction
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        // Dynamic color based on theme
        const color = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.opacity})`;
        ctx.fillStyle = color;
        ctx.fill();

        // Enhanced glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
      }
    }

    function addParticles(count, x, y) {
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y));
      }
    }

    // Animation loop
    function animate() {
      // Clear the canvas completely instead of dimming the whole screen
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Reset shadow settings before drawing particles
      ctx.shadowBlur = 0;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Remove particles when they're too small or transparent
        if (particles[i].size <= 0.2 || particles[i].opacity <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Set blend mode based on theme
    canvas.style.mixBlendMode = theme === "dark" ? "lighten" : "multiply";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", setupCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-initialize when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    ></canvas>
  );
};

export default CursorParticles;
