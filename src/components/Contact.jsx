/* eslint-disable */
import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import "./Contact.css";

// Custom SVG Icons
const GithubIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const TelegramIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const DiscordIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6a15.8 15.8 0 0 0-3.8-1 12.2 12.2 0 0 0-.3.7 15 15 0 0 0-3.8 0A12.2 12.2 0 0 0 9.8 5 15.8 15.8 0 0 0 6 6a16.5 16.5 0 0 0-2 11 15.4 15.4 0 0 0 4 2 13 13 0 0 0 1-1.3 11 11 0 0 1-2-.6 1 1 0 0 1 0-1.7 10 10 0 0 0 8 0 1 1 0 0 1 0 1.7 11 11 0 0 1-2 .6 13 13 0 0 0 1 1.3 15.4 15.4 0 0 0 4-2A16.5 16.5 0 0 0 18 6Z"></path>
    <path d="M9.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM14.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"></path>
  </svg>
);

const MailIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const ContactNode = ({ icon: Icon, label, href, delay, x, y, isMobile }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-node"
      initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
      animate={{
        x: isMobile ? x * 0.9 : x,
        y: isMobile ? y * 1.4 : y,
        scale: 1,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 10,
        delay: delay,
      }}
      whileHover={{ scale: 1.1, filter: "brightness(1.3)" }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="node-glass">
        <Icon className="node-icon" size={24} />
      </div>
      <span className="node-label">{label}</span>
    </motion.a>
  );
};

export default function Contact({ forceActive }) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [phase, setPhase] = useState("idle");
  const [isMobile, setIsMobile] = useState(false);
  // A unique key that increments each time we re-enter, forcing React to
  // remount the animation elements so framer-motion replays initial→animate.
  const [animKey, setAnimKey] = useState(0);
  const timersRef = useRef([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clear any pending timers (prevents stale state updates when user scrolls away mid-animation)
  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  // Play the synthesised impact sound
  const playSound = useCallback(() => {
    // Sound disabled
  }, []);

  // Control animation sequence via prop or IntersectionObserver
  useEffect(() => {
    if (forceActive !== undefined) {
      if (forceActive) {
        clearTimers();
        const t0 = setTimeout(() => {
          setPhase("falling");
          playSound();

          const t1 = setTimeout(() => {
            setPhase("impact");
            const t2 = setTimeout(() => setPhase("split"), 400);
            timersRef.current.push(t2);
          }, 800);
          timersRef.current.push(t1);
        }, 150);
        timersRef.current.push(t0);
      } else {
        clearTimers();
        setPhase("idle");
        setAnimKey((k) => k + 1);
      }
      return () => clearTimers();
    }

    // Fallback Manual IntersectionObserver — fires on EVERY enter & leave
    const el = animationRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // --- ENTERING viewport ---
          // Small delay so the section is nicely visible before the drop starts
          const t0 = setTimeout(() => {
            setPhase("falling");
            playSound();

            const t1 = setTimeout(() => {
              setPhase("impact");
              const t2 = setTimeout(() => setPhase("split"), 400);
              timersRef.current.push(t2);
            }, 800);
            timersRef.current.push(t1);
          }, 150);
          timersRef.current.push(t0);
        } else {
          // --- LEAVING viewport ---
          clearTimers();
          setPhase("idle");
          // Bump key so next enter remounts fresh motion elements
          setAnimKey((k) => k + 1);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [forceActive, clearTimers, playSound]);

  const nodes = [
    { icon: GithubIcon, label: "GitHub", href: "https://github.com/mrarindam", x: -120, y: -60, delay: 0.1 },
    { icon: TelegramIcon, label: "Telegram", href: "https://t.me/MrxArindam", x: 120, y: -60, delay: 0.2 },
    { icon: DiscordIcon, label: "Discord", href: "#", x: -80, y: 70, delay: 0.3 },
    { icon: MailIcon, label: "Email", href: "mailto:marindam342@gmail.com", x: 80, y: 70, delay: 0.4 },
  ];

  return (
    <section ref={containerRef} id="contact" className="contact-wrapper">
      <div className="contact-background-particles" />

      <div className="contact-scene">
        <div className="contact-intro">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="intro-title"
          >
            Hi, I’m Arindam — a passionate web developer with a strong foundation in modern technologies.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="intro-text secondary"
          >
            I’ve been coding since 2021, building dynamic, scalable, and high-performance web applications using JavaScript, React.js, Node.js, and Python.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="intro-text tertiary"
          >
            Since 2026, I’ve been focused on advanced development practices — optimizing performance, refining architecture, and creating seamless user experiences.
          </motion.p>
        </div>

        {/* key={animKey} forces a full remount so framer-motion replays initial→animate */}
        <div ref={animationRef} className="animation-center" key={animKey}>
          {/* Phase 1: Falling Orb */}
          {(phase === "falling" || phase === "idle") && (
            <motion.div
              className="fire-orb"
              initial={{ y: -400, opacity: 0, scaleY: 2, scaleX: 0.5 }}
              animate={
                phase === "falling"
                  ? { y: 0, opacity: 1, scaleY: 1, scaleX: 1 }
                  : { y: -400, opacity: 0 }
              }
              transition={{ duration: 0.8, ease: "easeIn" }}
            >
              <div className="flame-trail" />
            </motion.div>
          )}

          {/* Phase 2: Impact Explosion */}
          {phase === "impact" && (
            <motion.div className="impact-container">
              <motion.div
                className="shockwave"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.div
                className="impact-core"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="spark"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((i * Math.PI) / 4) * 100,
                    y: Math.sin((i * Math.PI) / 4) * 100,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              ))}
            </motion.div>
          )}

          {/* Phase 3 & 4: Split into Nodes */}
          {phase === "split" && (
            <div className="nodes-container">
              {nodes.map((node, i) => (
                <ContactNode key={i} {...node} isMobile={isMobile} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
