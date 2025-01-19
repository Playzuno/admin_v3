import React, { useState } from 'react';
import Toggle from '../../components/ui/Toggle';
import Checkbox from '../../components/ui/Checkbox';

const InputsShowcase = () => {
  const [toggleState, setToggleState] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold mb-6">Text Inputs</h2>
        <div className="space-y-4 max-w-md">
          <input
            type="text"
            placeholder="Default input"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            type="text"
            placeholder="Disabled input"
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 cursor-not-allowed"
          />
          <input
            type="text"
            placeholder="Error input"
            className="w-full px-4 py-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6">Toggle</h2>
        <div className="space-y-4">
          <Toggle enabled={toggleState} onChange={() => setToggleState(!toggleState)} />
          <Toggle enabled={true} onChange={() => {}} />
          <Toggle enabled={false} onChange={() => {}} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6">Checkbox</h2>
        <div className="space-y-4">
          <Checkbox
            label="Default checkbox"
            checked={checkboxState}
            onChange={() => setCheckboxState(!checkboxState)}
          />
          <Checkbox
            label="Disabled checkbox"
            checked={true}
            onChange={() => {}}
            disabled
          />
          <Checkbox
            label="Large checkbox"
            checked={true}
            onChange={() => {}}
            size="lg"
          />
        </div>
      </section>
    </div>
  );
};

export default InputsShowcase;