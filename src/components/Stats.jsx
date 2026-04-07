import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaMusic, FaVideo, FaCalendarAlt, FaGuitar } from 'react-icons/fa';
import { artistInfo } from '../data/tracks';
import useIsHoverDevice from '../hooks/useIsHoverDevice';
import './Stats.css';

const statsData = [
  { iconType: 'music', end: artistInfo.stats.tracks, suffix: '+', label: 'Original Tracks', colorVar: '--stat-color-1' },
  { iconType: 'video', end: artistInfo.stats.videos, suffix: '+', label: 'Music Videos', colorVar: '--stat-color-2' },
  { iconType: 'guitar', end: artistInfo.stats.yearsPerforming, suffix: '+', label: 'Years Performing', colorVar: '--stat-color-3' },
  { iconType: 'calendar', end: artistInfo.stats.yearsActive, suffix: '+', label: 'Years in Music', colorVar: '--stat-color-4' },
];

const getIcon = (type) => {
  switch (type) {
    case 'music': return <FaMusic />;
    case 'video': return <FaVideo />;
    case 'guitar': return <FaGuitar />;
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
  const isHover = useIsHoverDevice();

  return (
    <motion.div
      ref={itemRef}
      className="stats-item"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      whileHover={isHover ? { y: -8, scale: 1.04 } : undefined}
      style={{ '--stat-color': `var(${stat.colorVar})` }}
    >
      <div className="stats-item-top-bar" style={{ background: `linear-gradient(90deg, var(${stat.colorVar}), var(${stat.colorVar})88)` }} />
      <div className="stats-icon-wrapper">
        <motion.div
          className="stats-icon"
          whileHover={isHover ? { rotate: 360, scale: 1.1 } : undefined}
          transition={{ duration: 0.6 }}
          style={{ background: `color-mix(in srgb, var(${stat.colorVar}) 8%, transparent)`, color: `var(${stat.colorVar})` }}
        >
          {getIcon(stat.iconType)}
        </motion.div>
        <div className="stats-icon-glow" style={{ background: `color-mix(in srgb, var(${stat.colorVar}) 5%, transparent)` }} aria-hidden="true" />
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
