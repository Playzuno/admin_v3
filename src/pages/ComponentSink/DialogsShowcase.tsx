import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import EditDialog from '../../components/ui/EditDialog';

const DialogsShowcase = () => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold mb-6">Confirm Dialog</h2>
        <Button variant="danger" onClick={() => setShowConfirmDialog(true)}>
          Open Confirm Dialog
        </Button>
        <ConfirmDialog
          isOpen={showConfirmDialog}
          title="Delete Item"
          message="Are you sure you want to delete this item? This action cannot be undone."
          onConfirm={() => setShowConfirmDialog(false)}
          onCancel={() => setShowConfirmDialog(false)}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6">Edit Dialog</h2>
        <Button variant="primary" onClick={() => setShowEditDialog(true)}>
          Open Edit Dialog
        </Button>
        <EditDialog
          isOpen={showEditDialog}
          title="Edit Name"
          initialValue="John Doe"
          onConfirm={() => setShowEditDialog(false)}
          onCancel={() => setShowEditDialog(false)}
        />
      </section>
    </div>
  );
};

export default DialogsShowcase;