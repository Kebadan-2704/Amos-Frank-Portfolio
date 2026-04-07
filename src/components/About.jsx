import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaKeyboard, FaArrowRight, FaGuitar, FaPhone, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { artistInfo } from '../data/tracks';
import useIsHoverDevice from '../hooks/useIsHoverDevice';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const isHover = useIsHoverDevice();

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
          {/* Image with parallax & creative overlapping layout */}
          <motion.div className="about-image-col" variants={item}>
            <div className="about-gallery-creative">
              <motion.div className="about-photo-main" style={{ y: imageY }}>
                <div className="about-image-frame">
                  <img src={artistInfo.photos.about} alt="Amos Frank performing live on stage" className="about-image" />
                  <div className="about-image-overlay" />
                </div>
              </motion.div>

              <motion.div 
                className="about-photo-secondary"
                animate={{ y: [-15, 15, -15], rotateZ: [-4, 4, -4] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="about-image-frame about-image-frame-small">
                  <img src={artistInfo.photos.keys} alt="Amos Frank at the keyboard" className="about-image" />
                </div>
              </motion.div>

              {/* Experience badge */}
              <motion.div
                className="about-exp-badge"
                whileHover={{ scale: 1.05 }}
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="about-exp-number">{artistInfo.stats.yearsActive}+</span>
                <span className="about-exp-label">Years of Music</span>
              </motion.div>
            </div>
            <div className="about-dots-pattern" aria-hidden="true" />
          </motion.div>

          {/* Content */}
          <motion.div className="about-content-col" variants={container}>
            <motion.h3 className="about-name" variants={textReveal}>
              I'm <span className="text-accent">Amos Frank</span>
            </motion.h3>
            <motion.p className="about-role" variants={item}>
              {artistInfo.tagline}
            </motion.p>
            <motion.p className="about-bio" variants={textReveal}>{artistInfo.bio}</motion.p>
            <motion.p className="about-bio" variants={textReveal}>{artistInfo.bioExtended}</motion.p>

            {/* Instruments & Skills Removed for formality */}

            <motion.div className="about-info-grid" variants={container}>
              <motion.div className="about-info-item" variants={item} whileHover={isHover ? { x: 6, borderColor: 'rgba(229,9,20,0.2)' } : undefined}>
                <FaEnvelope className="about-info-icon" />
                <div>
                  <span className="about-info-label">Email</span>
                  <span className="about-info-value">{artistInfo.contact.email}</span>
                </div>
              </motion.div>
              <motion.div className="about-info-item" variants={item} whileHover={isHover ? { x: 6, borderColor: 'rgba(229,9,20,0.2)' } : undefined}>
                <FaPhone className="about-info-icon" />
                <div>
                  <span className="about-info-label">Phone</span>
                  <span className="about-info-value">{artistInfo.contact.phone}</span>
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

            <motion.div variants={item} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/music" className="btn btn-primary about-cta-btn">
                Explore My Music <FaArrowRight />
              </Link>
              <a href="/amos-frank-epk.pdf" download className="btn btn-outline about-cta-btn">
                <FaDownload /> Download EPK
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
