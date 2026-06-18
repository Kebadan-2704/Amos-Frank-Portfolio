import Hero from '../components/Hero';
import About from '../components/About';
import LatestNews from '../components/LatestNews';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <LatestNews />
      <Testimonials />
    </>
  );
};

export default HomePage;
