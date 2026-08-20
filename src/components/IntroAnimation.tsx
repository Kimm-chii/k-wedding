import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config';

export function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Prevent scrolling while intro is active
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }, 4200); // Extended duration for interaction

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 150 // Interaction radius
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    class Particle {
      x: number;
      y: number;
      size: number;
      density: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // Small, delicate dots
        this.density = (Math.random() * 20) + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        // Mixed warm neutral colors (stone tones)
        const colors = ['168, 162, 158', '214, 211, 209', '231, 229, 228'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fill();
      }

      update() {
        // Gentle upward drift
        this.y -= 0.3;
        // Slight horizontal sway
        this.x += Math.sin(this.y * 0.005) * 0.3;

        // Wrap around
        if (this.y < -10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }

        // Mouse repulsion logic
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          // Easing function for smooth interaction
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * this.density * 0.5;
          const directionY = forceDirectionY * force * this.density * 0.5;
          
          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    let particles: Particle[] = [];

    const init = () => {
      particles = [];
      // Adjust particle count based on screen size for performance & balance
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: 'blur(12px)',
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-50 overflow-hidden pointer-events-none"
        >
          {/* Interactive Canvas Background */}
          <motion.canvas 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full pointer-events-auto"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="relative z-10 text-center flex flex-col items-center pointer-events-none"
          >
            <p className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-stone-400 mb-6 font-semibold">
              The Wedding Of
            </p>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-stone-900 tracking-widest mb-8">
              {siteConfig.couple.firstName1[0]} <span className="font-sans font-light italic text-4xl md:text-6xl opacity-50 px-4">&amp;</span> {siteConfig.couple.firstName2[0]}
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 1.2, ease: "easeInOut" }}
              className="h-[1px] w-16 md:w-24 bg-stone-300"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
