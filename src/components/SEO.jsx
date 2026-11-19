import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { artistInfo as staticArtistInfo } from '../data/tracks';
import { usePortfolioData } from '../context/DataContext';
import {
  BASE_URL,
  getPersonSchema,
  getWebsiteSchema,
  getProfilePageSchema,
  getVideoSchemaList,
  getMusicRecordingSchemaList,
  getContactBreadcrumbSchema,
} from '../utils/seoData';

const getPageMeta = (artistInfo) => ({
  '/': {
    title: `${artistInfo.name} | Keyboardist, Music Producer & Teacher`,
    description: `Official portfolio of ${artistInfo.name} — Keyboardist, bassist, and music producer in Coimbatore, India. Watch music videos, stream tracks, and book sessions.`,
    canonical: `${BASE_URL}/`,
  },
  '/contact': {
    title: `Contact ${artistInfo.name} | Bookings & Music Lessons Coimbatore`,
    description: `Get in touch with ${artistInfo.name} for music production, live performance bookings, collaborations, and keyboard or bass guitar classes at Musik Hub Coimbatore.`,
    canonical: `${BASE_URL}/contact`,
  },
});

const SEO = () => {
  const { artistInfo: firestoreArtist, youtubeVideos: fsVideos, spotifyTracks: fsSpotify } = usePortfolioData();
  const artistInfo = firestoreArtist || staticArtistInfo;
  const location = useLocation();
  const pageMeta = getPageMeta(artistInfo);
  const currentMeta = pageMeta[location.pathname] || pageMeta['/'];
  const isHome = location.pathname === '/';
  const isContact = location.pathname === '/contact';

  // Construct JSON-LD schemas
  const schemas = [];

  if (isHome) {
    schemas.push(getPersonSchema(artistInfo));
    schemas.push(getWebsiteSchema(artistInfo));
    schemas.push(getProfilePageSchema(artistInfo));
    const videoSchemas = getVideoSchemaList(fsVideos, artistInfo);
    schemas.push(...videoSchemas);
    const spotifySchemas = getMusicRecordingSchemaList(fsSpotify, artistInfo);
    schemas.push(...spotifySchemas);
  } else if (isContact) {
    schemas.push(getPersonSchema(artistInfo));
    schemas.push(getContactBreadcrumbSchema());
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{currentMeta.title}</title>
      <meta name="title" content={currentMeta.title} />
      <meta name="description" content={currentMeta.description} />
      <link rel="canonical" href={currentMeta.canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentMeta.canonical} />
      <meta property="og:title" content={currentMeta.title} />
      <meta property="og:description" content={currentMeta.description} />
      <meta property="og:image" content={`${BASE_URL}/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${artistInfo.name} - Keyboardist, Music Producer and Educator`} />
      <meta property="og:site_name" content={artistInfo.name} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentMeta.canonical} />
      <meta property="twitter:title" content={currentMeta.title} />
      <meta property="twitter:description" content={currentMeta.description} />
      <meta property="twitter:image" content={`${BASE_URL}/og-image.jpg`} />

      {/* Geographic Tags */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Coimbatore" />

      {/* JSON-LD Structured Data (one clean array or script tags) */}
      <script type="application/ld+json">
        {JSON.stringify(schemas)}
      </script>
    </Helmet>
  );
};

export default SEO;
