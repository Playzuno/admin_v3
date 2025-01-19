import React from 'react';
import { HeaderContainer, ActionContainer } from '../../components/containers';

const ContainersShowcase = () => {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold mb-6">Header Container</h2>
        <HeaderContainer
          title="Example Header"
          subtitle="This is a subtitle"
          description="This is a description of the container"
        >
          <div className="h-32 flex items-center justify-center bg-gray-100 rounded-lg">
            Content goes here
          </div>
        </HeaderContainer>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6">Action Container</h2>
        <ActionContainer
          title="Example Action Container"
          onCancel={() => {}}
          onSave={() => {}}
        >
          <div className="h-32 flex items-center justify-center bg-gray-100 rounded-lg">
            Content with actions
          </div>
        </ActionContainer>
      </section>
    </div>
  );
};

export default ContainersShowcase;