import React from 'react';
import PlanCard from '../components/plans/PlanCard';
import PlanFeatures from '../components/plans/PlanFeatures';
import { plans } from '../seeds/plans';
import PlainContainer from '../components/containers/PlainContainer';
import Button from '../components/ui/Button';

const PlansPage: React.FC = () => {
  const handleSubscribe = (planId: string) => {
    console.log('Subscribing to plan:', planId);
  };

  return (
    <div className="container mx-auto">
      <PlainContainer>
        <div className="flex items-center justify-between mb-6">
          <h2 className="container-title">Choose your plan</h2>
          <Button variant="primary" size="sm">
            Customize plan
          </Button>
        </div>

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
            <div className="h-[2px] flex-1 bg-gradient-to-l from-brand to-transparent" />
            <h2 className="text-lg font-medium text-brand whitespace-nowrap">
              Feature List
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-brand to-transparent" />
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
      </PlainContainer>
    </div>
  );
};

export default PlansPage;
