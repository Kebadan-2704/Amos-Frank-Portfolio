import { useState, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import { DataProvider } from './context/DataContext';

import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

const ScrollToTopOnNav = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><HomePage /></motion.div>} />
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/music" element={<Navigate to="/#music" replace />} />
        <Route path="/contact" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><ContactPage /></motion.div>} />
        <Route path="*" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><NotFoundPage /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
};

function App({ isSSR = false, RouterComponent = Router, routerProps = {}, helmetContext = {} }) {
  const [showPreloader, setShowPreloader] = useState(!isSSR);

  return (
    <ThemeProvider>
      <HelmetProvider context={helmetContext}>
        <DataProvider>
          <ErrorBoundary>
            <AnimatedFavicon />
            {!isSSR && showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
            <RouterComponent {...routerProps}>
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
            </RouterComponent>
          </ErrorBoundary>
        </DataProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
