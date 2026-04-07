import { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { loadTextShape } from '@tsparticles/shape-text';
import { TypeAnimation } from 'react-type-animation';
import { FaInstagram, FaPlay, FaChevronDown, FaHeadphones, FaMusic } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { artistInfo, spotifyTracks } from '../data/tracks';
import useIsHoverDevice from '../hooks/useIsHoverDevice';
import './Hero.css';

const Hero = ({ theme }) => {
  const [particlesReady, setParticlesReady] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const imageScale = useTransform(scrollY, [0, 500], [1, 1.15]);
  const isHover = useIsHoverDevice();

  useEffect(() => {
    initParticlesEngine(async (engine) => { 
      await loadTextShape(engine);
      await loadSlim(engine); 
    }).then(() => setParticlesReady(true));
  }, []);

  // Theme-aware particle options, recalculated when theme changes
  const isLight = theme === 'light';
  const particlesOptions = useMemo(() => {
    const colors = isLight
      ? ['#7C3AED', '#EC4899', '#F97316']
      : ['#e50914', '#ff1a1a', '#ff4444'];
    const linkColor = isLight ? '#7C3AED' : '#e50914';
    const linkOpacity = isLight ? 0.15 : 0.1;
    const size = isLight ? { min: 8, max: 18 } : { min: 6, max: 14 };

    return {
      fullScreen: false,
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        color: { value: colors },
        links: { color: linkColor, distance: 140, enable: true, opacity: linkOpacity, width: 1 },
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
        size: { value: size },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: 'grab' } },
        modes: { grab: { distance: 160, links: { opacity: 0.3 } } },
      },
      detectRetina: true,
    };
  }, [isLight]);

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
      {/* Key on theme forces particles to reinit with correct colors (Bug 1 fix) */}
      {particlesReady && <Particles key={theme} id="hero-particles" className="hero-particles" options={particlesOptions} />}
      <div className="hero-gradient-overlay" />

      <motion.div className="hero-content container" style={{ y: heroY }}>
        <motion.div className="hero-left" variants={textContainer} initial="hidden" animate="visible">
          <motion.div className="hero-badge" variants={textLine}>
            <span className="badge-dot" />
            <span>Available for Collaborations</span>
            <div className="hero-badge-eq" aria-hidden="true">
              {[10, 14, 8, 12, 6].map((h, i) => (
                <div key={i} className="hero-badge-eq-bar" style={{ '--eq-h': `${h}px`, '--eq-dur': `${0.4 + i * 0.1}s`, '--eq-delay': `${i * 0.08}s` }} />
              ))}
            </div>
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
              whileHover={isHover ? { scale: 1.03 } : undefined}
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

          {/* Spotify swipeable carousel */}
          <motion.div
            className="hero-spotify-strip"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {spotifyTracks.slice(0, 3).map((track, idx) => (
              <div className="hero-spotify-item" key={idx}>
                <iframe 
                  src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`} 
                  width="100%" 
                  height="80" 
                  frameBorder="0" 
                  allowFullScreen="" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="spotify-iframe"
                  title={track.title}
                ></iframe>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
