import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGraduationCap, FaMusic, FaCompactDisc, FaMicrophoneAlt } from 'react-icons/fa';
import './HomeBio.css';

const HomeBio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="bio" className="home-bio section" ref={ref} aria-labelledby="bio-heading">
      <div className="container">
        <motion.div
          className="home-bio-card glass-card"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="home-bio-header">
            <span className="section-subtitle">Musician & Educator</span>
            <h2 id="bio-heading" className="section-title">
              About <span className="accent">Amos Frank</span>
            </h2>
          </div>

          <div className="home-bio-content">
            <p className="home-bio-lead">
              Amos Frank is a versatile keyboardist, bass guitarist, music producer, and educator based in Coimbatore, Tamil Nadu, India. With more than 20 years of musical journey and over 11 years of professional stage and studio experience, his artistry bridges rich harmonic groove, gospel roots, and modern sound engineering.
            </p>
            <p className="home-bio-body">
              Specializing in keyboard arrangement, bass performance, and contemporary production, Amos works across genres including worship, contemporary gospel, indie pop, and Bollywood fusion. Over the years, he has produced and performed alongside notable artists such as Benny John Joseph, Zac Robert, Merlyn Salvadi, Messiah Dasan, Freddy John Samuel, and The Non Violinist Project.
            </p>
            <p className="home-bio-body">
              Through his Coimbatore music academy, <strong>Musik Hub</strong>, Amos mentors aspiring instrumentalists in keyboard, bass guitar, and music production, helping develop the next generation of expressive, confident musicians.
            </p>
          </div>

          <div className="home-bio-highlights">
            <div className="bio-highlight-item">
              <FaMusic className="bio-highlight-icon" aria-hidden="true" />
              <div>
                <span className="bio-highlight-title">20+ Years</span>
                <span className="bio-highlight-desc">Musical Experience</span>
              </div>
            </div>
            <div className="bio-highlight-item">
              <FaMicrophoneAlt className="bio-highlight-icon" aria-hidden="true" />
              <div>
                <span className="bio-highlight-title">11+ Years</span>
                <span className="bio-highlight-desc">Professional Performer</span>
              </div>
            </div>
            <div className="bio-highlight-item">
              <FaCompactDisc className="bio-highlight-icon" aria-hidden="true" />
              <div>
                <span className="bio-highlight-title">29+ Tracks</span>
                <span className="bio-highlight-desc">Arranged & Produced</span>
              </div>
            </div>
            <div className="bio-highlight-item">
              <FaGraduationCap className="bio-highlight-icon" aria-hidden="true" />
              <div>
                <span className="bio-highlight-title">Musik Hub</span>
                <span className="bio-highlight-desc">Coimbatore Music Academy</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeBio;
