import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { artistInfo as staticArtistInfo } from '../data/tracks';
import { usePortfolioData } from '../context/DataContext';

const getPageMeta = (artistInfo) => ({
  '/': {
    title: `${artistInfo.name} | Keyboardist, Music Producer, Performer & Teacher`,
    description: `${artistInfo.name} — Keyboardist, Guitarist, Bassist & Music Producer. 20+ years of musical journey. Watch official music videos, stream Spotify releases, and explore collaborations.`
  },
  '/contact': {
    title: `Contact ${artistInfo.name} | Book & Collaborate`,
    description: `Get in touch with ${artistInfo.name} for collaborations, bookings, and music lessons at Musik Hub.`
  },
});

const SEO = () => {
  const { artistInfo: firestoreArtist } = usePortfolioData();
  const artistInfo = firestoreArtist || staticArtistInfo;
  const location = useLocation();
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://amos-frank.vercel.app';
  const pageMeta = getPageMeta(artistInfo);
  const meta = pageMeta[location.pathname] || pageMeta['/'];

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: artistInfo.name,
    description: artistInfo.bio,
    url: origin,
    sameAs: [
      artistInfo.social.instagram,
      artistInfo.social.musikHub,
    ],
    jobTitle: 'Musician, Music Producer, Educator',
    knowsAbout: ['Keyboard', 'Guitar', 'Bass Guitar', 'Music Production'],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{meta.title}</title>
      <meta name="title" content={meta.title} />
      <meta name="description" content={meta.description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={`${origin}${location.pathname}`} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={`${origin}/og-image.jpg`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${origin}${location.pathname}`} />
      <meta property="twitter:title" content={meta.title} />
      <meta property="twitter:description" content={meta.description} />
      <meta property="twitter:image" content={`${origin}/og-image.jpg`} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(ldJson)}
      </script>
    </Helmet>
  );
};

export default SEO;

