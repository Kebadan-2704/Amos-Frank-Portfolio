import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FaHeart, FaInstagram, FaMusic, FaKeyboard } from 'react-icons/fa';
import { artistInfo } from '../data/tracks';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Music', path: '/music' },
    { label: 'Contact', path: '/contact' },
  ];

  const externalLinks = [
    { label: 'Instagram', href: artistInfo.social.instagram },
    { label: 'Musik Hub (Classes)', href: artistInfo.social.musikHub },
  ];

  return (
    <footer className="footer" ref={ref}>
      <div className="footer-glow" aria-hidden="true" />
      <div className="container">
        <motion.div className="footer-grid" variants={container} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.div className="footer-brand" variants={item}>
            <div className="footer-logo">
              <div aria-hidden="true" />
              <div>
                <span className="footer-logo-name">AMOS <span className="text-accent">FRANK</span></span>
                <span className="footer-logo-tagline">The Music Experience</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Thank you for visiting. Connect with me on social media and stay
              tuned for the latest releases and performances.
            </p>
            <div className="footer-socials">
              <motion.a href={artistInfo.social.instagram} className="footer-social" aria-label="Instagram" target="_blank" rel="noreferrer" whileHover={{ y: -4, scale: 1.1 }}><FaInstagram /></motion.a>
              <motion.a href={artistInfo.social.musikHub} className="footer-social" aria-label="Musik Hub" target="_blank" rel="noreferrer" whileHover={{ y: -4, scale: 1.1 }}><FaMusic /></motion.a>
            </div>
          </motion.div>

          <motion.div className="footer-links-col" variants={item}>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-quick-links">
              {quickLinks.map(link => (
                <li key={link.path}><Link to={link.path}>{link.label}</Link></li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="footer-contact-col" variants={item}>
            <h4 className="footer-col-title">Contact Info</h4>
            <div className="footer-contact-items">
              <p><a href={`mailto:${artistInfo.contact.email}`}>{artistInfo.contact.email}</a></p>
              <p><a href={`tel:${artistInfo.contact.phone.replace(/[^0-9+]/g, '')}`}>{artistInfo.contact.phone}</a></p>
              <p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(artistInfo.contact.location)}`} target="_blank" rel="noreferrer">{artistInfo.contact.location}</a></p>
            </div>
            <h4 className="footer-col-title" style={{ marginTop: '20px' }}>Follow & Learn</h4>
            <ul className="footer-quick-links">
              {externalLinks.map(link => (
                <li key={link.label}><a href={link.href} target="_blank" rel="noreferrer">{link.label}</a></li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div className="footer-bottom" variants={item} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <p>© {year} Amos Frank. Made with <motion.span aria-label="love" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}><FaHeart className="footer-heart" /></motion.span> All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
