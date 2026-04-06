import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaMusic, FaVideo, FaCalendarAlt } from 'react-icons/fa';
import { SiSpotify } from 'react-icons/si';
import { artistInfo } from '../data/tracks';
import './Stats.css';

const statsData = [
  { iconType: 'music', end: artistInfo.stats.tracks, suffix: '+', label: 'Original Tracks', color: '#e50914' },
  { iconType: 'video', end: artistInfo.stats.videos, suffix: '+', label: 'Music Videos', color: '#ff4444' },
  { iconType: 'spotify', end: artistInfo.stats.spotifyTracks, suffix: '', label: 'Spotify Releases', color: '#1db954' },
  { iconType: 'calendar', end: artistInfo.stats.yearsActive, suffix: '+', label: 'Years Active', color: '#ff6b6b' },
];

const getIcon = (type) => {
  switch (type) {
    case 'music': return <FaMusic />;
    case 'video': return <FaVideo />;
    case 'spotify': return <SiSpotify />;
    case 'calendar': return <FaCalendarAlt />;
    default: return <FaMusic />;
  }
};

const AnimatedNumber = ({ end, suffix, duration = 2000, inView }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span>{count}{suffix}</span>;
};

const StatItem = ({ stat, index }) => {
  const itemRef = useRef(null);
  const inView = useInView(itemRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={itemRef}
      className="stats-item"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      whileHover={{ y: -8, scale: 1.04 }}
    >
      {/* Animated top border on hover */}
      <motion.div className="stats-item-top-bar" style={{ background: `linear-gradient(90deg, ${stat.color}, ${stat.color}88)` }} />
      <div className="stats-icon-wrapper">
        <motion.div
          className="stats-icon"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          style={{ background: `${stat.color}15`, color: stat.color }}
        >
          {getIcon(stat.iconType)}
        </motion.div>
        <div className="stats-icon-glow" style={{ background: `${stat.color}08` }} aria-hidden="true" />
      </div>
      <div className="stats-number">
        <AnimatedNumber end={stat.end} suffix={stat.suffix} inView={inView} />
      </div>
      <p className="stats-label">{stat.label}</p>
    </motion.div>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="stats section" ref={ref}>
      <div className="stats-bg-effect" aria-hidden="true" />
      {/* Animated line */}
      <motion.div
        className="stats-line-decoration"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
        aria-hidden="true"
      />
      <div className="container">
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          {statsData.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
