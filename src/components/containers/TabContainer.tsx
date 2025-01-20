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
    <div className="bg-white rounded-lg zuno-border-dark overflow-hidden">
      <div className="flex space-x-8 items-center px-6 bg-[#F2F2F2] border-b border-[#BBBBBB] border-[0.5px]">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`py-4 relative  min-w-16 ${
              activeTab === tab.key
                ? 'text-brand font-medium border-b-2 border-brand'
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
