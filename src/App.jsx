import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import AnimatedFavicon from './components/AnimatedFavicon';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const MusicPageRoute = lazy(() => import('./pages/MusicPageRoute'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const ScrollToTopOnNav = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

// Minimal fallback while lazy chunks load
const PageFallback = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{
      width: 32, height: 32,
      border: '3px solid rgba(229,9,20,0.2)',
      borderTopColor: '#e50914',
      borderRadius: '50%',
      animation: 'spin-slow 0.6s linear infinite',
    }} />
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
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  // Skip preloader if user has already seen it this session
  const hasSeenPreloader = sessionStorage.getItem('preloader-seen') === 'true';
  const [loading, setLoading] = useState(!hasSeenPreloader);

  const handlePreloaderComplete = () => {
    setLoading(false);
    sessionStorage.setItem('preloader-seen', 'true');
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (loading) document.body.style.overflow = 'hidden';
  }, [loading]);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <SEO />
        <AnimatedFavicon />
        <Router>
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
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
        <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
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
  );
}

export default App;
