import React, { useEffect, useState, useRef } from 'react';

export default function RetroGame() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 991);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const gameSrc = isMobile
    ? 'https://supermario-game.com/mario-game/mobilemario.html'
    : 'https://supermario-game.com/mario-game/mario.html';

  return (
    <div className="retro-game-section" ref={containerRef}>
      <h2 className="retro-game-title">SUPER MARIO BROS</h2>
      <p className="retro-game-controls">
        Use <strong>W, A, S, D</strong> or Arrow keys <strong>[↑ → ↓ ←]</strong> to move/jump. 
        Press <strong>Shift/Ctrl</strong> to Fire/Sprint. 
        Press <strong>P</strong> to pause, <strong>M</strong> to mute.
      </p>
      
      <div className="canvas-wrapper">
        <iframe
          src={gameSrc}
          title="Super Mario Bros Real Game"
          className="mario-game-iframe"
          allowFullScreen
          scrolling="no"
          frameBorder="0"
        />
      </div>
    </div>
  );
}
