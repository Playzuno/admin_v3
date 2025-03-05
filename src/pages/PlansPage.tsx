import React, { useEffect, useState } from 'react';
import PlanCard from '../components/plans/PlanCard';
import PlanFeatures from '../components/plans/PlanFeatures';
// import { Plan, plans } from '../seeds/plans';
import PlainContainer from '../components/containers/PlainContainer';
import Button from '../components/ui/Button';
import { rewardsAndPlansApi } from '@/api';
import { Plan } from '@/types';
import { UpdatePlanDialog } from '@/components/plans/UpdatePlanDialog';
import { SuccessToast } from '@/components/ui/toast';

const PlansPage: React.FC = () => {
  const handleSubscribe = (planId: string) => {
    console.log('Subscribing to plan:', planId);
  };

  const [plans, setPlans] = useState<Plan[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  useEffect(() => {
    refreshPlans();
  }, []);

  const refreshPlans = () => {
    rewardsAndPlansApi.getAllPlans().then(response => {
      setPlans(response.data.sort((a, b) => a.ordinal - b.ordinal));
    });
  };

  const handleUpdatePlan = (plan: Plan) => {
    const { id, createdAt, updatedAt, ...rest } = plan;
    rewardsAndPlansApi.updatePlan(id, rest).then(() => {
      SuccessToast('Plan updated successfully');
      setIsDialogOpen(false);
      refreshPlans();
    });
  };

  return (
    <div className="container mx-auto">
      <PlainContainer>
        <div className="flex items-center justify-between mb-6">
          <h2 className="container-title">Choose your plan</h2>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsDialogOpen(true)}
          >
            Customize plan
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {plans.map(plan => (
            <div key={plan.id}>
              <PlanCard
                plan={plan}
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
              <PlanFeatures key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </PlainContainer>
      {isDialogOpen && (
        <UpdatePlanDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onUpdate={handleUpdatePlan}
          plans={plans}
        />
      )}
    </div>
  );
};

export default PlansPage;
