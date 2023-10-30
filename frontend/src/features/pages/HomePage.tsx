import Footer from '@/components/PagesComponent/Footer/Footer';
import Hero from '@/components/PagesComponent/Hero/Hero';
import Navbar from '@/components/PagesComponent/Navbar/Navbar';
import ParticleEffect from '@/components/PagesComponent/ParticlesBackground/ParticlesBackground';
import Wrapper from '@/components/PagesComponent/Wrapper/Wrapper';
import DataSection from '@/components/PagesSection/DataSection/DataSection';
import FeaturesSection from '@/components/PagesSection/FeaturesSection/FeaturesSection';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="page">
      <Wrapper>
        <Navbar />
        <Hero />
        <DataSection />
        <FeaturesSection />
        <Footer />
        <ParticleEffect />
      </Wrapper>
    </div>
  );
};

export default HomePage;
