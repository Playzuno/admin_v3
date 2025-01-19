import React from 'react';

interface PlansContainerProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const PlansContainer: React.FC<PlansContainerProps> = ({ title, action, children }) => {
  return (
    <div className="bg-white rounded-[24px] border border-gray-300 p-6">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">{title}</h1>
        {action}
      </div>
      {children}
    </div>
  );
};

export default PlansContainer;