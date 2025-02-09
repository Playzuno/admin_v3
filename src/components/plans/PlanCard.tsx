import { Plan } from '@/types';
import React from 'react';

interface PlanCardProps {
  plan: Plan;
  onSubscribe?: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  onSubscribe,
}) => {
  const isStarter = !plan.isPopular;

  return (
    <div
      className={`relative rounded-[16px] p-6 max-h-[300px] overflow-hidden ${
        isStarter
          ? 'bg-gradient-to-b from-[#E4B4FF] to-[#FFFCF3]'
          : 'bg-gradient-to-b from-[#7616E0] to-brand'
      }`}
    >
      {plan.isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-[#FF6E01] text-2xs text-white px-8 py-1 transform translate-y-[0.5px] font-medium rounded-bl-[36px]">
            Most Popular
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="">
          <h3
            className={`text-sm font-bold ${isStarter ? 'text-[#9003DE]' : 'text-white'}`}
          >
            {plan.name}
          </h3>
          <p
            className={`text-2xs ${isStarter ? 'text-gray-800' : 'text-white'}`}
          >
            {plan.description}
          </p>
        </div>

        <div>
          <div className="flex items-baseline">
            <span
              className={`text-sm ${isStarter ? 'text-brand' : 'text-white'}`}
            >
              ₹
            </span>
            <span
              className={`text-2xl font-semibold ${isStarter ? 'text-brand' : 'text-white'}`}
            >
              {(plan.price && plan.price.toFixed(1)) || '0.0'}
            </span>
            <span
              className={`text-lg ${isStarter ? 'text-brand' : 'text-white'}`}
            >
              /mo
            </span>
          </div>
          <p
            className={`text-2xs mt-1 ${isStarter ? 'text-gray-600' : 'text-white/80'}`}
          >
            {plan.infoText}
          </p>
        </div>

        <button
          onClick={onSubscribe}
          className={`w-3/4 py-3 rounded-lg font-medium transition-colors ${
            isStarter
              ? 'border border-[#FF6E01] text-[#FF6E01] hover:bg-[#FF6E01]/5'
              : 'bg-[#FF6E01] text-white hover:bg-[#FF6E01]/90'
          }`}
        >
          Subscribe Now
        </button>
      </div>

      {/* Background Pattern */}
      <div
        className={`absolute top-8 right-8 text-[200px] leading-none ${
          isStarter ? 'text-purple-200' : 'text-white/10'
        }`}
      >
        {plan.isPopular ? (
          <img src="/assets/images/un-dark-logo.svg" alt="un" />
        ) : (
          <img src="/assets/images/un-logo.svg" alt="un" />
        )}
      </div>
    </div>
  );
};

export default PlanCard;
