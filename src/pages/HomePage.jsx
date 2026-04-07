import Hero from '../components/Hero';
import About from '../components/About';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import LatestNews from '../components/LatestNews';

const HomePage = ({ theme }) => {
  return (
    <>
      <Hero theme={theme} />
      <About />
      <Stats />
      <Testimonials />
      <LatestNews />
    </>
  );
};

export default HomePage;
