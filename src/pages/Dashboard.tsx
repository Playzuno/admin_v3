import React from 'react';
import { MessageSquare, Gift, Store, Coins, Users, TrendingUp } from 'lucide-react';
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
      bgColor: 'bg-orange-50',
    },
    {
      title: '# of Reward User',
      count: 120,
      subtext: 'active users',
      growth: 6,
      icon: <Gift className="w-6 h-6 text-primary" />,
      bgColor: 'bg-orange-50',
    },
    {
      title: '# of Branch/Brand',
      count: 45,
      subtext: 'active branch',
      growth: 2,
      icon: <Store className="w-6 h-6 text-primary" />,
      bgColor: 'bg-orange-50',
    },
    {
      title: '# of Zuno Coins',
      count: 5000,
      subtext: 'zuno coins',
      growth: 15,
      icon: <Coins className="w-6 h-6 text-primary" />,
      bgColor: 'bg-orange-50',
    },
    {
      title: '# of End Users',
      count: 65,
      subtext: 'active users',
      growth: 4,
      icon: <Users className="w-6 h-6 text-primary" />,
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-6">
        {statsCards.map((card, index) => (
          <StatsCard key={index} {...card} />
        ))}
      </div>

      {/* Feedback Section */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Feedback Reports</h2>
          <div className="space-y-6">
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-secondary text-white rounded-full">
                Top-rated Food Items
              </button>
              <button className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-full">
                Lowest-rated Food
              </button>
              <div className="relative ml-auto">
                <select className="appearance-none bg-gray-50 px-4 py-2 pr-8 rounded-lg text-gray-700 focus:outline-none">
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            <FeedbackChart />
          </div>
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