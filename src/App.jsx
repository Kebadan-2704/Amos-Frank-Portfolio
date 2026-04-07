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
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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

const AnimatedRoutes = ({ theme }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Suspense fallback={<PageFallback />}><HomePage theme={theme} /></Suspense></motion.div>} />
        <Route path="/about" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Suspense fallback={<PageFallback />}><AboutPage /></Suspense></motion.div>} />
        <Route path="/music" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Suspense fallback={<PageFallback />}><MusicPageRoute /></Suspense></motion.div>} />
        <Route path="/contact" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Suspense fallback={<PageFallback />}><ContactPage /></Suspense></motion.div>} />
        <Route path="*" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Suspense fallback={<PageFallback />}><NotFoundPage /></Suspense></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  // Skip preloader if user has already seen it this session
  const hasSeenPreloader = sessionStorage.getItem('preloader-seen') === 'true';
  const [loading, setLoading] = useState(!hasSeenPreloader);

  // Theme State: Local storage first, then system preference, default to dark
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Listen to system theme changes in real-time
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleChange = (e) => {
      // Only auto-switch if the user hasn't explicitly set a preference in localStorage
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#fffbf5');
    }
  }, [theme]);

  const toggleTheme = () => {
    // Smooth theme transition (Feature 12)
    const root = document.documentElement;
    root.classList.add('theme-transitioning');
    setTimeout(() => root.classList.remove('theme-transitioning'), 600);

    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

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
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
        <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
          <CustomCursor />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main id="main-content">
            <AnimatedRoutes theme={theme} />
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
