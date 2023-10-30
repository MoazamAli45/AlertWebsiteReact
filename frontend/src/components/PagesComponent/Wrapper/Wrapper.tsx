import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="w-[90%] mx-auto">
      {/* Your component content */}
      {children}
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
