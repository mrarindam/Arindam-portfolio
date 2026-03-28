import React, { useEffect, useRef } from 'react';
import usePerformance from '../hooks/usePerformance';

export default function CursorSparks() {
  const { particleDensity, isLowPower, isMobile } = usePerformance();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let particles = [];
    
    let isMoving = false;
    let emitPoint = { x: -100, y: -100 };
    let moveTimeout = null;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Spark {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1; // 1 to 3px
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.5;
        this.vx = Math.cos(angle) * speed * 0.5;
        this.vy = Math.sin(angle) * speed * 0.5 - 1.2; // Upward gravity
        
        this.life = 1;
        this.decay = Math.random() * 0.025 + 0.015;
        
        const colors = ['255,158,0', '255,90,0', '255,220,100', '255,255,255'];
        this.rgb = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy -= 0.015; // Float upwards
        this.vx += (Math.random() - 0.5) * 0.15; // Wiggle
        this.life -= this.decay;
        if (this.size > 0.1) this.size -= 0.015;
      }

      draw(ctx) {
        if (this.life <= 0) return;
        ctx.beginPath();
        const alpha = Math.random() > 0.8 ? this.life * 0.4 : this.life;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.rgb},${alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.rgb},${alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isMoving) {
        // Adapt spawn count strictly relying on adaptive context density
        let spawnCount = isMobile ? 1 : 2;
        spawnCount = Math.floor(spawnCount * particleDensity);
        
        // If density heavily constrained (like on low power or mobile), probability handles the fraction
        if (spawnCount === 0 && Math.random() < particleDensity) {
           spawnCount = 1;
        }

        for (let i = 0; i < spawnCount; i++) {
          const offsetX = (Math.random() - 0.5) * 10;
          const offsetY = (Math.random() - 0.5) * 10;
          particles.push(new Spark(emitPoint.x + offsetX, emitPoint.y + offsetY));
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handlePointerMove = (e) => {
      isMoving = true;
      if (e.touches && e.touches.length > 0) {
        emitPoint.x = e.touches[0].clientX;
        emitPoint.y = e.touches[0].clientY;
      } else {
        emitPoint.x = e.clientX;
        emitPoint.y = e.clientY;
      }
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 50);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(moveTimeout);
    };
  }, [particleDensity, isMobile]);

  // If low power mode detected, we can completely sever the heavy canvas rendering 
  // to prioritize primary frame rates on smartphones.
  if (isMobile && isLowPower) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    />
  );
}
