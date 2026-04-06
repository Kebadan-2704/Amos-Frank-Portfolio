import { useState, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaCommentDots, FaPaperPlane, FaMapMarkerAlt, FaYoutube, FaSpotify, FaInstagram, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { artistInfo } from '../data/tracks';
import './Contact.css';

// Web3Forms — Free, no signup. Get your key at https://web3forms.com (just enter your email)
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      return;
    }

    try {
      if (WEB3FORMS_KEY) {
        // Web3Forms — just a simple POST request, that's it!
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            subject: `Portfolio Contact from ${formData.name}`,
            from_name: 'Amos Frank Portfolio',
          }),
        });

        const result = await response.json();
        if (result.success) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', phone: '', message: '' });
        } else {
          setSubmitStatus('error');
        }
      } else {
        // Fallback: open mailto when Web3Forms key isn't set
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
        );
        window.open(`mailto:${artistInfo.contact.email}?subject=${subject}&body=${body}`, '_self');
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }

      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } },
  };

  const infoItems = [
    { icon: FaEnvelope, label: 'Email', value: artistInfo.contact.email },
    { icon: FaPhone, label: 'Phone', value: artistInfo.contact.phone },
    { icon: FaMapMarkerAlt, label: 'Location', value: artistInfo.contact.location },
  ];

  return (
    <section id="contact" className="contact section">
      {/* Background decoration */}
      <div className="contact-bg-glow" />
      <div className="contact-grid-lines" aria-hidden="true" />

      <div className="container" ref={ref}>
        <motion.div className="section-header" variants={container} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <motion.p className="section-subtitle" variants={item}>Get In Touch</motion.p>
          <motion.h2 className="section-title" variants={item}>Contact <span className="accent">Me</span></motion.h2>
          <motion.p className="section-description" variants={item}>
            Have a collaboration idea, booking inquiry, or just want to say hello? Drop a message!
          </motion.p>
        </motion.div>

        <motion.div className="contact-grid" variants={container} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          {/* Left - Info */}
          <motion.div className="contact-info" variants={item}>
            <h3 className="contact-info-title">Let's Create <span className="text-accent">Together</span></h3>
            <p className="contact-info-desc">
              Whether it's a collaboration, live performance, or any musical project — I'm all ears. Let's make something extraordinary.
            </p>

            <div className="contact-info-items">
              {infoItems.map((info, index) => (
                <motion.div
                  key={index}
                  className="contact-info-item"
                  variants={item}
                  whileHover={{ x: 6, borderColor: 'rgba(229,9,20,0.15)' }}
                >
                  <div className="contact-info-icon"><info.icon /></div>
                  <div>
                    <span className="contact-info-label">{info.label}</span>
                    <span className="contact-info-value">{info.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="contact-socials">
              <motion.a href={artistInfo.social.youtube} className="contact-social-link youtube" target="_blank" rel="noreferrer" aria-label="YouTube" whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}><FaYoutube /></motion.a>
              <motion.a href={artistInfo.social.spotify} className="contact-social-link spotify" target="_blank" rel="noreferrer" aria-label="Spotify" whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}><FaSpotify /></motion.a>
              <motion.a href={artistInfo.social.instagram} className="contact-social-link instagram" target="_blank" rel="noreferrer" aria-label="Instagram" whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}><FaInstagram /></motion.a>
            </div>

            {/* Music waveform decoration */}
            <div className="contact-waveform" aria-hidden="true">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="contact-wave-bar"
                  animate={{ height: [3, 8 + Math.random() * 18, 3] }}
                  transition={{ duration: 0.8 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.05 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.form className="contact-form glass-card" variants={item} onSubmit={handleSubmit}>
            {/* Decorative corner accents */}
            <div className="form-corner form-corner-tl" aria-hidden="true" />
            <div className="form-corner form-corner-br" aria-hidden="true" />

            {[
              { icon: FaUser, name: 'name', type: 'text', placeholder: 'Your Name', required: true },
              { icon: FaEnvelope, name: 'email', type: 'email', placeholder: 'Your Email', required: true },
              { icon: FaPhone, name: 'phone', type: 'tel', placeholder: 'Phone Number' },
            ].map(field => (
              <div key={field.name} className="contact-form-group">
                <field.icon className="contact-form-icon" />
                <input
                  type={field.type} name={field.name} placeholder={field.placeholder}
                  value={formData[field.name]} onChange={handleChange}
                  required={field.required} id={`contact-${field.name}`}
                  aria-label={field.placeholder}
                />
                <div className="input-focus-bar" />
              </div>
            ))}

            <div className="contact-form-group">
              <FaCommentDots className="contact-form-icon textarea-icon" />
              <textarea
                name="message" placeholder="Your Message"
                value={formData.message} onChange={handleChange}
                required rows={5} id="contact-message"
                aria-label="Your Message"
              />
              <div className="input-focus-bar" />
            </div>

            <motion.button
              type="submit" className="btn btn-primary contact-submit-btn"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01, boxShadow: '0 12px 35px rgba(229,9,20,0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className="contact-spinner" />
              ) : submitStatus === 'success' ? (
                <><FaCheckCircle /> Message Sent!</>
              ) : submitStatus === 'error' ? (
                <><FaExclamationTriangle /> Failed — Try Again</>
              ) : (
                <><FaPaperPlane /> Send Message</>
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
