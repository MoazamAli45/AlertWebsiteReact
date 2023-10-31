import Footer from '@/components/PagesComponent/Footer/Footer';
import Hero from '@/components/PagesComponent/Hero/Hero';
import Navbar from '@/components/PagesComponent/Navbar/Navbar';
import ParticleEffect from '@/components/PagesComponent/ParticlesBackground/ParticlesBackground';
import Wrapper from '@/components/PagesComponent/Wrapper/Wrapper';
import DataSection from '@/components/PagesSection/DataSection/DataSection';
import DiscordSection from '@/components/PagesSection/DiscordSection/DiscordSection';
import FeaturesSection from '@/components/PagesSection/FeaturesSection/FeaturesSection';
import PriceSection from '@/components/PagesSection/PriceSection/PriceSection';
import React from 'react';

const HomePage: React.FC = () => {
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
    </div>
  );
};

export default HomePage;
