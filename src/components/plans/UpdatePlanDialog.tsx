import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Plan, SupportLevel, AnalyticsLevel, ExportDataLevel } from '@/types';
import { Combobox, ComboboxOption } from '@/components/ui/Combobox';

interface UpdatePlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (plan: Plan) => void;
  plans: Plan[];
}

export function UpdatePlanDialog({ isOpen, onClose, onUpdate, plans }: UpdatePlanDialogProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState<Partial<Plan>>({});

  if (!isOpen) return null;

  const planOptions: ComboboxOption[] = plans.map(plan => ({
    value: plan.id,
    label: plan.name
  }));

  const supportLevelOptions: ComboboxOption[] = [
    { value: SupportLevel.BASIC.toString(), label: 'Basic Support' },
    { value: SupportLevel.PRIORITY.toString(), label: 'Priority Support' },
    { value: SupportLevel.TWENTY_FOUR_SEVEN.toString(), label: '24/7 Support' }
  ];

  const analyticsLevelOptions: ComboboxOption[] = [
    { value: AnalyticsLevel.BASIC.toString(), label: 'Basic Analytics' },
    { value: AnalyticsLevel.PRO.toString(), label: 'Pro Analytics' },
    { value: AnalyticsLevel.ADVANCED.toString(), label: 'Advanced Analytics' }
  ];

  const exportDataLevelOptions: ComboboxOption[] = [
    { value: ExportDataLevel.PREFILLED_TEMPLATES.toString(), label: 'Prefilled Templates' },
    { value: ExportDataLevel.CUSTOM_TEMPLATES.toString(), label: 'Custom Templates' },
    { value: ExportDataLevel.CUSTOM_TEMPLATES_WITH_AI.toString(), label: 'Custom Templates with AI' }
  ];

  const handlePlanSelect = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
      setFormData(plan);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : 
              type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlan && formData) {
      onUpdate({ ...selectedPlan, ...formData });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl min-h-[300px]  max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="container-title font-bold text-brand">Update Plan</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <Combobox
              options={planOptions}
              value={selectedPlan?.id || ''}
              onChange={handlePlanSelect}
              label="Select Plan to Update"
              placeholder="Search plans..."
              className="mb-6"
            />
          </div>

          {selectedPlan && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Info Text
                  </label>
                  <textarea
                    name="infoText"
                    value={formData.infoText || ''}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Users
                  </label>
                  <input
                    type="number"
                    name="maxUsers"
                    value={formData.maxUsers || ''}
                    onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Storage (GB)
                  </label>
                  <input
                    type="number"
                    name="maxStorage"
                    value={formData.maxStorage || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max API Requests
                  </label>
                  <input
                    type="number"
                    name="maxAPIRequests"
                    value={formData.maxAPIRequests || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Products
                  </label>
                  <input
                    type="number"
                    name="maxProducts"
                    value={formData.maxProducts || ''}
                    onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max QR Codes
                  </label>
                  <input
                    type="number"
                    name="maxQRcodes"
                    value={formData.maxQRcodes || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Branches
                  </label>
                  <input
                    type="number"
                    name="maxBranches"
                    value={formData.maxBranches || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Feedbacks
                  </label>
                  <input
                    type="number"
                    name="maxFeedbacks"
                    value={formData.maxFeedbacks || ''}
                    onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Coupons
                  </label>
                  <input
                    type="number"
                    name="maxCoupons"
                    value={formData.maxCoupons || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Discounts
                  </label>
                  <input
                    type="number"
                    name="maxDiscounts"
                    value={formData.maxDiscounts || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <Combobox
                  options={supportLevelOptions}
                  value={formData.supportLevel?.toString() || ''}
                  onChange={(value) => setFormData(prev => ({ ...prev, supportLevel: Number(value) }))}
                  label="Support Level"
                  placeholder="Select support level..."
                />

                <Combobox
                  options={analyticsLevelOptions}
                  value={formData.analyticsLevel?.toString() || ''}
                  onChange={(value) => setFormData(prev => ({ ...prev, analyticsLevel: Number(value) }))}
                  label="Analytics Level"
                  placeholder="Select analytics level..."
                />

                <Combobox
                  options={exportDataLevelOptions}
                  value={formData.exportDataLevel?.toString() || ''}
                  onChange={(value) => setFormData(prev => ({ ...prev, exportDataLevel: Number(value) }))}
                  label="Export Data Level"
                  placeholder="Select export level..."
                />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPopular"
                    checked={formData.isPopular || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Popular Plan
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="themeCustomization"
                    checked={formData.themeCustomization || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Theme Customization
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="enableRewards"
                    checked={formData.enableRewards || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Enable Rewards
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="enableOIDC"
                    checked={formData.enableOIDC || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Enable OIDC
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="enableMultipleBranches"
                    checked={formData.enableMultipleBranches || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Enable Multiple Branches
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="enableMFASupport"
                    checked={formData.enableMFASupport || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Enable MFA Support
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                    className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand/80 focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  Update Plan
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}