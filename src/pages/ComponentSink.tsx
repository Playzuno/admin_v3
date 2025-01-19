import { useState } from 'react';
import { TabContainer } from '../components/containers';
import ButtonsShowcase from './ComponentSink/ButtonsShowcase';
import InputsShowcase from './ComponentSink/InputsShowcase';
import ContainersShowcase from './ComponentSink/ContainersShowcase';
import DialogsShowcase from './ComponentSink/DialogsShowcase';

const ComponentSink = () => {
  const [activeTab, setActiveTab] = useState('design');

  const tabs = [
    { key: 'design', label: 'Design Tokens' },
    { key: 'buttons', label: 'Buttons' },
    { key: 'inputs', label: 'Inputs' },
    { key: 'containers', label: 'Containers' },
    { key: 'dialogs', label: 'Dialogs' },
  ];

  const ColorSwatch = ({
    color,
    name,
    hex,
  }: {
    color: string;
    name: string;
    hex: string;
  }) => (
    <div className="space-y-2">
      <div className={`w-24 h-24 rounded-lg ${color}`} />
      <div className="space-y-1">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-gray-500">{hex}</p>
      </div>
    </div>
  );

  const GradientSwatch = ({
    gradient,
    name,
  }: {
    gradient: string;
    name: string;
  }) => (
    <div className="space-y-2">
      <div className={`w-24 h-24 rounded-lg ${gradient}`} />
      <p className="text-sm font-medium">{name}</p>
    </div>
  );

  const handleTabChange = (key: string) => {
    console.log('key', key);
    setActiveTab(key);
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Component Sink</h1>
        <p className="text-gray-600">
          A showcase of all reusable components with their variants.
        </p>
      </div>

      <TabContainer
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      >
        {activeTab === 'design' && (
          <div className="space-y-12">
            {/* Brand Colors */}
            <section>
              <h2 className="text-xl font-semibold mb-6">Brand Colors</h2>
              <div className="grid grid-cols-5 gap-8">
                <ColorSwatch
                  color="bg-brand-purple"
                  name="Purple"
                  hex="#9003DE"
                />
                <ColorSwatch
                  color="bg-brand-purple-light"
                  name="Purple Light"
                  hex="#E7D1FF"
                />
                <ColorSwatch
                  color="bg-brand-purple-dark"
                  name="Purple Dark"
                  hex="#400C7A"
                />
                <ColorSwatch
                  color="bg-brand-orange"
                  name="Orange"
                  hex="#FF6E01"
                />
              </div>
            </section>

            {/* Neutral Colors */}
            <section>
              <h2 className="text-xl font-semibold mb-6">Neutral Colors</h2>
              <div className="grid grid-cols-5 gap-8">
                <ColorSwatch
                  color="bg-neutral-100"
                  name="Neutral 100"
                  hex="#F6F6F6"
                />
                <ColorSwatch
                  color="bg-neutral-200"
                  name="Neutral 200"
                  hex="#FFFFFF"
                />
                <ColorSwatch
                  color="bg-neutral-300"
                  name="Neutral 300"
                  hex="#E5E5E5"
                />
              </div>
            </section>

            {/* Stroke Colors */}
            <section>
              <h2 className="text-xl font-semibold mb-6">Stroke Colors</h2>
              <div className="grid grid-cols-5 gap-8">
                <div className="p-4 bg-gray-100">
                  <ColorSwatch
                    color="bg-stroke-light"
                    name="Stroke Light"
                    hex="#FFFFFF"
                  />
                </div>
                <ColorSwatch
                  color="bg-stroke-dark"
                  name="Stroke Dark"
                  hex="#400C7A"
                />
              </div>
            </section>

            {/* Gradients */}
            <section>
              <h2 className="text-xl font-semibold mb-6">Gradients</h2>
              <div className="grid grid-cols-5 gap-8">
                <GradientSwatch
                  gradient="bg-gradient-purple"
                  name="Purple Gradient"
                />
                <GradientSwatch
                  gradient="bg-gradient-purple-dark"
                  name="Purple Dark Gradient"
                />
              </div>
            </section>

            {/* Typography */}
            <section>
              <h2 className="text-xl font-semibold mb-6">Typography</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Font Family
                  </h3>
                  <p className="font-sans text-lg">Inter (Primary Font)</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Font Sizes
                  </h3>
                  <div className="space-y-4">
                    <p className="text-4xl">Text 4XL - 36px</p>
                    <p className="text-3xl">Text 3XL - 30px</p>
                    <p className="text-2xl">Text 2XL - 24px</p>
                    <p className="text-xl">Text XL - 20px</p>
                    <p className="text-lg">Text LG - 18px</p>
                    <p className="text-base">Text Base - 16px</p>
                    <p className="text-sm">Text SM - 14px</p>
                    <p className="text-xs">Text XS - 12px</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    Font Weights
                  </h3>
                  <div className="space-y-2">
                    <p className="font-normal">Normal - 400</p>
                    <p className="font-medium">Medium - 500</p>
                    <p className="font-semibold">Semibold - 600</p>
                    <p className="font-bold">Bold - 700</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Border Radius */}
            <section>
              <h2 className="text-xl font-semibold mb-6">Border Radius</h2>
              <div className="grid grid-cols-5 gap-8">
                <div className="space-y-2">
                  <div className="w-24 h-24 bg-brand-purple-light rounded-sm" />
                  <p className="text-sm font-medium">Small - 2px</p>
                </div>
                <div className="space-y-2">
                  <div className="w-24 h-24 bg-brand-purple-light rounded" />
                  <p className="text-sm font-medium">Default - 4px</p>
                </div>
                <div className="space-y-2">
                  <div className="w-24 h-24 bg-brand-purple-light rounded-lg" />
                  <p className="text-sm font-medium">Large - 8px</p>
                </div>
                <div className="space-y-2">
                  <div className="w-24 h-24 bg-brand-purple-light rounded-xl" />
                  <p className="text-sm font-medium">XL - 12px</p>
                </div>
                <div className="space-y-2">
                  <div className="w-24 h-24 bg-brand-purple-light rounded-2xl" />
                  <p className="text-sm font-medium">2XL - 16px</p>
                </div>
                <div className="space-y-2">
                  <div className="w-24 h-24 bg-brand-purple-light rounded-3xl" />
                  <p className="text-sm font-medium">3XL - 24px</p>
                </div>
                <div className="space-y-2">
                  <div className="w-24 h-24 bg-brand-purple-light rounded-full" />
                  <p className="text-sm font-medium">Full</p>
                </div>
              </div>
            </section>
          </div>
        )}
        {activeTab === 'buttons' && <ButtonsShowcase />}
        {activeTab === 'inputs' && <InputsShowcase />}
        {activeTab === 'containers' && <ContainersShowcase />}
        {activeTab === 'dialogs' && <DialogsShowcase />}
      </TabContainer>
    </div>
  );
};

export default ComponentSink;
