/* eslint-disable */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Code, Camera, BadgeCheck, Sparkles } from 'lucide-react';
import './About.css';

const nodesData = [
  { id: 1, label: "Crypto", info: "Active since 2022", icon: "https://cdn.simpleicons.org/bitcoin/F7931A", type: "img", angle: 0 },
  { id: 2, label: "Web3 Testnet", info: "Testing since 2024", icon: Globe, type: "lucide", angle: 45 },
  { id: 3, label: "Vibe Coder", info: "Started in 2026", icon: Code, type: "lucide", angle: 90 },
  { id: 4, label: "JavaScript", info: "Since 2021", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", type: "img", angle: 135 },
  { id: 5, label: "Python", info: "Since 2021", icon: "https://cdn.simpleicons.org/python/3776AB", type: "img", angle: 180 },
  { id: 6, label: "Meme Creator", info: "Since 2025", icon: Sparkles, type: "lucide", angle: 225 },
  { id: 7, label: "Content Creator", info: "Since 2025", icon: Camera, type: "lucide", angle: 270 },
  { id: 8, label: "Ambassador", info: "Ambassador Of Idolly AI in 2026", icon: BadgeCheck, type: "lucide", angle: 315 },
];

const MagneticNode = ({ node, index, radius, isMobile, activeNode, hoveredNode, setHoveredNode, setActiveNode, triggerPulse, nodeRef }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isActive = activeNode?.id === node.id;

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    setHoveredNode(null);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setActiveNode(node);
    triggerPulse(index);
  };

  const randomFloatDelay = (node.id % 3) * 0.5;
  const rad = (node.angle * Math.PI) / 180;
  const initX = Math.cos(rad) * radius;
  const initY = Math.sin(rad) * radius;

  return (
    <div className="node-positioner" style={{ transform: `translate(${initX}px, ${initY}px)` }}>
      <motion.div
        className={`node-wrapper ${isActive ? 'active-wrapper' : ''}`}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, margin: "50px" }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.5, delay: index * 0.1 }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5 + (node.id % 2), repeat: Infinity, ease: "easeInOut", delay: randomFloatDelay }}
        >
          <motion.div
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
          >
            <button
              ref={(el) => nodeRef.current[index] = el}
              className={`radial-node ${isActive ? 'active-btn' : ''}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setHoveredNode(node)}
              onClick={handleClick}
              whileTap={{ scale: 0.9 }}
            >
              {node.type === 'img' ? (
                <img src={node.icon} alt={node.label} className="node-icon-img" />
              ) : node.type === 'lucide' ? (
                <node.icon className="node-icon-lucide" />
              ) : (
                <span className="node-icon-emoji">{node.icon}</span>
              )}
              <div className="node-border-energy"></div>
            </button>
          </motion.div>
        </motion.div>

        <div className="node-label-bg">
          <span className="node-label-text">{node.label}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default function About() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const nodesRef = useRef([]);
  const pathsRefs = useRef(nodesData.map(() => ({})));

  const [windowWidth, setWindowWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [pulses, setPulses] = useState({});

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const radius = isMobile ? 150 : isTablet ? 260 : 380; // Increased spacing mapping

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeNode && !e.target.closest('.node-wrapper') && !e.target.closest('.info-card')) {
        setActiveNode(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.addEventListener('mousedown', handleClickOutside);
  }, [activeNode]);

  useEffect(() => {
    let animationFrameId;

    const updatePaths = () => {
      if (!containerRef.current || !centerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const centerRect = centerRef.current.getBoundingClientRect();

      const centerX = centerRect.left - containerRect.left + centerRect.width / 2;
      const centerY = centerRect.top - containerRect.top + centerRect.height / 2;

      nodesRef.current.forEach((nodeEl, index) => {
        const paths = pathsRefs.current[index];
        if (!nodeEl || !paths) return;

        const nodeRect = nodeEl.getBoundingClientRect();
        const nodeX = nodeRect.left - containerRect.left + nodeRect.width / 2;
        const nodeY = nodeRect.top - containerRect.top + nodeRect.height / 2;

        const dx = nodeX - centerX;
        const dy = nodeY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const nx = -dy / dist;
        const ny = dx / dist;
        const curveOffset = isMobile ? 15 : 35;
        const dir = index % 2 === 0 ? 1 : -1;

        const cx = centerX + dx / 2 + nx * curveOffset * dir;
        const cy = centerY + dy / 2 + ny * curveOffset * dir;

        const pathStr = `M ${centerX},${centerY} Q ${cx},${cy} ${nodeX},${nodeY}`;

        if (paths.base) paths.base.setAttribute('d', pathStr);
        if (paths.stream) paths.stream.setAttribute('d', pathStr);
        if (paths.strike) paths.strike.setAttribute('d', pathStr);
      });

      animationFrameId = requestAnimationFrame(updatePaths);
    };

    animationFrameId = requestAnimationFrame(updatePaths);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile, windowWidth]); // re-run if breakpoints change

  const triggerPulse = useCallback((index) => {
    setPulses(prev => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setPulses(prev => ({ ...prev, [index]: false }));
    }, 400);
  }, []);

  return (
    <section id="about" className="about-section radial-about">
      <div className="about-title-wrapper">
        <h2 className="section-title">About <span>Me</span></h2>
      </div>

      <div className="radial-container" ref={containerRef}>

        <svg className="dynamic-connections-svg">
          <defs>
            <linearGradient id="cyanPulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 195, 255, 0)" />
              <stop offset="50%" stopColor="rgba(0, 195, 255, 0.8)" />
              <stop offset="100%" stopColor="rgba(0, 195, 255, 0)" />
            </linearGradient>
            <linearGradient id="orangePulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 158, 0, 0)" />
              <stop offset="50%" stopColor="rgba(255, 158, 0, 1)" />
              <stop offset="100%" stopColor="rgba(255, 158, 0, 0)" />
            </linearGradient>
          </defs>

          {nodesData.map((node, i) => {
            const isHovered = hoveredNode?.id === node.id || activeNode?.id === node.id;
            const isFiring = pulses[i];

            return (
              <g key={`connection-${node.id}`}>
                <path
                  ref={el => pathsRefs.current[i].base = el}
                  className={`connection-path ${isHovered ? 'hovered' : ''} ${activeNode?.id === node.id ? 'active' : ''}`}
                />
                <path
                  ref={el => pathsRefs.current[i].stream = el}
                  className={`energy-stream ${isHovered ? 'hovered' : ''}`}
                  pathLength="1"
                />
                <path
                  ref={el => pathsRefs.current[i].strike = el}
                  className={`pulse-strike ${isFiring ? 'firing' : ''}`}
                  pathLength="1"
                />
              </g>
            );
          })}
        </svg>

        <motion.div
          className="center-avatar"
          animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="avatar-image" ref={centerRef}></div>
          <div className="avatar-glow"></div>
        </motion.div>

        {nodesData.map((node, index) => (
          <MagneticNode
            key={node.id}
            node={node}
            index={index}
            radius={radius}
            isMobile={isMobile}
            activeNode={activeNode}
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
            setActiveNode={setActiveNode}
            triggerPulse={triggerPulse}
            nodeRef={nodesRef}
          />
        ))}

        <AnimatePresence>
          {activeNode && (
            <motion.div
              className={`info-card ${isMobile ? 'mobile-info-card' : ''}`}
              initial={{ scale: 0.5, opacity: 0, x: "-50%", y: isMobile ? 50 : "-40%" }}
              animate={{ scale: 1, opacity: 1, x: "-50%", y: isMobile ? 0 : "-50%" }}
              exit={{ scale: 0.8, opacity: 0, x: "-50%", y: isMobile ? 50 : "-40%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="info-card-content">
                <button className="close-btn" onClick={() => setActiveNode(null)}>×</button>
                <div className="info-header">
                  {activeNode.type === 'img' ? (
                    <img src={activeNode.icon} alt={activeNode.label} className="info-icon-img" />
                  ) : activeNode.type === 'lucide' ? (
                    <activeNode.icon className="info-icon-lucide" />
                  ) : (
                    <span className="info-icon-emoji">{activeNode.icon}</span>
                  )}
                  <h3>{activeNode.label}</h3>
                </div>
                <p className="info-desc">{activeNode.info}</p>
                <div className="info-glow-bg"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
