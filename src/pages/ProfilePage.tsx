import React from 'react';
import { Edit } from 'lucide-react';
import TransactionHistory from '../components/profile/TransactionHistory';
import AccountSettings from '../components/profile/AccountSettings';

const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Transaction history</h2>
        </div>
        <TransactionHistory />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Account settings</h2>
          <button className="btn btn-secondary">Edit roles</button>
        </div>
        <AccountSettings />
      </div>
    </div>
  );
};

export default ProfilePage;