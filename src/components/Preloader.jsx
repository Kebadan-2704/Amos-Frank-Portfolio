import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading -> reveal -> exit

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
          
          {/* Pulsing rings */}
          <div className="preloader-rings">
            <motion.div className="preloader-ring preloader-ring-1" animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.div className="preloader-ring preloader-ring-2" animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0, 0.2] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }} />
            <motion.div className="preloader-ring preloader-ring-3" animate={{ scale: [1, 2.2, 1], opacity: [0.1, 0, 0.1] }} transition={{ duration: 3, repeat: Infinity, delay: 0.6 }} />
          </div>

          <div className="preloader-content">
            {/* Equalizer bars */}
            <div className="preloader-bars">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="preloader-bar"
                  animate={{ height: [4, 25 + Math.random() * 35, 4] }}
                  transition={{ duration: 0.5 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
                />
              ))}
            </div>

            {/* Name with letter-by-letter reveal */}
            <motion.div className="preloader-name-wrapper">
              {'AMOS FRANK'.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className={`preloader-letter ${letter === ' ' ? 'preloader-space' : ''}`}
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
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
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="preloader-particle"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                opacity: 0,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: -50,
                opacity: [0, 0.6, 0],
                rotate: [0, 180 + Math.random() * 180],
                x: `+=${Math.random() * 100 - 50}`,
              }}
              transition={{
                duration: 2.5 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
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
