import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCalendarAlt, FaArrowRight, FaSpotify, FaYoutube, FaMusic } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './LatestNews.css';

const newsItems = [
  {
    date: '2026',
    title: 'New Spotify Single — "Tere Saath"',
    description: 'Latest single now streaming on all platforms. A heartfelt worship track produced and performed by Amos Frank.',
    icon: <FaSpotify />,
    type: 'release',
  },
  {
    date: '2025',
    title: 'Arpudhamaana Naamame — Music Video',
    description: 'Official music video with Benny John Joseph, featuring full production and keyboard arrangement by Amos.',
    icon: <FaYoutube />,
    type: 'video',
  },
  {
    date: '2025',
    title: 'Musik Hub — Now Enrolling',
    description: 'Keyboard, Bass Guitar & Music Production classes now open for enrollment. Join the next batch of aspiring musicians.',
    icon: <FaMusic />,
    type: 'announcement',
  },
];

const LatestNews = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
  };

  return (
    <section className="latest-news section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">Updates</p>
          <h2 className="section-title">Latest <span className="accent">News</span></h2>
        </motion.div>

        <motion.div
          className="news-timeline"
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {newsItems.map((news, i) => (
            <motion.div key={i} className="news-item" variants={item}>
              <div className="news-date">
                <FaCalendarAlt />
                <span>{news.date}</span>
              </div>
              <div className="news-card glass-card">
                <div className={`news-icon news-icon-${news.type}`}>
                  {news.icon}
                </div>
                <div className="news-body">
                  <h4 className="news-title">{news.title}</h4>
                  <p className="news-desc">{news.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="news-cta"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Link to="/music" className="btn btn-outline">
            Explore All Music <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestNews;
