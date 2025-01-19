import React, { useState } from 'react';
import { TabContainer } from '../../components/containers';
import DesignTokens from './DesignTokens';
import ButtonsShowcase from './ButtonsShowcase';
import InputsShowcase from './InputsShowcase';
import ContainersShowcase from './ContainersShowcase';
import DialogsShowcase from './DialogsShowcase';

const ComponentSink = () => {
  const [activeTab, setActiveTab] = useState('design');
  console.log(activeTab)
  const tabs = [
    { key: 'design', label: 'Design Tokens' },
    { key: 'buttons', label: 'Buttons' },
    { key: 'inputs', label: 'Inputs' },
    { key: 'containers', label: 'Containers' },
    { key: 'dialogs', label: 'Dialogs' },
  ];

  const handleChange = (v) => {
    console.log("vssl: ", v)
    setActiveTab(v)
  }

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Component Sink</h1>
        <p className="text-gray-600">A showcase of all reusable components with their variants.</p>
      </div>

      <TabContainer
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleChange}
      >
        {activeTab === 'design' && <DesignTokens />}
        {activeTab === 'buttons' && <ButtonsShowcase />}
        {activeTab === 'inputs' && <InputsShowcase />}
        {activeTab === 'containers' && <ContainersShowcase />}
        {activeTab === 'dialogs' && <DialogsShowcase />}
      </TabContainer>
    </div>
  );
};

export default ComponentSink;