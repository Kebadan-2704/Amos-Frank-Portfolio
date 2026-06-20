import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMusic, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { usePortfolioData } from '../context/DataContext';
import { artistInfo as staticArtistInfo } from '../data/tracks';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { artistInfo: firestoreArtist } = usePortfolioData();
  const artistInfo = firestoreArtist || staticArtistInfo;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close mobile menu on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && mobileOpen) {
      setMobileOpen(false);
    }
  }, [mobileOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/music', label: 'Music' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" aria-label={`${artistInfo.name} - Home`}>
          <div className="navbar-logo-circle">
            <img src={artistInfo.photos.hero} alt={artistInfo.name} className="navbar-logo-face" />
          </div>
          <span className="logo-text-reveal">{(artistInfo.name.split(' ')[0] || '').toUpperCase()} <span className="logo-accent">{(artistInfo.name.split(' ').slice(1).join(' ')).toUpperCase()}</span></span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`} role="menubar">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
              role="menuitem"
              tabIndex={mobileOpen ? 0 : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-right">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          <div className="navbar-music-bars" aria-hidden="true">
            <span /><span /><span />
          </div>
          <button
            className="navbar-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
