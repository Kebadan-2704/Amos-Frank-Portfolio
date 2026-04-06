import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaGuitar, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { artistInfo } from '../data/tracks';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
  };

  const textReveal = {
    hidden: { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' },
    visible: { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } },
  };

  return (
    <section id="about" className="about section">
      <div className="container" ref={ref}>
        <motion.div className="section-header" variants={container} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.p className="section-subtitle" variants={item}>Know Me</motion.p>
          <motion.h2 className="section-title" variants={item}>About The <span className="accent">Artist</span></motion.h2>
          <motion.div className="glow-line" variants={item} />
        </motion.div>

        <motion.div className="about-grid" variants={container} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          {/* Image with parallax — uses dedicated about photo */}
          <motion.div className="about-image-col" variants={item}>
            <motion.div className="about-image-container" style={{ y: imageY }}>
              <div className="about-image-frame">
                <img src="/artist-about.png" alt="Amos Frank performing live" className="about-image" />
                <div className="about-image-overlay" />
              </div>
              {/* Experience badge */}
              <motion.div
                className="about-exp-badge"
                whileHover={{ scale: 1.05 }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="about-exp-number">{artistInfo.stats.yearsActive}+</span>
                <span className="about-exp-label">Years of Music</span>
              </motion.div>
              <div className="about-dots-pattern" aria-hidden="true" />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div className="about-content-col" variants={container}>
            <motion.h3 className="about-name" variants={textReveal}>
              I'm <span className="text-accent">Amos Frank</span>
            </motion.h3>
            <motion.p className="about-role" variants={item}><FaGuitar /> Musician & Violinist</motion.p>
            <motion.p className="about-bio" variants={textReveal}>{artistInfo.bio}</motion.p>
            <motion.p className="about-bio" variants={textReveal}>{artistInfo.bioExtended}</motion.p>

            <motion.div className="about-info-grid" variants={container}>
              <motion.div className="about-info-item" variants={item} whileHover={{ x: 6, borderColor: 'rgba(229,9,20,0.2)' }}>
                <FaEnvelope className="about-info-icon" />
                <div>
                  <span className="about-info-label">Email</span>
                  <span className="about-info-value">{artistInfo.contact.email}</span>
                </div>
              </motion.div>
              <motion.div className="about-info-item" variants={item} whileHover={{ x: 6, borderColor: 'rgba(229,9,20,0.2)' }}>
                <FaMapMarkerAlt className="about-info-icon" />
                <div>
                  <span className="about-info-label">Location</span>
                  <span className="about-info-value">{artistInfo.contact.location}</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={item}>
              <Link to="/music" className="btn btn-primary about-cta-btn">
                Explore My Music <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
