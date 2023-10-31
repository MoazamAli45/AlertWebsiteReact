import Footer from '@/components/PagesComponent/Footer/Footer';
import Hero from '@/components/PagesSection/Hero/Hero';
import Navbar from '@/components/PagesComponent/Navbar/Navbar';
import ParticleEffect from '@/components/PagesComponent/ParticlesBackground/ParticlesBackground';
import DataSection from '@/components/PagesSection/DataSection/DataSection';
import DiscordSection from '@/components/PagesSection/DiscordSection/DiscordSection';
import FeaturesSection from '@/components/PagesSection/FeaturesSection/FeaturesSection';
import PriceSection from '@/components/PagesSection/PriceSection/PriceSection';
import Aos from 'aos';
import 'aos/dist/aos.css';
import React from 'react';
import { ScrollToTop } from '@/components/PagesComponent/ScrollToTop/ScrollToTop';

const HomePage: React.FC = () => {
  React.useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  return (
    <div className="page">
      <Navbar />
      <Hero />
      <ParticleEffect />
      <DataSection />
      <FeaturesSection />
      <PriceSection />
      <DiscordSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;
