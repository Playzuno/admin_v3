import React from 'react';

interface StatItem {
  label: string;
  value: string;
  percentage: number;
  color: string;
}

const FeedbackStats = () => {
  const stats: StatItem[] = [
    {
      label: 'Total Feedback Submissions:',
      value: '8,000',
      percentage: 100,
      color: '#400C7A', // secondary color
    },
    {
      label: 'Average Feedback Score:',
      value: '4.2/5',
      percentage: 60, // 4.2/5 = 84%
      color: '#FF6E01', // primary color
    },
    {
      label: 'Percentage of Positive Feedback (4+ stars):',
      value: '78%',
      percentage: 78,
      color: '#400C7A', // secondary color
    },
    {
      label: 'Percentage of Negative Feedback (below 3 stars):',
      value: '10%',
      percentage: 10,
      color: '#FF6E01', // primary color
    },
  ];

  return (
    <div className="space-y-8">
      {stats.map((stat, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">{stat.label}</span>
            <span 
              className="font-bold" 
              style={{ color: stat.color }}
            >
              {stat.value}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${stat.percentage}%`,
                backgroundColor: stat.color
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackStats;