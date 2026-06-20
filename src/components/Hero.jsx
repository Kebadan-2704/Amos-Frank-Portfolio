import { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { loadTextShape } from '@tsparticles/shape-text';
import { TypeAnimation } from 'react-type-animation';
import { FaInstagram, FaPlay, FaHeadphones, FaMusic, FaSpotify } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { artistInfo as staticArtistInfo, spotifyTracks as staticSpotify } from '../data/tracks';
import { usePortfolioData } from '../context/DataContext';
import useIsHoverDevice from '../hooks/useIsHoverDevice';
import { useTheme } from '../context/ThemeContext';
import './Hero.css';

const Hero = () => {
  const { theme } = useTheme();
  const { artistInfo: firestoreArtist, spotifyTracks: firestoreSpotify } = usePortfolioData();
  const artistInfo = firestoreArtist || staticArtistInfo;
  const spotifyTracks = firestoreSpotify || staticSpotify;
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
    const size = isLight ? { min: 2, max: 4 } : { min: 2, max: 4 };

    return {
      fullScreen: false,
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        color: { value: colors },
        links: { color: linkColor, distance: 140, enable: true, opacity: linkOpacity, width: 1 },
        move: { enable: true, speed: 1.0, direction: 'none', random: true, outModes: { default: 'bounce' } },
        number: { value: 25, density: { enable: true, area: 900 } },
        opacity: { value: { min: 0.15, max: 0.45 } },
        shape: { type: 'circle' },
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

  // Delay iframe rendering to prevent Chromium GPU compositor crash during parent page transitions
  const [showIframe, setShowIframe] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowIframe(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="hero">
      {/* Key on theme forces particles to reinit with correct colors (Bug 1 fix) */}
      {particlesReady && <Particles key={theme} id="hero-particles" className="hero-particles" options={particlesOptions} />}
      <div className="hero-gradient-overlay" />

      <div className="hero-content container">
        <motion.div className="hero-left" variants={textContainer} initial="hidden" animate="visible" style={{ y: heroY }}>


          <div className="hero-title" aria-label={`I am ${artistInfo.name}`}>
            <motion.span className="hero-title-line" variants={textLine}>I AM</motion.span>
            <motion.div className="hero-title-overflow" variants={textLine}>
              <span className="hero-title-name">{(artistInfo.name.split(' ')[0] || '').toUpperCase()}</span>
            </motion.div>
            {artistInfo.name.split(' ').length > 1 && (
              <motion.div className="hero-title-overflow" variants={textLine}>
                <span className="hero-title-name hero-title-accent">{(artistInfo.name.split(' ').slice(1).join(' ')).toUpperCase()}</span>
              </motion.div>
            )}
          </div>

          <motion.div className="hero-typed-wrapper" variants={textLine}>
            <span className="hero-typed-label">I'm a </span>
            <TypeAnimation
              key={artistInfo.roles.join(',')}
              sequence={artistInfo.roles.flatMap(role => [role, 2000])}
              wrapper="span" className="hero-typed-text" speed={50} repeat={Infinity}
            />
          </motion.div>



          <motion.div className="hero-buttons" variants={textLine}>
            <Link to="/music" className="btn btn-primary hero-btn"><FaPlay /> Explore Music</Link>
            <Link to="/about" className="btn btn-outline hero-btn"><FaHeadphones /> About Me</Link>
          </motion.div>

          <motion.div className="hero-socials" variants={textLine}>
            <a href={artistInfo.social.instagram} className="hero-social-link" aria-label="Instagram" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href={artistInfo.social.musikHub} className="hero-social-link" aria-label="Musik Hub" target="_blank" rel="noreferrer"><FaMusic /></a>
          </motion.div>
        </motion.div>

        <div className="hero-right">
          <motion.div 
            className="hero-image-container" 
            style={{ y: heroY, scale: imageScale }}
            initial={{ opacity: 0, scale: 0.85 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.5, duration: 1, ease: [0.33, 1, 0.68, 1] }}
          >
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

          {/* Spotify swipeable carousel - STRICT RENDERER CRASH PROTECTION */}
          <div className="hero-spotify-strip">
            {spotifyTracks.slice(0, 3).map((track, idx) => (
              <div className="hero-spotify-item" key={idx} style={{ minHeight: '80px', background: 'var(--bg-card)' }}>
                {showIframe ? (
                  <a
                    href={`https://open.spotify.com/track/${track.id}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ width: '100%', height: '80px', borderRadius: '12px', display: 'flex', alignItems: 'center', padding: '0 16px', textDecoration: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', gap: '14px', transition: 'all 0.3s ease' }}
                    className="custom-spotify-card"
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '6px', background: 'linear-gradient(135deg, #1db954, #121212)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FaSpotify style={{ color: 'white', fontSize: '24px' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
                      <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{artistInfo.name} • Spotify</span>
                    </div>
                    <div style={{ padding: '6px 14px', borderRadius: '50px', background: 'transparent', border: '1px solid #1db954', color: '#1db954', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0 }}>
                      PLAY
                    </div>
                  </a>
                ) : (
                  <div style={{ width: 32, height: 32, border: '3px solid rgba(229,9,20,0.2)', borderTopColor: '#e50914', borderRadius: '50%', animation: 'spin-slow 0.6s linear infinite', margin: '24px auto' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
