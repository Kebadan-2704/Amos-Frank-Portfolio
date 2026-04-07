import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useIsHoverDevice from '../hooks/useIsHoverDevice';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Zac Robert',
    role: 'Worship Leader & Artist',
    text: 'Amos is the kind of musician who lifts every song to the next level. His keyboard work and production on our tracks was nothing short of incredible.',
    stars: 5,
  },
  {
    name: 'Merlyn Salvadi',
    role: 'Independent Artist',
    text: 'Working with Amos on MASIHA and BHAAGO was a game-changer. He understood the vision instantly and brought creative brilliance to every session.',
    stars: 5,
  },
  {
    name: 'Musik Hub Student',
    role: 'Keyboard Student',
    text: 'I learned more in 3 months with Amos than in years of self-learning. His patience and structured approach made music theory actually fun.',
    stars: 5,
  },
  {
    name: 'Freddy John Samuel',
    role: 'Gospel Artist',
    text: 'Amos\'s production on Melana Naamame and ELSHADDAI was top-tier. He combines technical skill with genuine musical emotion.',
    stars: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isHover = useIsHoverDevice();

  // Auto-rotate every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[current];

  return (
    <section className="testimonials section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">Voices</p>
          <h2 className="section-title">What People <span className="accent">Say</span></h2>
        </motion.div>

        <motion.div
          className="testimonials-card glass-card"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <FaQuoteLeft className="testimonials-quote-icon" aria-hidden="true" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="testimonials-content"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              <p className="testimonials-text">"{t.text}"</p>
              <div className="testimonials-stars" aria-label={`${t.stars} stars`}>
                {[...Array(t.stars)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <h4 className="testimonials-name">{t.name}</h4>
              <p className="testimonials-role">{t.role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="testimonials-nav">
            <button onClick={prev} aria-label="Previous testimonial" className="testimonials-nav-btn">
              <FaChevronLeft />
            </button>
            <div className="testimonials-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials-dot ${i === current ? 'active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next testimonial" className="testimonials-nav-btn">
              <FaChevronRight />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
