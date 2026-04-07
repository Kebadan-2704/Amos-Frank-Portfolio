import { Helmet } from 'react-helmet-async';
import { artistInfo } from '../data/tracks';

const SEO = () => {
  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: artistInfo.name,
    description: artistInfo.bio,
    url: window.location.origin,
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
      <title>{artistInfo.name} | {artistInfo.tagline}</title>
      <meta name="title" content={`${artistInfo.name} | ${artistInfo.tagline}`} />
      <meta name="description" content={artistInfo.bio} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={window.location.origin} />
      <meta property="og:title" content={`${artistInfo.name} | ${artistInfo.tagline}`} />
      <meta property="og:description" content={artistInfo.bio} />
      <meta property="og:image" content={`${window.location.origin}/amos-hero.jpg`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={window.location.origin} />
      <meta property="twitter:title" content={`${artistInfo.name} | ${artistInfo.tagline}`} />
      <meta property="twitter:description" content={artistInfo.bio} />
      <meta property="twitter:image" content={`${window.location.origin}/amos-hero.jpg`} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(ldJson)}
      </script>
    </Helmet>
  );
};

export default SEO;
