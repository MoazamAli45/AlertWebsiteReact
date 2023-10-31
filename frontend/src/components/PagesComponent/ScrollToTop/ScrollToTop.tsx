import React, { useEffect, useState } from 'react';
import { MdArrowUpward } from 'react-icons/md';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () =>
      window.pageYOffset > 500 ? setIsVisible(true) : setIsVisible(false);

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const goToTopHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return isVisible ? (
    <div className="scroll-top" onClick={goToTopHandler}>
      <span>
        <MdArrowUpward className="text-lg" />
      </span>
    </div>
  ) : null;
};
