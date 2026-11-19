import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaMusic, FaWhatsapp } from 'react-icons/fa';
import { artistInfo as staticArtistInfo } from '../data/tracks';
import { usePortfolioData } from '../context/DataContext';
import useIsHoverDevice from '../hooks/useIsHoverDevice';
import './ContactInfo.css';

const ContactInfo = () => {
  const { artistInfo: firestoreArtist } = usePortfolioData();
  const artistInfo = firestoreArtist || staticArtistInfo;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const isHover = useIsHoverDevice();

  const whatsappNumber = artistInfo.contact.phone.replace(/[^0-9]/g, '');

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } },
  };

  const contactItems = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: artistInfo.contact.email,
      href: `mailto:${artistInfo.contact.email}`,
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: artistInfo.contact.phone,
      href: `tel:${artistInfo.contact.phone.replace(/[^0-9+]/g, '')}`,
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: artistInfo.contact.location,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(artistInfo.contact.location)}`,
      external: true,
    },
  ];

  const socialLinks = [
    { icon: FaInstagram, href: artistInfo.social.instagram, label: 'Instagram', className: 'instagram', rel: 'me noopener noreferrer' },
    { icon: FaMusic, href: artistInfo.social.musikHub, label: 'Musik Hub', className: 'musik-hub', rel: 'me noopener noreferrer' },
    { icon: FaWhatsapp, href: `https://wa.me/${whatsappNumber}`, label: 'WhatsApp', className: 'whatsapp', rel: 'noopener noreferrer' },
  ];

  return (
    <section className="contact-info section" ref={ref} aria-labelledby="contact-info-heading">
      <div className="container">
        <h2 id="contact-info-heading" className="sr-only">Contact Amos Frank &amp; Social Links</h2>
        <motion.div
          className="contact-info-strip glass-card"
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="contact-info-items-row">
            {contactItems.map((ci) => (
              <motion.a
                key={ci.label}
                href={ci.href}
                target={ci.external ? '_blank' : undefined}
                rel={ci.external ? 'noopener noreferrer' : undefined}
                className="contact-info-chip"
                variants={item}
                whileHover={isHover ? { y: -4, borderColor: 'var(--accent-subtle-border)' } : undefined}
                aria-label={`${ci.label}: ${ci.value}`}
              >
                <div className="contact-info-chip-icon"><ci.icon /></div>
                <div className="contact-info-chip-text">
                  <span className="contact-info-chip-label">{ci.label}</span>
                  <span className="contact-info-chip-value">{ci.value}</span>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div className="contact-info-socials" variants={item}>
            {socialLinks.map((sl) => (
              <motion.a
                key={sl.label}
                href={sl.href}
                target="_blank"
                rel={sl.rel}
                className={`contact-info-social ${sl.className}`}
                aria-label={sl.label}
                whileHover={isHover ? { y: -4, scale: 1.1 } : undefined}
                whileTap={{ scale: 0.9 }}
              >
                <sl.icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;
