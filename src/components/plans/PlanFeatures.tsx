import React from 'react';
import { Check, X } from 'lucide-react';
import { AnalyticsLevel, ExportDataLevel, Plan, SupportLevel } from '@/types';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PlanFeaturesProps {
  plan: Plan;
}

const PlanFeatures: React.FC<PlanFeaturesProps> = ({ plan }) => {
  const isProfessional = plan.isPopular;

  const getSupportLevel = () => {
    switch (plan.supportLevel) {
      case SupportLevel.BASIC:
        return 'Basic support';
      case SupportLevel.PRIORITY:
        return 'Priority support';
      case SupportLevel.TWENTY_FOUR_SEVEN:
        return '24/7 support';
    }
  };

  const getAnalyticsLevel = () => {
    switch (plan.analyticsLevel) {
      case AnalyticsLevel.BASIC:
        return 'Basic analytics';
      case AnalyticsLevel.PRO:
        return 'Pro analytics';
      case AnalyticsLevel.ADVANCED:
        return 'Advanced analytics';
    }
  };

  const getExportDataLevel = () => {
    switch (plan.exportDataLevel) {
      case ExportDataLevel.PREFILLED_TEMPLATES:
        return 'Prefilled templates';
      case ExportDataLevel.CUSTOM_TEMPLATES:
        return 'Custom templates';
      case ExportDataLevel.CUSTOM_TEMPLATES_WITH_AI:
        return 'Custom templates with AI';
    }
  };
  const getApiRequests = () => {
    if (!plan.maxAPIRequests) {
      return 'No api requests';
    }
    if (plan.maxAPIRequests != -1) {
      return `upto ${plan.maxAPIRequests} API requests/day`;
    }
    return 'API requests with higher rate limit';
  };

  return (
    <div className="space-y-8 border-r-2 border-secondary-500 last:border-r-0">
      <div className="space-y-4 text-center">
        <h3
          className={`text-base font-semibold ${isProfessional ? 'text-secondary' : 'text-secondary'}`}
        >
          {plan.name}
        </h3>
        <div className="flex justify-center">
          <div className="h-[1px] w-3/4 bg-[#FF6E01] text-center" />
        </div>
      </div>

      {/* Features list */}
      <div className="flex items-center justify-center">
        <div className="space-y-6">
          <PlanFeature
            feature={`${plan.maxStorage} GB Cloud Storage`}
            enabled={true}
            isProfessional={isProfessional}
          />
          <PlanFeature
            feature={
              plan.maxUsers != -1
                ? `upto ${plan.maxUsers} team members`
                : 'Unlimited team members'
            }
            enabled={true}
            isProfessional={isProfessional}
          />
          <PlanFeature
            feature={
              plan.maxProducts != -1
                ? `upto ${plan.maxProducts} products`
                : 'Unlimited products'
            }
            enabled={true}
            isProfessional={isProfessional}
          />
          <PlanFeature
            feature={`${plan.maxQRcodes} QR codes`}
            enabled={true}
            isProfessional={isProfessional}
          />
          <PlanFeature
            feature={`${plan.maxFeedbacks} feedbacks`}
            enabled={true}
            isProfessional={isProfessional}
          />
          <PlanFeature
            feature={`${plan.maxCoupons} coupons`}
            enabled={true}
            isProfessional={isProfessional}
          />
          <PlanFeature
            feature={getSupportLevel()}
            enabled={true}
            isProfessional={isProfessional}
          />
          <PlanFeature
            feature={getAnalyticsLevel()}
            enabled={true}
            isProfessional={isProfessional}
          />
          <PlanFeature
            feature={getExportDataLevel()}
            enabled={true}
            isProfessional={isProfessional}
          />
          <PlanFeature
            feature={getApiRequests()}
            enabled={!!plan.maxAPIRequests}
            isProfessional={isProfessional}
          />
          <PlanFeature
            feature={`${plan.maxDiscounts} discounts`}
            enabled={true}
            isProfessional={isProfessional}
          />
        </div>
      </div>
    </div>
  );
};

interface PlanFeatureProps {
  feature: string;
  enabled: boolean;
  isProfessional: boolean;
}

const PlanFeature: React.FC<PlanFeatureProps> = ({
  feature,
  enabled,
  isProfessional,
}) => {
  return (
    <div className="flex items-center">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
          isProfessional ? 'bg-secondary' : 'bg-gray-200'
        }`}
      >
        {enabled ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <X className="w-4 h-4 text-white" />
        )}
      </div>
      <span className="text-gray-700 ml-8 text-xs">{feature}</span>
    </div>
  );
};

export default PlanFeatures;
