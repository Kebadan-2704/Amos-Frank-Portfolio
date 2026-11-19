import { Suspense } from 'react';
import Hero from '../components/Hero';
import ContactInfo from '../components/ContactInfo';
import { lazyWithRetry } from '../utils/lazyWithRetry';

const MusicSection = lazyWithRetry(() => import('../components/MusicPage'));

const MusicFallback = () => (
  <div id="music" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="page-fallback-spinner" />
  </div>
);

const HomePage = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<MusicFallback />}>
        <MusicSection />
      </Suspense>
      <ContactInfo />
    </>
  );
};

export default HomePage;
