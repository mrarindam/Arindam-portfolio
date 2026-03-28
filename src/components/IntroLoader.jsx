import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import videoSrc from '../assets/video.mp4';
import usePerformance from '../hooks/usePerformance';

export default function IntroLoader({ onComplete }) {
  const { canPlayVideo } = usePerformance();
  const skipVideo = !canPlayVideo; 

  const [videoEnded, setVideoEnded] = useState(skipVideo);
  const [entering, setEntering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (skipVideo) return; // Completely bypass play checks if mobile
    // Attempt play to gracefully fallback immediately if browser blocks strict autoplay
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setVideoEnded(true);
      });
    }
  }, [skipVideo]);

  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  const handleEnter = () => {
    setEntering(true);
    // Let the CSS "burstPortal" burning animation flawlessly finish before formally unmounting DOM
    setTimeout(() => {
      onComplete();
    }, 1400); 
  };

  return (
    <div className={`intro-overlay ${entering ? 'portal-transition' : ''}`}>
      {!skipVideo && (
        <video
          ref={videoRef}
          className="intro-video"
          src={videoSrc}
          autoPlay
          muted // Always initialize strictly muted to guarantee the autoplay promise succeeds globally!
          playsInline
          onEnded={() => setVideoEnded(true)}
        />
      )}
      <div className="video-dark-tint"></div>

      {/* Manual Unmute override requested explicitly for music */}
      {!videoEnded && isMuted && (
        <button className="unmute-btn" onClick={handleUnmute}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          UNMUTE AUDIO
        </button>
      )}

      <AnimatePresence>
        {videoEnded && !entering && (
          <motion.div
            className="enter-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
          >
            <button className="enter-realm-btn" onClick={handleEnter}>
              ENTER THE REALM
            </button>
            <div className="ember-ring"></div>
            
            {/* Subtle floating fire particles reacting behind the main button */}
            <div className="button-particles">
              {Array.from({length: 12}).map((_, i) => (
                <div key={i} className="btn-particle" style={{
                  '--x': Math.random() * 300 - 150 + 'px',
                  '--y': Math.random() * -200 - 50 + 'px',
                  '--d': Math.random() * 2 + 1 + 's',
                }}></div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
