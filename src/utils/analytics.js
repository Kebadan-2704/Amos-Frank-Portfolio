/**
 * Lightweight Privacy-Friendly Analytics Event Tracker
 * Dispatches to window.gtag / window.dataLayer if present, with console fallback in development.
 */

export const trackEvent = (eventName, params = {}) => {
  if (typeof window === 'undefined') return;

  const eventData = {
    ...params,
    timestamp: new Date().toISOString(),
  };

  // Google Analytics 4 (gtag)
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventData);
  }

  // Google Tag Manager (dataLayer)
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }

  // Dispatch custom event for extensible listeners
  try {
    const customEvent = new CustomEvent('portfolio_analytics', {
      detail: { event: eventName, ...eventData },
    });
    window.dispatchEvent(customEvent);
  } catch (e) {
    // Ignore in non-browser or older environments
  }

  if (import.meta.env?.DEV) {
    console.log(`[Analytics] ${eventName}:`, eventData);
  }
};

export const analytics = {
  // Navigation / CTA
  clickExploreMusic: () => trackEvent('cta_click', { cta_name: 'Explore Music', destination: '#music' }),
  
  // Media events
  playVideo: (video) => trackEvent('video_play', { video_id: video.id, video_title: video.title, artist: video.artist }),
  openModalVideo: (video) => trackEvent('video_modal_open', { video_id: video.id, video_title: video.title }),
  clickSpotifyTrack: (track) => trackEvent('spotify_track_click', { track_id: track.id, track_title: track.title }),

  // Outbound social / contact events
  clickOutbound: (platform, url) => trackEvent('outbound_click', { platform, url }),
  clickWhatsApp: (location) => trackEvent('contact_whatsapp', { source_location: location }),
  clickEmail: (source) => trackEvent('contact_email', { source }),
  clickPhone: (source) => trackEvent('contact_phone', { source }),

  // Form events
  submitContactForm: (status) => trackEvent('contact_form_submit', { status }),
};

export default analytics;
