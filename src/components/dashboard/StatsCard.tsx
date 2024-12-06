import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  count: number;
  subtext: string;
  growth: number;
  icon: React.ReactNode;
  bgColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  count,
  subtext,
  growth,
  icon,
  bgColor,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg ${bgColor}`}>{icon}</div>
        <div className="flex items-center text-xs text-gray-500">
          <span className="text-green-500 font-medium">{growth}%</span>
          <TrendingUp className="w-3 h-3 ml-1 text-green-500" />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <div className="flex items-baseline mt-2">
          <p className="text-2xl font-bold">{count}</p>
          <p className="ml-2 text-sm text-gray-500">{subtext}</p>
        </div>
        <p className="text-xs text-gray-400 mt-1">compared to last week</p>
      </div>
    </div>
  );
};

export default StatsCard;