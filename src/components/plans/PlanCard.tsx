import React from 'react';

interface PlanCardProps {
  variant: 'starter' | 'professional';
  title: string;
  subtitle: string;
  price: number;
  isPopular?: boolean;
  onSubscribe?: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  variant,
  title,
  subtitle,
  price,
  isPopular = false,
  onSubscribe,
}) => {
  const isStarter = variant === 'starter';
  
  return (
    <div 
      className={`relative rounded-[16px] p-12 h-[300px] overflow-hidden ${
        isStarter 
          ? 'bg-gradient-to-b from-purple-200 via-white to-orange-50'
          : 'bg-secondary'
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-[#FF6E01] text-white px-8 py-2 transform translate-y-[0.5px] font-medium rounded-bl-[36px]">
            Most Popular
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className={`text-2xl font-bold ${isStarter ? 'text-secondary' : 'text-white'}`}>
            {title}
          </h3>
          <p className={`text-md ${isStarter ? 'text-gray-800' : 'text-white'}`}>
            {subtitle}
          </p>
        </div>

        <div>
          <div className="flex items-baseline">
            <span className={`text-xl ${isStarter ? 'text-secondary' : 'text-white'}`}>₹</span>
            <span className={`text-2xl font-bold ${isStarter ? 'text-secondary' : 'text-white'}`}>
              {price.toFixed(1)}
            </span>
            <span className={`text-lg ${isStarter ? 'text-secondary' : 'text-white'}`}>/mo</span>
          </div>
          <p className={`mt-1 ${isStarter ? 'text-gray-600' : 'text-white/80'}`}>
            Auto-renewal can be canceled anytime.
          </p>
        </div>

        <button
          onClick={onSubscribe}
          className={`w-3/4 py-4 rounded-lg font-medium transition-colors ${
            isStarter 
              ? 'border border-[#FF6E01] text-[#FF6E01] hover:bg-[#FF6E01]/5'
              : 'bg-[#FF6E01] text-white hover:bg-[#FF6E01]/90'
          }`}
        >
          Subscribe Now
        </button>
      </div>

      {/* Background Pattern */}
      <div className={`absolute top-8 right-8 text-[200px] leading-none ${
        isStarter ? 'text-purple-200' : 'text-white/10'
      }`}>
        un
      </div>
    </div>
  );
};

export default PlanCard;