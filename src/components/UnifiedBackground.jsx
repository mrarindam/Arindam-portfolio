import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import usePerformance from '../hooks/usePerformance';

export default function UnifiedBackground() {
  const { particleDensity, reduceMotion, isLowPower } = usePerformance();
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Dynamically adjust particle count based on device evaluation
    const count = Math.floor(140 * particleDensity);
    const arr = Array.from({ length: count }).map((_, i) => {
      const isFairy = Math.random() > 0.8;
      // Disable heavy blurring on low end hardware, use opacity scaling naturally instead
      const isBlurred = Math.random() > 0.6 && !isLowPower; 
      // Stop swaying if user strictly prefers reduced motion
      const swayAmount = reduceMotion ? 0 : (Math.random() - 0.5) * 80;

      return {
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100, 
        size: isFairy ? Math.random() * 2 + 1 : Math.random() * 4 + 2,
        duration: Math.random() * 6 + 6,
        delay: Math.random() * -20,
        sway: swayAmount, 
        type: isFairy ? 'fairy' : 'ember',
        blur: isBlurred ? Math.random() * 3 + 2 : 0
      };
    });
    setParticles(arr);
  }, [particleDensity, reduceMotion, isLowPower]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Deep parallax mapping for depth of field layers
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // slow bg particles
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // fast fg particles

  return (
    <div className="unified-bg-container" ref={containerRef}>
      <motion.div className="unified-bg-gradient" style={{ y: bgY }}>
        {/* Soft fog and heat patches simulating the magma/ember atmosphere */}
        <div className="glow-patch" style={{ top: '10%', left: '10%' }}></div>
        <div className="glow-patch" style={{ top: '30%', right: '5%', width: '800px', height: '800px', animationDelay: '2s' }}></div>
        <div className="glow-patch" style={{ top: '60%', left: '20%', width: '600px', height: '600px', animationDelay: '4s' }}></div>
        <div className="glow-patch" style={{ top: '80%', right: '15%', width: '700px', height: '700px', animationDelay: '1s' }}></div>
      </motion.div>

      {/* Background Particles Layer (Slower, blurred) */}
      <motion.div className="unified-particles-layer" style={{ y: layer1Y }}>
        {particles.filter(p => p.blur > 0).map(p => (
           <Particle key={`bg-${p.id}`} p={p} />
        ))}
      </motion.div>

      {/* Foreground Particles Layer (Faster, sharp, glowing) */}
      <motion.div className="unified-particles-layer" style={{ y: layer2Y }}>
        {particles.filter(p => p.blur === 0).map(p => (
           <Particle key={`fg-${p.id}`} p={p} />
        ))}
      </motion.div>
    </div>
  );
}

const Particle = ({ p }) => (
  <div 
    className={`unified-particle ${p.type}`}
    style={{
      left: `${p.left}%`,
      top: `${p.top}%`,
      width: `${p.size}px`,
      height: `${p.size}px`,
      animationDuration: `${p.duration}s`,
      animationDelay: `${p.delay}s`,
      filter: p.blur ? `blur(${p.blur}px)` : 'none',
      '--sway': `${p.sway}px`
    }}
  ></div>
);
