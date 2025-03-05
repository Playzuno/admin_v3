import { MessageSquare, Gift, Store, Coins, Users } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import FeedbackChart from '../components/dashboard/FeedbackChart';
import FeedbackStats from '../components/dashboard/FeedbackStats';
import { analyticsApi } from '@/api';
import { useEffect, useState } from 'react';
import { useOrg } from '@/context/OrgContext';
import { BranchStats } from '@/types';

const Dashboard = () => {
  const { branch, branches } = useOrg();
  const [branchStats, setBranchStats] = useState<BranchStats | null>(null);
  useEffect(() => {
    const fetchBranchStats = async () => {
      if (!branch?.id) return;
      const resp = await analyticsApi.getBranchStats(branch?.id);
      if (resp.status === 200) {
        setBranchStats(resp.data);
      }
    };
    fetchBranchStats();
  }, [branch]);

  // console.log(branchStats);
  const statsCards = [
    {
      title: 'Feedback',
      count: branchStats?.totalFeedbacks || 0,
      subtext: 'feedbacks',
      growth: 20,
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      iconBgColor: 'bg-orange-50',
    },
    {
      title: 'Reward User',
      count: branchStats?.rewardedEndUsers || 0,
      subtext: 'active users',
      growth: 6,
      icon: <Gift className="w-6 h-6 text-primary" />,
      iconBgColor: 'bg-orange-50',
    },
    {
      title: 'Branch/Brand',
      count: branches.length || 1,
      subtext: 'active branch',
      growth: 2,
      icon: <Store className="w-6 h-6 text-primary" />,
      iconBgColor: 'bg-orange-50',
    },
    {
      title: 'Zuno Coins',
      count: branchStats?.totalCoinsGiven || 0,
      subtext: 'zuno coins',
      growth: 15,
      icon: <Coins className="w-6 h-6 text-primary" />,
      iconBgColor: 'bg-orange-50',
    },
    {
      title: 'End Users',
      count: branchStats?.rewardedEndUsers || 0,
      subtext: 'active users',
      growth: 4,
      icon: <Users className="w-6 h-6 text-primary" />,
      iconBgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      {branchStats && (
        <div className="grid grid-cols-5 gap-6">
          {statsCards.map((card, index) => (
            <StatsCard key={index} {...card} index={index} />
          ))}
        </div>
      )}

      {/* Feedback Section */}
      <div className="grid grid-cols-2 gap-6 p-3">
        <div className="bg-white p-8 shadow-sm rounded-3xl zuno-border-dark">
          <h2 className="container-title mb-6">Feedback Reports</h2>
          <FeedbackChart />
        </div>

        <div className="flex flex-col justify-center align-center px-8 bg-white rounded-3xl shadow-sm zuno-border-dark">
          <h2 className="container-title mb-6">Feedback Summary Stats</h2>
          <FeedbackStats />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
