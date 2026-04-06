import { Helmet } from 'react-helmet-async';
import { artistInfo } from '../data/tracks';

const SEO = () => {
  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: artistInfo.name,
    description: artistInfo.bio,
    url: window.location.origin,
    sameAs: [
      artistInfo.social.youtube,
      artistInfo.social.spotify,
      artistInfo.social.instagram,
    ],
    genre: 'Independent Music, Classical Fusion',
    member: [
      {
        '@type': 'Person',
        name: artistInfo.name,
        roleName: 'Violinist, Producer, Performer',
      },
    ],
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
      <meta property="og:image" content={`${window.location.origin}/artist-hero.png`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={window.location.origin} />
      <meta property="twitter:title" content={`${artistInfo.name} | ${artistInfo.tagline}`} />
      <meta property="twitter:description" content={artistInfo.bio} />
      <meta property="twitter:image" content={`${window.location.origin}/artist-hero.png`} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(ldJson)}
      </script>
    </Helmet>
  );
};

export default SEO;
