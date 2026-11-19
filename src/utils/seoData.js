import { faqs } from '../data/faqs.js';
import { youtubeVideos, spotifyTracks } from '../data/tracks.js';

export const BASE_URL = 'https://amosfrank.com';

export const getPersonSchema = (artistInfo) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: artistInfo.name,
  url: `${BASE_URL}/`,
  image: `${BASE_URL}/amos-hero.jpg`,
  jobTitle: ['Keyboardist', 'Music Producer', 'Educator', 'Bass Guitarist'],
  description: `${artistInfo.name} is a professional keyboardist, bass guitarist, music producer, and teacher based in Coimbatore, Tamil Nadu, India, with over 20 years of musical experience.`,
  sameAs: [
    artistInfo.social.instagram,
    artistInfo.social.musikHub,
  ],
  knowsAbout: [
    'Keyboard',
    'Guitar',
    'Bass Guitar',
    'Music Production',
    'Audio Engineering',
    'Gospel Music',
    'Worship Music',
    'Bollywood Fusion',
  ],
  homeLocation: {
    '@type': 'Place',
    name: 'Coimbatore, Tamil Nadu, India',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Musik Hub',
    url: artistInfo.social.musikHub,
  },
});

export const getWebsiteSchema = (artistInfo) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: artistInfo.name,
  alternateName: [
    'Amos Frank Music',
    'Amos Frank Portfolio',
    'Amos Frank Keyboardist',
    'Amos Frank Coimbatore',
  ],
  url: `${BASE_URL}/`,
  publisher: {
    '@id': `${BASE_URL}/#person`,
  },
  inLanguage: 'en-IN',
});

export const getProfilePageSchema = (artistInfo) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${BASE_URL}/#profilepage`,
  url: `${BASE_URL}/`,
  name: `${artistInfo.name} | Official Musician & Producer Portfolio`,
  isPartOf: {
    '@id': `${BASE_URL}/#website`,
  },
  mainEntity: {
    '@id': `${BASE_URL}/#person`,
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/`,
      },
    ],
  },
});

export const getFaqSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${BASE_URL}/#faq`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const getVideoSchemaList = (videos = youtubeVideos, artistInfo) =>
  videos.map((video) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${video.title} - ${video.artist}`,
    description: `Music performance and keyboard/audio arrangement of "${video.title}" featuring ${video.artist} with production by Amos Frank.`,
    thumbnailUrl: [
      `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
    ],
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
    // Note: uploadDate is omitted where exact video date is not verified, to adhere to constraint: never invent facts.
    publisher: {
      '@type': 'Person',
      name: artistInfo?.name || 'Amos Frank',
    },
  }));

export const getMusicRecordingSchemaList = (tracks = spotifyTracks, artistInfo) =>
  tracks.map((track) => ({
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: track.title,
    url: `https://open.spotify.com/track/${track.id}`,
    byArtist: {
      '@type': 'Person',
      name: artistInfo?.name || 'Amos Frank',
    },
  }));

export const getContactBreadcrumbSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${BASE_URL}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Contact',
      item: `${BASE_URL}/contact`,
    },
  ],
});
