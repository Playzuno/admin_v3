import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  count: number;
  subtext: string;
  growth: number;
  icon: React.ReactNode;
  iconBgColor: string;
  index: number;
  redirectUrl: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  count,
  subtext,
  growth,
  icon,
  iconBgColor,
  index,
  redirectUrl
}) => {
  return (
    <div className="h-full">
      <Link to={redirectUrl} className="block h-full">
        <div
          className={`h-full flex flex-col justify-between bg-white rounded-2xl p-6 border transition-colors duration-200 hover:border-primary ${
            index === 11110 ? 'border-primary' : 'zuno-border'
          }`}
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className={`${iconBgColor} p-4 rounded-full`}>{icon}</div>
              <h3 className="title whitespace-pre-line">
                {title.replace('# of', '# of\n')}
              </h3>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-start gap-8">
                <div>
                  <p className="text-3xs underline">Count</p>
                  <p className="text-2xs font-bold text-secondary pt-[1px]">
                    {count.toLocaleString()}
                  </p>
                  <p className="text-2xs text-secondary text-nowrap">
                    {subtext}
                  </p>
                </div>
                <div>
                  <p className="mini-subtitle text-gray-600 font-medium text-nowrap">
                    more than..
                  </p>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xs font-bold text-secondary">
                      {growth.toString().padStart(2, '0')}%
                    </span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="mini-subtitle">compared to last week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StatsCard;
