import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Branch } from '../../types/brand';

interface BranchCardProps {
  branch: Branch;
  isSelected?: boolean;
}

const BranchCard: React.FC<BranchCardProps> = ({ branch, isSelected }) => {
  return (
    <div className={`bg-white rounded-[32px] p-6 relative transition-all ${
      isSelected ? 'border-2 border-purple-700' : 'border border-gray-200 hover:border-purple-700'
    }`}>
      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <MoreHorizontal className="w-4 h-4" />
      </button>

      <div className="space-y-2 mb-8">
        <div className="text-xs text-gray-400">Branch</div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-base font-medium text-purple-700">{branch.initial}</span>
          </div>
          <h3 className="text-base font-medium">{branch.name}</h3>
        </div>
      </div>

      <div className="flex items-center">
        <div>
          <div className="text-xs font-medium underline decoration-gray-300 mb-1">No. of Users</div>
          <div className="text-lg font-bold text-purple-700">{branch.users}</div>
        </div>
        <div className="mx-4 w-[1px] h-12 bg-gray-200" />
        <div>
          <div className="text-xs font-medium underline decoration-gray-300 mb-1">No. of Feedback</div>
          <div className="text-lg font-bold text-purple-700">{branch.feedback}</div>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;