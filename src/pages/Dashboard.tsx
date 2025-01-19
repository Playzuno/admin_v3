import React from 'react';
import { MessageSquare, Gift, Store, Coins, Users } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import FeedbackChart from '../components/dashboard/FeedbackChart';
import FeedbackStats from '../components/dashboard/FeedbackStats';

const Dashboard = () => {
  const statsCards = [
    {
      title: '# of Feedback',
      count: 500,
      subtext: 'feedbacks',
      growth: 20,
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      iconBgColor: 'bg-orange-50',
    },
    {
      title: '# of Reward User',
      count: 120,
      subtext: 'active users',
      growth: 6,
      icon: <Gift className="w-6 h-6 text-primary" />,
      iconBgColor: 'bg-orange-50',
    },
    {
      title: '# of Branch/Brand',
      count: 45,
      subtext: 'active branch',
      growth: 2,
      icon: <Store className="w-6 h-6 text-primary" />,
      iconBgColor: 'bg-orange-50',
    },
    {
      title: '# of Zuno Coins',
      count: 5000,
      subtext: 'zuno coins',
      growth: 15,
      icon: <Coins className="w-6 h-6 text-primary" />,
      iconBgColor: 'bg-orange-50',
    },
    {
      title: '# of End Users',
      count: 65,
      subtext: 'active users',
      growth: 4,
      icon: <Users className="w-6 h-6 text-primary" />,
      iconBgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-6">
        {statsCards.map((card, index) => (
          <StatsCard key={index} {...card} index={index} />
        ))}
      </div>

      {/* Feedback Section */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Feedback Reports</h2>
          <FeedbackChart />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Feedback Summary Stats</h2>
          <FeedbackStats />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;