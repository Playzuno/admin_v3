import React from 'react';
import { Search } from 'lucide-react';
import { Branch } from '../../types/brand';
import UserList from './UserList';
import {useState} from 'react';
interface BranchListProps {
  branches: Branch[];
  selectedBranch?: Branch;
  onBranchSelect: (branch: Branch) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onInvite: () => void;
}

const BranchList: React.FC<BranchListProps> = ({
  branches,
  selectedBranch,
  onBranchSelect,
  searchQuery,
  onSearchChange,
  onInvite,
}) => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const toggleShowInvite = () => {
    setShowInviteForm(v => !v);
  }
  return (
    <div className="grid grid-cols-[1fr,500px] gap-6">
      {/* Left side - Branch List */}
      <div className="bg-white rounded-[32px] border border-gray-200 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowInviteForm(true)}
            className="px-4 py-2 bg-purple-700 text-white text-sm rounded-lg hover:bg-purple-800 transition-colors"
          >
            Invite Team Members
          </button>
        </div>

        <div className="divide-y">
          <div className="grid grid-cols-4 px-6 py-3 bg-gray-50">
            <div className="text-xs font-medium text-gray-500">Branch</div>
            <div className="text-xs font-medium text-gray-500">No. of Users</div>
            <div className="text-xs font-medium text-gray-500">No. of Feedback</div>
            <div className="text-xs font-medium text-gray-500">Dashboard</div>
          </div>

          {branches.map(branch => (
            <button
              key={branch.id}
              className={`w-full grid grid-cols-4 px-6 py-4 items-center text-left hover:bg-gray-50 transition-colors ${
                selectedBranch?.id === branch.id ? 'bg-purple-50' : ''
              }`}
              onClick={() => onBranchSelect(branch)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedBranch?.id === branch.id ? 'bg-purple-700' : 'bg-purple-100'
                }`}>
                  <span className={`text-sm font-medium ${
                    selectedBranch?.id === branch.id ? 'text-white' : 'text-purple-700'
                  }`}>{branch.initial}</span>
                </div>
                <div>
                  <div className="text-sm font-medium">{branch.name}</div>
                  <div className="text-xs text-gray-400">Branch ID: {branch.branchId}</div>
                </div>
              </div>
              <div className="text-sm text-gray-900">{branch.users}</div>
              <div className="text-sm font-medium text-purple-700">{branch.feedback}</div>
              <div>
                <div className={`w-2 h-2 rounded-full ${
                  branch.isActive ? 'bg-orange-400' : 'bg-gray-300'
                }`} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right side - Users List */}
      <UserList onInvite={onInvite} showInviteForm={showInviteForm} cancelAction={toggleShowInvite} />
    </div>
  );
};

export default BranchList;