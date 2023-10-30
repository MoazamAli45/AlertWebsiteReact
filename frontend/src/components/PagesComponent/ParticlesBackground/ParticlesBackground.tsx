import React from 'react';
import './ParticlesBackground.css'; // Import your external CSS file if applicable

const ParticleEffect: React.FC = () => {
  return (
    <section>
      <div className="bubbles">
        {Array.from({ length: 100 }).map((_, index) => (
          <div key={index} className="bubble"></div>
        ))}
      </div>
    </section>
  );
};

export default ParticleEffect;
