import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Branch } from '../../types/brand';

interface BranchCardProps {
  branch: Branch;
  isSelected?: boolean;
}

const BranchCard: React.FC<BranchCardProps> = ({ branch, isSelected }) => {
  return (
    <div
      className={`bg-white rounded-[26px] p-6 relative transition-all ${
        isSelected
          ? 'border-2 border-brand'
          : 'border border-gray-200 hover:border-brand'
      }`}
    >
      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <MoreHorizontal className="w-4 h-4" />
      </button>

      <div className="space-y-2 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-brand/25 flex items-center justify-center">
            <span className="text-base font-medium text-brand">
              {branch.initial}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="subtitle">Branch</div>
            <h3 className="text-sm font-regular">{branch.name}</h3>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div>
          <div className="text-3xs font-regular underline decoration-gray-300 mb-1">
            No. of Users
          </div>
          <div className="text-xs font-semibold text-brand">{branch.users}</div>
        </div>
        <div className="mx-4 w-[1px] h-12 bg-gray-200" />
        <div>
          <div className="text-3xs font-regular underline decoration-gray-300 mb-1">
            No. of Feedback
          </div>
          <div className="text-xs font-semibold text-brand">
            {branch.feedback}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;
