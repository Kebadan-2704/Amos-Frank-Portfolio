import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Don't show on touch devices
    if ('ontouchstart' in window) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    // Track hover on interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, .music-card, .carousel-thumb, .music-filter-btn');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      observer.disconnect();
    };
  }, []);

  if ('ontouchstart' in window) return null;

  return (
    <>
      <motion.div
        className={`cursor-dot ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''}`}
        animate={{ x: pos.x - 4, y: pos.y - 4, scale: clicked ? 0.5 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className={`cursor-ring ${hidden ? 'hidden' : ''} ${hovered ? 'hovered' : ''} ${clicked ? 'clicked' : ''}`}
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: hovered ? 1.8 : clicked ? 0.8 : 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.8 }}
      />
    </>
  );
};

export default CustomCursor;
