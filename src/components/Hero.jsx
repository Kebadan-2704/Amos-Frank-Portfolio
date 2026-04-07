import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { loadTextShape } from '@tsparticles/shape-text';
import { TypeAnimation } from 'react-type-animation';
import { FaInstagram, FaPlay, FaChevronDown, FaHeadphones, FaMusic } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { artistInfo } from '../data/tracks';
import './Hero.css';

const Hero = () => {
  const [particlesReady, setParticlesReady] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const imageScale = useTransform(scrollY, [0, 500], [1, 1.15]);

  useEffect(() => {
    initParticlesEngine(async (engine) => { 
      await loadTextShape(engine);
      await loadSlim(engine); 
    }).then(() => setParticlesReady(true));
  }, []);

  // Detect current theme for particle colors
  const isLight = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light';
  const particleColors = isLight
    ? ['#7C3AED', '#EC4899', '#F97316']
    : ['#e50914', '#ff1a1a', '#ff4444'];
  const particleLinkColor = isLight ? '#7C3AED' : '#e50914';
  const particleLinkOpacity = isLight ? 0.15 : 0.1;
  const particleSize = isLight ? { min: 8, max: 18 } : { min: 6, max: 14 };

  const particlesOptions = {
    fullScreen: false,
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      color: { value: particleColors },
      links: { color: particleLinkColor, distance: 140, enable: true, opacity: particleLinkOpacity, width: 1 },
      move: { enable: true, speed: 1.0, direction: 'none', random: true, outModes: { default: 'bounce' } },
      number: { value: 55, density: { enable: true, area: 900 } },
      opacity: { value: { min: 0.15, max: 0.45 } },
      shape: { 
        type: ['char', 'character'], 
        options: {
          character: [
            { value: '♪', font: 'Arial', weight: 'bold' },
            { value: '♫', font: 'Arial', weight: 'bold' },
            { value: '♬', font: 'Arial', weight: 'bold' }
          ],
          char: [
            { value: '♪', font: 'Arial', weight: 'bold' },
            { value: '♫', font: 'Arial', weight: 'bold' },
            { value: '♬', font: 'Arial', weight: 'bold' }
          ]
        }
      },
      size: { value: particleSize },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: 'grab' } },
      modes: { grab: { distance: 160, links: { opacity: 0.3 } } },
    },
    detectRetina: true,
  };

  // Stagger animation for text lines
  const textContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const textLine = {
    hidden: { opacity: 0, y: 60, skewY: 3 },
    visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
  };

  return (
    <section id="home" className="hero">
      {particlesReady && <Particles id="hero-particles" className="hero-particles" options={particlesOptions} />}
      <div className="hero-gradient-overlay" />

      <motion.div className="hero-content container" style={{ y: heroY }}>
        <motion.div className="hero-left" variants={textContainer} initial="hidden" animate="visible">
          <motion.div className="hero-badge" variants={textLine}>
            <span className="badge-dot" />
            <span>Available for Collaborations</span>
          </motion.div>

          <div className="hero-title" aria-label="I am Amos Frank">
            <motion.span className="hero-title-line" variants={textLine}>I'm</motion.span>
            <motion.div className="hero-title-overflow" variants={textLine}>
              <span className="hero-title-name">AMOS</span>
            </motion.div>
            <motion.div className="hero-title-overflow" variants={textLine}>
              <span className="hero-title-name hero-title-accent">FRANK</span>
            </motion.div>
          </div>

          <motion.div className="hero-typed-wrapper" variants={textLine}>
            <span className="hero-typed-label">I'm a </span>
            <TypeAnimation
              sequence={['Music Producer', 2000, 'Performer', 2000, 'Teacher', 2000]}
              wrapper="span" className="hero-typed-text" speed={50} repeat={Infinity}
            />
          </motion.div>

          <motion.p className="hero-description" variants={textLine}>
            Crafting melodies that move souls — spanning keyboards, guitars, and production. Every note tells a story, every beat carries a message.
          </motion.p>

          <motion.div className="hero-buttons" variants={textLine}>
            <Link to="/music" className="btn btn-primary hero-btn"><FaPlay /> Explore Music</Link>
            <Link to="/about" className="btn btn-outline hero-btn"><FaHeadphones /> About Me</Link>
          </motion.div>

          <motion.div className="hero-socials" variants={textLine}>
            <a href={artistInfo.social.instagram} className="hero-social-link" aria-label="Instagram" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href={artistInfo.social.musikHub} className="hero-social-link" aria-label="Musik Hub" target="_blank" rel="noreferrer"><FaMusic /></a>
          </motion.div>
        </motion.div>

        <motion.div className="hero-right" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1, ease: [0.33, 1, 0.68, 1] }}>
          <motion.div className="hero-image-container" style={{ scale: imageScale }}>
            <div className="hero-image-glow" />
            <div className="hero-image-ring hero-ring-1" />
            <div className="hero-image-ring hero-ring-2" />
            <motion.div
              className="hero-image-wrapper"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            >
              <img src={artistInfo.photos.hero} alt="Amos Frank - Keyboardist & Music Producer" className="hero-image" />
            </motion.div>
            {/* Floating music notes */}
            {['♪', '♫', '♬', '🎵', '♪'].map((note, i) => (
              <motion.span
                key={i}
                className="hero-floating-note"
                aria-hidden="true"
                animate={{ y: [-10, -30, -10], x: [0, (i % 2 === 0 ? 10 : -10), 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.6 }}
                style={{
                  position: 'absolute',
                  top: `${20 + i * 15}%`,
                  left: i % 2 === 0 ? '-8%' : '90%',
                  fontSize: '1.2rem',
                  color: 'rgba(255,255,255,0.15)',
                }}
              >
                {note}
              </motion.span>
            ))}
          </motion.div>

          {/* Photo gallery mini-strip */}
          <motion.div
            className="hero-photo-strip"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="hero-strip-item">
              <img src={artistInfo.photos.keys} alt="Amos on keys" loading="lazy" />
            </div>
            <div className="hero-strip-item">
              <img src={artistInfo.photos.bass} alt="Amos on bass" loading="lazy" />
            </div>
            <div className="hero-strip-item">
              <img src={artistInfo.photos.about} alt="Amos on stage" loading="lazy" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
