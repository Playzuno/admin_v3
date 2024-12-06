import React from 'react';

const FeedbackStats = () => {
  const stats = [
    {
      label: 'Total Feedback Submissions:',
      value: '8,000',
      color: 'bg-secondary',
      width: 'w-full',
    },
    {
      label: 'Average Feedback Score:',
      value: '4.2/5',
      color: 'bg-primary',
      width: 'w-4/5',
    },
    {
      label: 'Percentage of Positive Feedback (4+ stars):',
      value: '78%',
      color: 'bg-secondary',
      width: 'w-[78%]',
    },
    {
      label: 'Percentage of Negative Feedback (below 3 stars):',
      value: '10%',
      color: 'bg-primary',
      width: 'w-[10%]',
    },
  ];

  return (
    <div className="space-y-8">
      {stats.map((stat, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-700">{stat.label}</span>
            <span className={`font-bold ${
              stat.color === 'bg-primary' ? 'text-primary' : 'text-secondary'
            }`}>
              {stat.value}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${stat.color} rounded-full transition-all duration-500`}
              style={{ width: stat.width }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackStats;