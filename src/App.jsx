import { useState, Suspense, useEffect } from 'react';
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
import Preloader from './components/Preloader';
import { ThemeProvider } from './context/ThemeContext';

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

// Shimmer skeleton fallback while lazy chunks load
const PageFallback = () => (
  <div className="page-fallback">
    <div className="page-fallback-spinner" />
    <div className="page-fallback-lines">
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
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
      <HelmetProvider>
        <ErrorBoundary>
          <AnimatedFavicon />
          {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
          {loaded && (
            <Router>
            <SEO />
            {/* Skip to content link for keyboard/screen-reader users */}
            <a href="#main-content" className="skip-link"
              onFocus={(e) => e.target.style.top = '0'}
              onBlur={(e) => e.target.style.top = '-100%'}
            >
              Skip to Content
            </a>

            <ScrollToTopOnNav />
            <div className="app-wrapper">
              <CustomCursor />
              <Navbar />
              <main id="main-content">
                <AnimatedRoutes />
              </main>
              <Footer />
              <ScrollToTop />
            </div>
          </Router>
          )}
        </ErrorBoundary>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
