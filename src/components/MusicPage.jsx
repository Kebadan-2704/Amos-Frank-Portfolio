import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaPlay, FaTimes, FaYoutube, FaChevronLeft, FaChevronRight, FaMusic, FaCompactDisc, FaSpotify } from 'react-icons/fa';
import { youtubeVideos, spotifyTracks, getThumbnail, featuredVideoId } from '../data/tracks';
import useIsHoverDevice from '../hooks/useIsHoverDevice';
import LazyYouTube from './LazyYouTube';
import './MusicPage.css';

const categories = [
  { key: 'all', label: 'All', icon: <FaMusic /> },
  { key: 'spotify', label: 'Spotify', icon: <FaSpotify /> },
  { key: 'original', label: 'Originals', icon: <FaYoutube /> },
];

const MusicPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [featuredVideo, setFeaturedVideo] = useState(featuredVideoId);
  const [showCount, setShowCount] = useState(9);
  const carouselRef = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isHover = useIsHoverDevice();

  const filteredVideos = activeTab === 'all'
    ? youtubeVideos
    : youtubeVideos.filter(v => v.category === activeTab);

  const visibleVideos = filteredVideos.slice(0, showCount);
  const featured = youtubeVideos.find(v => v.id === featuredVideo) || youtubeVideos[0];

  const scrollCarousel = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
  };

  const closeModal = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  // Keyboard support for modal: Escape to close, focus trap
  useEffect(() => {
    if (!selectedVideo) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
      // Basic focus trap
      if (e.key === 'Tab' && closeButtonRef.current) {
        e.preventDefault();
        closeButtonRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    // Focus the close button when modal opens
    setTimeout(() => closeButtonRef.current?.focus(), 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedVideo, closeModal]);

  return (
    <section className="music-page" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="section-subtitle">Explore</p>
          <h2 className="section-title">My <span className="accent">Music</span></h2>
          <p className="section-description">Dive into the complete collection of tracks, music videos, and collaborations.</p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div className="music-filters" role="tablist" aria-label="Filter music by category" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.5 }}>
          {categories.map(cat => (
            <button
              key={cat.key}
              role="tab"
              aria-selected={activeTab === cat.key}
              className={`music-filter-btn ${activeTab === cat.key ? 'active' : ''}`}
              onClick={() => { setActiveTab(cat.key); setShowCount(9); }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </motion.div>

        {activeTab === 'spotify' ? (
          <motion.div className="music-spotify" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="music-section-label"><FaSpotify /> Spotify Tracks</h3>
            <div className="spotify-grid">
              {spotifyTracks.map((track, i) => (
                <motion.div
                  key={track.id}
                  className="spotify-embed-wrapper"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <iframe 
                    style={{ borderRadius: '12px' }} 
                    src={`https://open.spotify.com/embed/track/${track.id}?theme=0`} 
                    width="100%" 
                    height="152" 
                    frameBorder="0" 
                    allowFullScreen="" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                  ></iframe>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <>
            {/* Featured Video Player */}
            <motion.div className="music-featured" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="featured-player">
                <LazyYouTube
                  key={featuredVideo}
                  videoId={featuredVideo}
                  title={featured?.title || 'Featured Video'}
                  autoplay={false}
                />
              </div>
              <div className="featured-info">
                <h3 className="featured-title">{featured?.title || 'Featured Track'}</h3>
                <p className="featured-artist">{featured?.artist || ''}</p>
              </div>

              {/* Horizontal Carousel */}
              <div className="carousel-wrapper">
                <button className="carousel-nav carousel-prev" onClick={() => scrollCarousel(-1)} aria-label="Previous videos"><FaChevronLeft /></button>
                <div className="carousel-track" ref={carouselRef}>
                  {youtubeVideos.slice(0, 10).map(video => (
                    <div
                      key={video.id}
                      className={`carousel-thumb ${featuredVideo === video.id ? 'active' : ''}`}
                      onClick={() => setFeaturedVideo(video.id)}
                    >
                      <img src={getThumbnail(video.id)} alt={video.title} loading="lazy" />
                      <span className="carousel-thumb-title">{video.title}</span>
                      {featuredVideo === video.id && <div className="carousel-playing-indicator" aria-label="Now playing"><span /><span /><span /></div>}
                    </div>
                  ))}
                </div>
                <button className="carousel-nav carousel-next" onClick={() => scrollCarousel(1)} aria-label="More videos"><FaChevronRight /></button>
              </div>
            </motion.div>

            {/* Video Grid */}
            <>
              <h3 className="music-section-label"><FaYoutube /> Music Videos</h3>
              <motion.div className="music-grid" layout>
                <AnimatePresence mode="popLayout">
                  {visibleVideos.map((video, i) => (
                    <motion.div
                      key={video.id}
                      className="music-card"
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      whileHover={isHover ? { y: -6 } : undefined}
                      onClick={() => setSelectedVideo(video)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Play ${video.title}`}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedVideo(video); } }}
                    >
                      <div className="music-card-thumb">
                        <img src={getThumbnail(video.id)} alt={video.title} loading="lazy" />
                        <div className="music-card-overlay">
                          <FaPlay className="music-card-play" />
                        </div>
                        <div className="music-card-badge" aria-hidden="true"><FaYoutube /></div>
                      </div>
                      <div className="music-card-info">
                        <h4 className="music-card-title">{video.title}</h4>
                        <p className="music-card-artist">{video.artist}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {showCount < filteredVideos.length && (
                <div className="music-load-more">
                  <button className="btn btn-outline" onClick={() => setShowCount(s => s + 9)}>
                    Load More ({filteredVideos.length - showCount} remaining)
                  </button>
                </div>
              )}
            </>
          </>
        )}

        {/* Video Modal with keyboard support */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              className="music-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              role="dialog"
              aria-modal="true"
              aria-label={`Playing ${selectedVideo.title}`}
              ref={modalRef}
            >
              <motion.div
                className="music-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="music-modal-close"
                  onClick={closeModal}
                  ref={closeButtonRef}
                  aria-label="Close video"
                >
                  <FaTimes />
                </button>
                <div className="music-modal-player">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="music-modal-info">
                  <h3>{selectedVideo.title}</h3>
                  <p>{selectedVideo.artist}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MusicPage;
