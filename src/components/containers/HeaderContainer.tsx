import React from 'react';

interface HeaderContainerProps {
  title: string;
  subtitle?: string;
  description?: string;
  children: React.ReactNode;
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({
  title,
  subtitle,
  description,
  children,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 bg-[#F2F2F2] border-b border-gray-200">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default HeaderContainer;