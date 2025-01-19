import React from 'react';
import PlanCard from '../components/plans/PlanCard';
import PlanFeatures from '../components/plans/PlanFeatures';
import { PlansContainer } from '../components/containers';
import { plans } from '../seeds/plans';

const PlansPage: React.FC = () => {
  const handleSubscribe = (planId: string) => {
    console.log('Subscribing to plan:', planId);
  };

  return (
    <div className="container mx-auto py-12">
      <PlansContainer 
        title="Choose your plan"
        action={
          <button className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-600 transition-colors">
            Customize plan
          </button>
        }
      >
        <div className="grid grid-cols-3 gap-8">
          {plans.map(plan => (
            <div key={plan.id}>
              <PlanCard
                variant={plan.variant}
                title={plan.title}
                subtitle={plan.subtitle}
                price={plan.price}
                isPopular={plan.isPopular}
                onSubscribe={() => handleSubscribe(plan.id)}
              />
            </div>
          ))}
        </div>

        {/* Feature List Section */}
        <div className="mt-12">
          <div className="flex items-center space-x-6">
            <div className="h-[2px] flex-1 bg-gradient-to-l from-secondary to-transparent" />
            <h2 className="text-2xl font-bold text-secondary whitespace-nowrap">Feature List</h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-secondary to-transparent" />
          </div>

          <div className="grid grid-cols-3 gap-8 mt-12">
            {plans.map(plan => (
              <PlanFeatures
                key={plan.id}
                title={plan.title}
                features={plan.features}
                variant={plan.variant}
              />
            ))}
          </div>
        </div>
      </PlansContainer>
    </div>
  );
};

export default PlansPage;