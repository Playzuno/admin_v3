import React from 'react';

interface TabItem {
  key: string;
  label: string;
}

interface TabContainerProps {
  title?: string;
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
  children: React.ReactNode;
}

const TabContainer: React.FC<TabContainerProps> = ({
  title,
  tabs,
  activeTab,
  onTabChange,
  children,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] border border-gray-200 overflow-hidden">
      {/* {title && (
        <div className="px-6 py-4 bg-[#F2F2F2] border-b border-gray-200">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      )} */}
      <div className="flex space-x-8 px-6 bg-[#F2F2F2] border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`py-4 relative ${
              activeTab === tab.key
                ? 'text-primary font-medium border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default TabContainer;