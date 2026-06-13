import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import './Loader.css';

export default function Loader({ onComplete }) {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (lenis) lenis.stop();

    // Highly responsive 60fps counter animation from 0 to 100%
    let start = 0;
    const end = 100;
    const duration = 1300; // Complete counting in 1.3s
    const stepTime = 16; // 60fps frame tick
    const increment = end / (duration / stepTime);

    const counterInterval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setProgress(end);
        clearInterval(counterInterval);
      } else {
        setProgress(Math.floor(start));
      }
    }, stepTime);

    const timer = setTimeout(() => {
      if (lenis) lenis.start();
      onComplete();
    }, 1800);

    return () => {
      clearInterval(counterInterval);
      clearTimeout(timer);
      if (lenis) lenis.start();
    };
  }, [onComplete, lenis]);

  const containerVariants = {
    initial: {
      y: 0
    },
    exit: {
      y: "-100%",
      transition: {
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const fillVariants = {
    initial: {
      height: "0%"
    },
    animate: {
      height: "100%",
      transition: {
        duration: 1.4,
        ease: [0.42, 0, 0.58, 1],
        delay: 0.1
      }
    }
  };

  return (
    <motion.div
      className="loading-screen"
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      <div className="loader-content">
        <motion.div 
          className="loader-percentage"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {progress}%
        </motion.div>

        <div className="loader-text-wrapper">
          <div className="loader-text bg-text">LOADING</div>
          
          <motion.div 
            className="loader-text-fill-container"
            variants={fillVariants}
            initial="initial"
            animate="animate"
          >
            <div className="loader-text fg-text">LOADING</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
