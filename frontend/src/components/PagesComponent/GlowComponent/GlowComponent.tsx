import React from 'react';
interface GlowComponentProps {
  className?: string;
}
const GlowComponent: React.FC<GlowComponentProps> = (props) => {
  return <div className={`glow ${props.className}`}></div>;
};

export default GlowComponent;
