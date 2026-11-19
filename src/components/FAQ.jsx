import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { faqs } from '../data/faqs.js';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const toggle = (idx) => {
    setOpenIndex(prev => prev === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="faq section" ref={ref} aria-labelledby="faq-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">Common Questions</p>
          <h2 id="faq-heading" className="section-title">
            Frequently Asked <span className="accent">Questions</span>
          </h2>
          <p className="section-description">
            Everything you need to know about music production, live session bookings, and lessons at Musik Hub.
          </p>
        </div>

        <motion.div
          className="faq-list"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item glass-card ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-btn-${idx}`}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <FaChevronDown className={`faq-chevron ${isOpen ? 'rotated' : ''}`} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                      className="faq-answer-wrapper"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="faq-answer-text">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
