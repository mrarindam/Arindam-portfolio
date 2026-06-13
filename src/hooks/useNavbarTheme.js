import { useState, useEffect } from 'react';

export default function useNavbarTheme() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const navbarY = 50; // threshold height representing the fixed navbar alignment line

    const handleIntersection = () => {
      const elements = Array.from(document.querySelectorAll('[data-theme]'));
      let activeSection = null;

      // Find the element currently covering the navbar line
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= navbarY && rect.bottom > navbarY) {
          activeSection = el; // Overwrite to pick the deepest nested match (child over parent)
        }
      }

      // Fallback: if no element mathematically covers the line, choose the closest one
      if (!activeSection && elements.length > 0) {
        let minDistance = Infinity;
        elements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top - navbarY);
          if (dist < minDistance) {
            minDistance = dist;
            activeSection = el;
          }
        });
      }

      if (activeSection) {
        const currentTheme = activeSection.getAttribute('data-theme');
        if (currentTheme) {
          setTheme(currentTheme);
        }
      }
    };

    // Throttled triggering wrapper using requestAnimationFrame
    let ticking = false;
    const triggerUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleIntersection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // 1. Listen for window scroll and resize
    window.addEventListener('scroll', triggerUpdate, { passive: true });
    window.addEventListener('resize', triggerUpdate, { passive: true });

    // 2. Observe dynamic changes to data-theme or DOM tree additions/removals
    const domObserver = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      for (const mutation of mutations) {
        if (
          mutation.type === 'childList' ||
          (mutation.type === 'attributes' && mutation.attributeName === 'data-theme')
        ) {
          shouldUpdate = true;
          break;
        }
      }
      if (shouldUpdate) {
        triggerUpdate();
      }
    });

    domObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // 3. Initial check on mount
    handleIntersection();

    // Secondary check after dynamic layout/fonts load or transitions complete
    const timer = setTimeout(triggerUpdate, 150);

    return () => {
      window.removeEventListener('scroll', triggerUpdate);
      window.removeEventListener('resize', triggerUpdate);
      domObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return theme;
}
