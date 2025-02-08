import React, { useState } from 'react';
import { Check, X, ChevronRight, MoreVertical } from 'lucide-react';
import { Coupon } from '../../types';

interface CouponListProps {
  coupons: Coupon[];
  selectedCouponId: string | null;
  onCouponSelect: (coupon: Coupon) => void;
  onUpdateCoupon?: (coupon: Coupon) => void;
  onDeleteCoupon?: (couponId: string) => void;
}

export function CouponList({
  coupons,
  selectedCouponId,
  onCouponSelect,
  onUpdateCoupon,
  onDeleteCoupon,
}: CouponListProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleActionClick = (e: React.MouseEvent, couponId: string) => {
    e.stopPropagation(); // Prevent row selection when clicking the action button
    setActiveDropdown(activeDropdown === couponId ? null : couponId);
  };

  const handleUpdateClick = (e: React.MouseEvent, coupon: Coupon) => {
    e.stopPropagation();
    setActiveDropdown(null);
    onUpdateCoupon?.(coupon);
  };

  const handleDeleteClick = (e: React.MouseEvent, couponId: string) => {
    e.stopPropagation();
    setActiveDropdown(null);
    onDeleteCoupon?.(couponId);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeDropdown &&
        !(event.target as Element).closest('.dropdown-menu')
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden min-h-[500px]">
      <div className="overflow-x-auto min-h-[500px]">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coupon Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Zuno Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coupons.map(coupon => (
              <tr
                key={coupon.id}
                onClick={() => onCouponSelect(coupon)}
                className={`hover:bg-purple-50 cursor-pointer transition-colors ${
                  selectedCouponId === coupon.id ? 'bg-purple-50' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.active ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Check size={12} className="mr-1" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <X size={12} className="mr-1" />
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {coupon.company}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {coupon.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹ {coupon.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {coupon.zunoValue}zc
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(coupon.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                  <div className="flex items-center justify-end space-x-2">
                    <ChevronRight
                      size={16}
                      className={`text-gray-400 transition-transform ${
                        selectedCouponId === coupon.id ? 'rotate-180' : ''
                      }`}
                    />
                    <button
                      onClick={e => handleActionClick(e, coupon.id)}
                      className="p-1 hover:bg-purple-100 rounded-full transition-colors"
                    >
                      <MoreVertical size={16} className="text-gray-500" />
                    </button>

                    {activeDropdown === coupon.id && (
                      <div className="dropdown-menu absolute right-12 top-2 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1 flex flex-col gap-2">
                          <button
                            onClick={e => handleUpdateClick(e, coupon)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-900"
                          >
                            Update
                          </button>
                          <button
                            onClick={e => handleDeleteClick(e, coupon.id)}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
