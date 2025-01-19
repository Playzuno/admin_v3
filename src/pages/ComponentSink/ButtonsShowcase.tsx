import React from 'react';
import Button from '../../components/ui/Button';
import { Edit, Save, Trash2, Plus } from 'lucide-react';

const ButtonsShowcase = () => {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold mb-6">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button variant="light">Light Button</Button>
          <Button variant="zuno-light">Zuno Light Button</Button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small Button</Button>
          <Button size="md">Medium Button</Button>
          <Button size="lg">Large Button</Button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6">Buttons with Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" icon={Edit}>
            Edit
          </Button>
          <Button variant="secondary" icon={Save}>
            Save
          </Button>
          <Button variant="danger" icon={Trash2}>
            Delete
          </Button>
          <Button variant="light" icon={Plus} iconPosition="right">
            Add New
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6">Button States</h2>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled Button</Button>
          <Button loading>Loading Button</Button>
          <Button variant="primary" fullWidth>
            Full Width Button
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ButtonsShowcase;
