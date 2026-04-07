import { useState, useEffect } from 'react';

/**
 * Returns true only on devices with a mouse/trackpad (not touch-only).
 * Used to conditionally apply whileHover in Framer Motion on non-touch devices.
 */
const useIsHoverDevice = () => {
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsHover(mq.matches);
    const handler = (e) => setIsHover(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isHover;
};

export default useIsHoverDevice;
