import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaMusic } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="page-wrapper" style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 24px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      >
        {/* Animated music note */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '4rem', marginBottom: '16px' }}
        >
          🎵
        </motion.div>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(5rem, 15vw, 10rem)',
          fontWeight: 900,
          background: 'var(--accent-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          marginBottom: '8px',
        }}>
          404
        </h1>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '12px',
        }}>
          Wrong Note!
        </h2>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          maxWidth: '400px',
          margin: '0 auto 32px',
          lineHeight: 1.7,
        }}>
          Looks like this page doesn't exist in our setlist. Let's get you back to the music.
        </p>

        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary" style={{ padding: '14px 32px' }}>
            <FaHome /> Go Home
          </Link>
          <Link to="/music" className="btn btn-outline" style={{ padding: '14px 32px' }}>
            <FaMusic /> Explore Music
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
