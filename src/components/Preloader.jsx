import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');

  // Memoize random values to prevent jitter on re-render
  const barValues = useMemo(() => [...Array(5)].map((_, i) => ({
    maxH: 25 + Math.random() * 35,
    dur: 0.5 + Math.random() * 0.3,
    del: i * 0.08,
  })), []);

  const particleValues = useMemo(() => [...Array(12)].map((_, i) => ({
    startX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
    startY: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
    scale: Math.random() * 0.5 + 0.5,
    rotate: 180 + Math.random() * 180,
    driftX: Math.random() * 100 - 50,
    dur: 2.5 + Math.random() * 2,
    del: i * 0.3,
  })), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setPhase('reveal'), 300);
          setTimeout(() => setPhase('exit'), 1200);
          setTimeout(() => onComplete(), 2000);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="preloader"
          exit={{ clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated background grid */}
          <div className="preloader-grid-bg" />
          
          {/* Pulsing rings and circular image */}
          <div className="preloader-avatar-container">
            <motion.div className="preloader-spin-ring preloader-ring-1" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />
            <motion.div className="preloader-spin-ring preloader-ring-2" animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
            <motion.div className="preloader-avatar-wrapper" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <img src="/amos-hero.jpg" className="preloader-avatar" alt="Amos Frank" />
            </motion.div>
          </div>

          <div className="preloader-content">
            {/* Equalizer bars */}
            <div className="preloader-bars">
              {barValues.map((bv, i) => (
                <motion.div
                  key={i}
                  className="preloader-bar"
                  animate={{ height: [4, bv.maxH, 4] }}
                  transition={{ duration: bv.dur, repeat: Infinity, delay: bv.del, ease: 'easeInOut' }}
                />
              ))}
            </div>

            {/* Name */}
            <motion.div className="preloader-name-wrapper" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
              <h1 className="preloader-name">AMOS <span className="logo-accent">FRANK</span></h1>
            </motion.div>

            <motion.p
              className="preloader-tagline"
              initial={{ opacity: 0, letterSpacing: '20px' }}
              animate={{ opacity: 1, letterSpacing: '6px' }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              THE MUSIC EXPERIENCE
            </motion.p>

            {/* Progress bar with glow */}
            <div className="preloader-progress-container">
              <motion.div className="preloader-progress-bar" style={{ width: `${Math.min(progress, 100)}%` }} />
              <motion.div
                className="preloader-progress-glow"
                style={{ left: `${Math.min(progress, 100)}%` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
            <motion.span
              className="preloader-progress-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.span>
          </div>

          {/* Floating particles */}
          {particleValues.map((pv, i) => (
            <motion.div
              key={i}
              className="preloader-particle"
              initial={{
                x: pv.startX,
                y: pv.startY,
                opacity: 0,
                scale: pv.scale,
              }}
              animate={{
                y: -50,
                opacity: [0, 0.6, 0],
                rotate: [0, pv.rotate],
                x: `+=${pv.driftX}`,
              }}
              transition={{
                duration: pv.dur,
                repeat: Infinity,
                delay: pv.del,
                ease: 'linear',
              }}
            >
              {['♪', '♫', '♬', '🎵'][i % 4]}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
