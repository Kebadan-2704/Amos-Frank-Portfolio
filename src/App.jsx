import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import AnimatedFavicon from './components/AnimatedFavicon';
import { ThemeProvider } from './context/ThemeContext';
import { useEffect } from 'react';

// Lazy-loaded pages for code splitting with chunk retry mechanism
import { lazyWithRetry } from './utils/lazyWithRetry';

const HomePage = lazyWithRetry(() => import('./pages/HomePage'));
const AboutPage = lazyWithRetry(() => import('./pages/AboutPage'));
const MusicPageRoute = lazyWithRetry(() => import('./pages/MusicPageRoute'));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage'));
const NotFoundPage = lazyWithRetry(() => import('./pages/NotFoundPage'));

const ScrollToTopOnNav = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

// Shimmer skeleton fallback while lazy chunks load (Feature 6)
const PageFallback = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    padding: '40px 24px',
  }}>
    <div style={{
      width: 32, height: 32,
      border: '3px solid rgba(229,9,20,0.2)',
      borderTopColor: '#e50914',
      borderRadius: '50%',
      animation: 'spin-slow 0.6s linear infinite',
    }} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '600px' }}>
      {[200, 400, 300].map((w, i) => (
        <div key={i} className="shimmer-line" style={{
          height: i === 0 ? '24px' : '14px',
          width: `${w}px`,
          maxWidth: '100%',
          borderRadius: '6px',
          background: 'linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-tertiary) 50%, var(--bg-secondary) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite ease-in-out',
        }} />
      ))}
    </div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Suspense fallback={<PageFallback />}><HomePage /></Suspense></motion.div>} />
        <Route path="/about" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Suspense fallback={<PageFallback />}><AboutPage /></Suspense></motion.div>} />
        <Route path="/music" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Suspense fallback={<PageFallback />}><MusicPageRoute /></Suspense></motion.div>} />
        <Route path="/contact" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Suspense fallback={<PageFallback />}><ContactPage /></Suspense></motion.div>} />
        <Route path="*" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Suspense fallback={<PageFallback />}><NotFoundPage /></Suspense></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <ErrorBoundary>
          <AnimatedFavicon />
          <Router>
          <SEO />
          {/* Skip to content link for keyboard/screen-reader users */}
          <a href="#main-content" className="skip-link" style={{
            position: 'absolute', top: '-100%', left: '16px',
            padding: '12px 24px', background: '#e50914', color: '#fff',
            borderRadius: '0 0 8px 8px', zIndex: 10000,
            fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
            transition: 'top 0.2s',
          }} onFocus={(e) => e.target.style.top = '0'} onBlur={(e) => e.target.style.top = '-100%'}>
            Skip to Content
          </a>

          <ScrollToTopOnNav />
          <div style={{ opacity: 1, transition: 'opacity 0.6s ease' }}>
            <CustomCursor />
            <Navbar />
            <main id="main-content">
              <AnimatedRoutes />
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  </ThemeProvider>
  );
}

export default App;
