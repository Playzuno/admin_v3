import React from 'react';

interface PlainContainerProps {
  children: React.ReactNode;
}

const PlainContainer: React.FC<PlainContainerProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-2xl zuno-border-dark overflow-hidden p-6">
      <div className="">{children}</div>
    </div>
  );
};

export default PlainContainer;
