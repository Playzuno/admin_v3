import React from 'react';
import { CheckIcon, Search } from 'lucide-react';
import { Branch } from '../../types/brand';
import UserList from './UserList';
import { useState } from 'react';
import Button from '../ui/Button';
import PlainContainer from '../containers/PlainContainer';
import { InviteFormData } from '@/types';
interface BranchListProps {
  branches: Branch[];
  selectedBranch?: Branch;
  onBranchSelect: (branch: Branch) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onInvite: (formData: InviteFormData) => void;
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
  };
  return (
    <div className="grid grid-cols-[1fr,500px] gap-6">
      {/* Left side - Branch List */}
      <PlainContainer>
        <div className="flex justify-between items-center mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-3 bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-brand/20"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
            />
          </div>
          <Button variant="primary" size="sm" onClick={toggleShowInvite}>
            Invite Team Members
          </Button>
        </div>

        <div className=" p-2">
          <div className="grid grid-cols-4 px-6 py-3">
            <div className="text-xs font-medium">Branch</div>
            <div className="text-xs font-medium pl-3">No. of Users</div>
            <div className="text-xs font-medium">No. of Feedback</div>
            <div className="text-xs font-medium">Dashboard</div>
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
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedBranch?.id === branch.id
                      ? 'bg-brand'
                      : 'bg-brand/25'
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      selectedBranch?.id === branch.id
                        ? 'text-white'
                        : 'text-purple-700'
                    }`}
                  >
                    {branch.initial}
                  </span>
                </div>
                <div className="ml-4">
                  <div className="text-xs">{branch.name}</div>
                  <div className="text-3xs text-gray-400">
                    Branch ID: {branch.branchId}
                  </div>
                </div>
              </div>
              <div className="text-xs text-center">{branch.users}</div>
              <div className="text-xs text-center text-brand">
                {branch.feedback}
              </div>
              <div className="flex items-center gap-2 pl-6">
                <div className="w-5 h-5 rounded-full bg-[#FF6E01] flex items-center justify-center">
                  <CheckIcon className="w-3 h-3 text-white" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </PlainContainer>

      {/* Right side - Users List */}
      <UserList
        onInvite={onInvite}
        showInviteForm={showInviteForm}
        setShowInviteForm={setShowInviteForm}
        cancelAction={toggleShowInvite}
      />
    </div>
  );
};

export default BranchList;
