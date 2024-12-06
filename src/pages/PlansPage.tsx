import React, { useState } from 'react';
import { Users } from 'lucide-react';

interface PlanFeature {
  label: string;
  planA: string | number;
  planB: string | number;
  planC: string | number;
}

const PlansPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'A' | 'B' | 'C'>('C');

  const features: PlanFeature[] = [
    { label: 'Validity', planA: 'Month', planB: 'Month', planC: 'Month' },
    { label: 'Cost', planA: 1, planB: 10000, planC: 1000000 },
    { label: 'Feedback', planA: 1000, planB: 10000, planC: 50000 },
    { label: 'QR', planA: '1-2', planB: '1-20', planC: '1-50' },
    { label: 'Report', planA: 5, planB: 10, planC: 25 },
    { label: 'Loyalty end user', planA: 100, planB: 1000, planC: 20000 },
    { label: 'Loyalty redemption', planA: '20%', planB: '10%', planC: '5%' },
    { label: 'LoyaltyCreat option', planA: 1, planB: 5, planC: 10 },
    { label: 'Promo Creation', planA: 5, planB: 25, planC: 100 },
    { label: 'Offer value', planA: '10%', planB: '5%', planC: '2%' },
    { label: 'Offer cashback', planA: '20%', planB: '10%', planC: '5%' },
    { label: 'Customer data', planA: 'Nil', planB: 'Nil', planC: 'Option' },
    { label: 'Login access', planA: 1, planB: 10, planC: 'Unlimited' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-[#400C7A]">Choose your plan</h1>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-[300px,1fr,1fr,1fr]">
          {/* Features column */}
          <div>
            <div className="h-16 flex items-center justify-center bg-white border-b">
              <span className="text-xl font-bold text-[#400C7A]">PLANS</span>
            </div>
            {features.map((feature, index) => (
              <div
                key={index}
                className="py-4 px-6 border-b last:border-b-0 text-gray-700"
              >
                {feature.label}
              </div>
            ))}
            <div className="py-4 px-6 border-t">
              <span className="text-gray-600 font-medium">Select you Plan</span>
            </div>
          </div>

          {/* Plan A */}
          <div>
            <div className="h-16 bg-[#6B21A8] text-white flex items-center justify-center">
              <span className="text-lg font-medium">Plan A</span>
            </div>
            {features.map((feature, index) => (
              <div
                key={index}
                className="py-4 px-6 text-center border-b last:border-b-0 bg-[#F3E8FF] text-gray-600"
              >
                {feature.planA}
              </div>
            ))}
            <div className="py-4 px-6 border-t text-center bg-[#F3E8FF]">
              <input
                type="radio"
                checked={selectedPlan === 'A'}
                onChange={() => setSelectedPlan('A')}
                className="w-5 h-5 text-[#6B21A8] focus:ring-[#6B21A8]"
              />
            </div>
          </div>

          {/* Plan B */}
          <div>
            <div className="h-16 bg-[#22C55E] text-white flex items-center justify-center">
              <span className="text-lg font-medium">Plan B</span>
            </div>
            {features.map((feature, index) => (
              <div
                key={index}
                className="py-4 px-6 text-center border-b last:border-b-0 bg-[#DCFCE7] text-gray-600"
              >
                {feature.planB}
              </div>
            ))}
            <div className="py-4 px-6 border-t text-center bg-[#DCFCE7]">
              <input
                type="radio"
                checked={selectedPlan === 'B'}
                onChange={() => setSelectedPlan('B')}
                className="w-5 h-5 text-[#22C55E] focus:ring-[#22C55E]"
              />
            </div>
          </div>

          {/* Plan C */}
          <div>
            <div className="h-16 bg-[#38BDF8] text-white flex items-center justify-center">
              <span className="text-lg font-medium">Plan C</span>
            </div>
            {features.map((feature, index) => (
              <div
                key={index}
                className="py-4 px-6 text-center border-b last:border-b-0 bg-[#E0F2FE] text-gray-600"
              >
                {feature.planC}
              </div>
            ))}
            <div className="py-4 px-6 border-t text-center bg-[#E0F2FE]">
              <input
                type="radio"
                checked={selectedPlan === 'C'}
                onChange={() => setSelectedPlan('C')}
                className="w-5 h-5 text-[#38BDF8] focus:ring-[#38BDF8]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;