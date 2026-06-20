import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { getThumbnail } from '../data/tracks';
import './LazyYouTube.css';

/**
 * LazyYouTube — Shows a thumbnail + play button.
 * Only loads the actual YouTube iframe when the user clicks play.
 * Saves ~1MB of JS per iframe, cutting Music page load by 3-5s.
 */
const LazyYouTube = ({ videoId, title, autoplay = false }) => {
  const [loaded, setLoaded] = useState(autoplay);

  if (loaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: 0, width: '100%', height: '100%' }}
      />
    );
  }

  return (
    <button
      className="lazy-youtube"
      onClick={() => setLoaded(true)}
      aria-label={`Play ${title}`}
    >
      <img
        src={getThumbnail(videoId, 'maxresdefault')}
        alt={title}
        className="lazy-youtube-thumb"
        loading="lazy"
        onLoad={(e) => {
          // YouTube returns a 120x90 3-dots placeholder (with a 200 OK) if maxresdefault doesn't exist
          if (e.target.naturalWidth <= 120 && e.target.src.includes('maxresdefault')) {
            e.target.src = getThumbnail(videoId, 'hqdefault');
          }
        }}
        onError={(e) => { 
          if (e.target.src.includes('maxresdefault')) {
            e.target.src = getThumbnail(videoId, 'hqdefault'); 
          }
        }}
      />
      <div className="lazy-youtube-overlay">
        <div className="lazy-youtube-play">
          <FaPlay />
        </div>
      </div>
    </button>
  );
};

export default LazyYouTube;
