import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Use MotionValues for absolute performance - no React re-renders on mousemove
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configs for smooth following
  const springConfigDot = { damping: 28, stiffness: 500, mass: 0.5 };
  const springConfigRing = { damping: 15, stiffness: 150, mass: 0.8 };

  const dotX = useSpring(cursorX, springConfigDot);
  const dotY = useSpring(cursorY, springConfigDot);
  const ringX = useSpring(cursorX, springConfigRing);
  const ringY = useSpring(cursorY, springConfigRing);

  useEffect(() => {
    // Don't show on touch devices
    if ('ontouchstart' in window) return;

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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

    // Use event delegation on the document body instead of attaching listeners
    // to every interactive element. This avoids the memory leak from the
    // MutationObserver re-querying and re-attaching listeners on every DOM change.
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, .music-card, .carousel-thumb, .music-filter-btn');
      if (target) setHovered(true);
    };
    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, input, textarea, .music-card, .carousel-thumb, .music-filter-btn');
      if (target) setHovered(false);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  if ('ontouchstart' in window) return null;

  return (
    <>
      <motion.div
        className={`cursor-dot ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''}`}
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: clicked ? 0.5 : 1 }}
      />
      <motion.div
        className={`cursor-ring ${hidden ? 'hidden' : ''} ${hovered ? 'hovered' : ''} ${clicked ? 'clicked' : ''}`}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovered ? 1.8 : clicked ? 0.8 : 1 }}
      />
    </>
  );
};

export default CustomCursor;
