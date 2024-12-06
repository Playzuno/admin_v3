import React from 'react';

const FeedbackChart = () => {
  const data = [
    { label: 'As', value: 4.4 },
    { label: 'Sr', value: 4.6 },
    { label: 'Vb', value: 4.5 },
    { label: 'Sp', value: 4.8 },
    { label: 'Cm', value: 4.4 },
    { label: 'Cf', value: 4.1 },
    { label: 'Mp', value: 4.5 },
  ];

  const maxValue = 5;
  const chartHeight = 300;

  return (
    <div className="relative h-[300px]">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-gray-500">
        {[4.8, 4.6, 4.4, 4.2, 4.0].map((value) => (
          <div key={value}>{value.toFixed(1)}</div>
        ))}
      </div>

      {/* Chart */}
      <div className="ml-12 h-full flex items-end justify-between">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * chartHeight;
          const isHighest = item.value === Math.max(...data.map(d => d.value));

          return (
            <div key={item.label} className="flex flex-col items-center">
              {isHighest && (
                <div className="bg-secondary text-white text-xs px-2 py-1 rounded mb-2">
                  Sushi Platter
                  <div className="flex items-center justify-center mt-1">
                    <span className="text-yellow-300">★</span>
                    <span className="ml-1">{item.value}/5</span>
                  </div>
                </div>
              )}
              <div
                className={`w-12 rounded-t-lg ${
                  isHighest ? 'bg-primary' : 'bg-orange-100'
                }`}
                style={{ height: `${(height / chartHeight) * 100}%` }}
              />
              <div className="mt-2 text-sm text-gray-500">{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeedbackChart;