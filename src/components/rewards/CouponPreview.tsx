import React from 'react';

interface CouponPreviewProps {
  company: string;
  name: string;
  value: string;
  zunoValue: string;
  image: string | null;
}

const CouponPreview: React.FC<CouponPreviewProps> = ({
  company,
  name,
  value,
  zunoValue,
  image,
}) => {
  return (
    <div className="w-full max-w-md mt-[5%]">
     <div className="bg-white rounded-[32px] overflow-hidden shadow-lg relative border-[1px] border-[#BBBBBB] transition-all duration-200 hover:border-[#2982FE]">
        {/* Top notch */}
        <div className="absolute -left-4 top-[calc(100%-218px)] w-8 h-8 bg-gray-100 rounded-full" />
        <div className="absolute -right-4 top-[calc(100%-218px)] w-8 h-8 bg-gray-100 rounded-full" />

        <div className="p-8 mt-3">
          <div>
            <div className="text-gray-500 mb-2">Coupon</div>
            <h2 className="text-base font-medium text-brand">
              {name || 'Amazon deal coupon'}
            </h2>
            <div className="h-[1px] bg-gray-200 mt-4" />
          </div>

          <div className="mt-[0%] grid grid-cols-2 gap-8">
            <div>
              <div className="text-gray-500 mb-2">Coupon value</div>
              <div className="text-base font-bold text-brand flex items-center">
                <span className="text-lg mr-1">₹</span>
                {value || '1000'}
              </div>
            </div>
            <div >
              <div className="text-gray-500 mb-2">Zuno value</div>
              <div className="text-base font-bold text-brand">
                {zunoValue || '100'}
                <span className="text-lg">zc</span>
              </div>
            </div>
          </div>

          <div className='mt-[0%]'>
            <div className="text-gray-500 mb-3">Coupon image</div>
            <div className="w-24 h-24 bg-black rounded-lg overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt="Coupon"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl text-white">a</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-brand p-8 text-white">
          <div className="mb-2">Coupon link:</div>
          <div className="text-sm break-all">
            {company
              ? `${company.toLowerCase()}coupon.zono/redeem/28701803`
              : 'Amazoncoupon.zono/redeem/28701803'}
          </div>
          <button className="w-full mt-6 py-4 bg-white text-brand rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponPreview;
