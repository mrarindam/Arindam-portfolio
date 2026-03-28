import { useState, useEffect } from 'react';

const getInitialMetrics = () => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isLowPower: false,
      particleDensity: 1.0, 
      reduceMotion: false,
      hardwareConcurrency: 4,
      canPlayVideo: true
    };
  }

  const windowWidth = window.innerWidth;
  const isMobileWidth = windowWidth < 768;
  const isTabletWidth = windowWidth >= 768 && windowWidth < 1024;
  
  const ua = navigator.userAgent || '';
  const isMobileDevice = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTabletDevice = /iPad/i.test(ua) || (isMobileDevice && windowWidth >= 768);

  const isMobile = isMobileWidth || isMobileDevice;
  const isTablet = isTabletWidth || isTabletDevice;
  
  let hardwareConcurrency = 4;
  if (navigator.hardwareConcurrency) {
    hardwareConcurrency = navigator.hardwareConcurrency;
  }
  
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Video runs ONLY on high-performance desktop devices
  const isLowPower = hardwareConcurrency <= 4 || isMobile || isTablet || reduceMotion;

  return {
    isMobile,
    isTablet,
    isLowPower,
    particleDensity: isLowPower ? 0.25 : 1.0,
    reduceMotion: isLowPower || reduceMotion,
    hardwareConcurrency,
    canPlayVideo: !isLowPower
  };
};

export default function usePerformance() {
  const [metrics, setMetrics] = useState(getInitialMetrics);

  useEffect(() => {
    const handleResize = () => {
      setMetrics(getInitialMetrics());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return metrics;
}
