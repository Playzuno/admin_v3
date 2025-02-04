import { analyticsApi } from '@/api';
import { useOrg } from '@/context/OrgContext';
import { FeedbackSummaryResponse } from '@/types';
import React, { useEffect, useState } from 'react';

interface StatItem {
  label: string;
  value: string;
  percentage: number;
  color: string;
}

const FeedbackStats = () => {
  const { branch } = useOrg();
  const [feedbackSummaryData, setFeedbackSummaryData] =
    useState<FeedbackSummaryResponse | null>(null);
  useEffect(() => {
    if (branch) {
      analyticsApi.getFeedbackSummary(branch.id).then(res => {
        setFeedbackSummaryData(res.data);
      });
    }
  }, [branch]);
  const gerPercentile = (a: number, b: number): number => {
    if (a == 0) return 0;
    return Math.floor((a / b) * 100);
  };
  const stats: StatItem[] = [
    {
      label: 'Total Feedback Submissions:',
      value: feedbackSummaryData?.totalFeedbacks.toString() || '0',
      percentage: 100,
      color: '#400C7A', // secondary color
    },
    {
      label: 'Average Feedback Score:',
      value: feedbackSummaryData?.averageRating.toFixed(1) || '0',
      percentage: gerPercentile(feedbackSummaryData?.averageRating || 0, 5),
      color: '#FF6E01', // primary color
    },
    {
      label: 'Percentage of Positive Feedback (4+ stars):',
      value: feedbackSummaryData?.positiveFeedbacks.toString() || '0',
      percentage: gerPercentile(
        feedbackSummaryData?.positiveFeedbacks || 0,
        feedbackSummaryData?.totalFeedbacks || 0
      ),
      color: '#400C7A', // secondary color
    },
    {
      label: 'Percentage of Negative Feedback (below 3 stars):',
      value: feedbackSummaryData?.negativeFeedbacks.toString() || '0',
      percentage: gerPercentile(
        feedbackSummaryData?.negativeFeedbacks || 0,
        feedbackSummaryData?.totalFeedbacks || 0
      ),
      color: '#FF6E01', // primary color
    },
  ];

  return (
    <div className="space-y-8">
      {stats.map((stat, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">{stat.label}</span>
            <span className="font-bold" style={{ color: stat.color }}>
              {stat.value}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${stat.percentage}%`,
                backgroundColor: stat.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackStats;
