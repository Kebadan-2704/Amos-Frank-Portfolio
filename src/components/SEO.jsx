import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { artistInfo } from '../data/tracks';

const pageMeta = {
  '/': { title: `${artistInfo.name} | ${artistInfo.tagline}`, description: `${artistInfo.name} — Keyboardist, Guitarist, Bass Guitarist, Music Producer, Performer & Teacher. Explore the official portfolio.` },
  '/about': { title: `About ${artistInfo.name} | Musician & Producer`, description: `Learn about ${artistInfo.name}'s 20+ year musical journey — from keyboards to production.` },
  '/music': { title: `Music | ${artistInfo.name}`, description: `Explore ${artistInfo.name}'s complete music collection — original tracks, covers, and collaborations.` },
  '/contact': { title: `Contact ${artistInfo.name} | Book & Collaborate`, description: `Get in touch with ${artistInfo.name} for collaborations, bookings, and music lessons at Musik Hub.` },
};

const SEO = () => {
  const location = useLocation();
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://amosfrank.com';
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

