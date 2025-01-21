import React from 'react';

interface HeaderContainerProps {
  title: string | React.ReactNode;
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
    <div className="bg-white rounded-2xl zuno-border-dark overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 bg-[#F2F2F2] border-b border-[#BBBBBB] border-[0.5px]">
        <div className="w-full">
          {typeof title === 'string' ? (
            <h2 className="title">{title}</h2>
          ) : (
            title
          )}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default HeaderContainer;
