import React from 'react';

interface ColorSwatchProps {
  color: string;
  name: string;
  hex: string;
}

interface GradientSwatchProps {
  gradient: string;
  name: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, name, hex }) => (
  <div className="space-y-2">
    <div className={`w-24 h-24 rounded-lg ${color}`} />
    <div className="space-y-1">
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-gray-500">{hex}</p>
    </div>
  </div>
);

const GradientSwatch: React.FC<GradientSwatchProps> = ({ gradient, name }) => (
  <div className="space-y-2">
    <div className={`w-24 h-24 rounded-lg ${gradient}`} />
    <p className="text-sm font-medium">{name}</p>
  </div>
);

const DesignTokens = () => {
  const fontSizes = [
    { name: '3XS', size: '12px', class: 'text-3xs' },
    { name: '2XS', size: '14px', class: 'text-2xs' },
    { name: 'XS', size: '16px', class: 'text-xs' },
    { name: 'SM', size: '18px', class: 'text-sm' },
    { name: 'Base', size: '20px', class: 'text-base' },
    { name: 'LG', size: '24px', class: 'text-lg' },
    { name: 'XL', size: '28px', class: 'text-xl' },
    { name: '2XL', size: '32px', class: 'text-2xl' },
    { name: '3XL', size: '36px', class: 'text-3xl' },
    { name: '4XL', size: '42px', class: 'text-4xl' },
  ];

  const fontWeights = [
    { name: 'Regular', weight: '400', class: 'font-regular' },
    { name: 'Medium', weight: '500', class: 'font-medium' },
    { name: 'Semibold', weight: '600', class: 'font-semibold' },
  ];

  return (
    <div className="space-y-12">
      {/* Brand Colors */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Brand Colors</h2>
        <div className="grid grid-cols-5 gap-8">
          <ColorSwatch color="bg-brand-purple" name="Purple" hex="#9003DE" />
          <ColorSwatch color="bg-brand-purple-light" name="Purple Light" hex="#E7D1FF" />
          <ColorSwatch color="bg-brand-purple-dark" name="Purple Dark" hex="#400C7A" />
          <ColorSwatch color="bg-brand-orange" name="Orange" hex="#FF6E01" />
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Typography</h2>
        <div className="space-y-8">
          {/* Font Family */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Font Family</h3>
            <p className="font-sans text-lg">Outfit (Primary Font)</p>
          </div>

          {/* Font Sizes */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Font Sizes</h3>
            <div className="space-y-6">
              {fontSizes.map(size => (
                <div key={size.name} className="flex items-baseline">
                  <div className="w-24">
                    <span className="text-sm text-gray-500">{size.name}</span>
                  </div>
                  <div className="w-24">
                    <span className="text-sm text-gray-500">{size.size}</span>
                  </div>
                  <p className={size.class}>The quick brown fox jumps over the lazy dog</p>
                </div>
              ))}
            </div>
          </div>

          {/* Font Weights */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Font Weights</h3>
            <div className="space-y-6">
              {fontWeights.map(weight => (
                <div key={weight.name} className="flex items-baseline">
                  <div className="w-24">
                    <span className="text-sm text-gray-500">{weight.name}</span>
                  </div>
                  <div className="w-24">
                    <span className="text-sm text-gray-500">{weight.weight}</span>
                  </div>
                  <p className={`text-lg ${weight.class}`}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain unchanged */}
      {/* ... */}
    </div>
  );
};

export default DesignTokens;