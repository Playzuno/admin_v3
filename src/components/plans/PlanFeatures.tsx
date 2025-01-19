import React from 'react';
import { Check } from 'lucide-react';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PlanFeaturesProps {
  title: string;
  features: PlanFeature[];
  variant: 'starter' | 'professional';
}

const PlanFeatures: React.FC<PlanFeaturesProps> = ({ title, features, variant }) => {
  const isProfessional = variant === 'professional';
  
  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <h3 className={`text-2xl font-bold ${isProfessional ? 'text-secondary' : 'text-secondary'}`}>
          {title}
        </h3>
        <div className="flex justify-center">
          <div className="h-[1px] w-3/4 bg-[#FF6E01] text-center" />
        </div>
      </div>

      {/* Features list */}
      <div className="flex items-center justify-center">
      <div className="space-y-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              isProfessional ? 'bg-secondary' : 'bg-gray-200'
            }`}>
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-700 ml-8">{feature.name}</span>
          </div>
        ))}
      </div>
        </div>
    </div>
  );
};

export default PlanFeatures;