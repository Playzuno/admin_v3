import React, { useState, useMemo, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { ActionContainer } from '../components/containers';
import MenuCategory, { MenuItem } from '../components/menu/MenuCategory';
import ProductUploadModal from '../components/products/ProductUploadModal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import EditDialog from '../components/ui/EditDialog';
import { menuApi } from '../services/api';
import { toast } from 'react-hot-toast';
import { ChevronRightIcon } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  items: (MenuItem & {
    isDeleted?: boolean;
    originalCategory?: string;
  })[];
}

const initialCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Category - 01',
    items: [
      { id: 'item-1', name: 'Masala Dosa with Ghee' },
      { id: 'item-2', name: 'Onion Rava with Ghee' },
      { id: 'item-3', name: 'Paneer Dosa with Ghee' },
      { id: 'item-4', name: 'Mushroom Dosa with Ghee' },
      { id: 'item-5', name: 'Normal Dosa with Ghee' },
      { id: 'item-6', name: 'Podi Dosa with Ghee' },
      { id: 'item-7', name: 'Onion Podi Dosa with Ghee' },
    ].map(item => ({ ...item, originalCategory: 'cat-1' })),
  },
  {
    id: 'cat-2',
    name: 'Category - 02',
    items: [
      { id: 'item-8', name: 'Masala Dosa with Ghee' },
      { id: 'item-9', name: 'Onion Rava with Ghee' },
      { id: 'item-10', name: 'Paneer Dosa with Ghee' },
      { id: 'item-11', name: 'Mushroom Dosa with Ghee' },
      { id: 'item-12', name: 'Normal Dosa with Ghee' },
    ].map(item => ({ ...item, originalCategory: 'cat-2' })),
  },
  {
    id: 'cat-3',
    name: 'Category - 03',
    items: [
      { id: 'item-13', name: 'Masala Dosa with Ghee' },
      { id: 'item-14', name: 'Onion Rava with Ghee' },
      { id: 'item-15', name: 'Paneer Dosa with Ghee' },
    ].map(item => ({ ...item, originalCategory: 'cat-3' })),
  },
  {
    id: 'cat-4',
    name: 'Category - 04',
    items: [
      { id: 'item-17', name: 'Masala Dosa with Ghee' },
      { id: 'item-18', name: 'Onion Rava with Ghee' },
      { id: 'item-19', name: 'Paneer Dosa with Ghee' },
    ].map(item => ({ ...item, originalCategory: 'cat-4' })),
  },
  {
    id: 'cat-5',
    name: 'Category - 05',
    items: [
      { id: 'item-20', name: 'Masala Dosa with Ghee' },
      { id: 'item-21', name: 'Onion Rava with Ghee' },
      { id: 'item-22', name: 'Paneer Dosa with Ghee' },
    ].map(item => ({ ...item, originalCategory: 'cat-5' })),
  },
];

const ProductPage: React.FC = () => {
  // Store a deep copy of initial categories
  const [originalCategories] = useState<Category[]>(
    JSON.parse(JSON.stringify(initialCategories))
  );
  const [categories, setCategories] = useState<Category[]>(
    JSON.parse(JSON.stringify(initialCategories))
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const hasChanges = useMemo(() => {
    return categories.some(
      category =>
        category.name !==
          originalCategories.find(c => c.id === category.id)?.name ||
        category.items.some(
          item => item.isDeleted || item.originalCategory !== category.id
        )
    );
  }, [categories, originalCategories]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceCategory = categories.find(
      cat => cat.id === source.droppableId
    );
    const destCategory = categories.find(
      cat => cat.id === destination.droppableId
    );

    if (!sourceCategory || !destCategory) return;

    const newCategories = [...categories];
    const sourceCategoryIndex = newCategories.findIndex(
      cat => cat.id === source.droppableId
    );
    const destCategoryIndex = newCategories.findIndex(
      cat => cat.id === destination.droppableId
    );

    const [movedItem] = newCategories[sourceCategoryIndex].items.splice(
      source.index,
      1
    );
    if (!movedItem.originalCategory) {
      movedItem.originalCategory = source.droppableId;
    }

    newCategories[destCategoryIndex].items.splice(
      destination.index,
      0,
      movedItem
    );

    setCategories(newCategories);
  };

  const handleDeleteItem = (categoryId: string, itemId: string) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map(item =>
                item.id === itemId
                  ? { ...item, isDeleted: !item.isDeleted }
                  : item
              ),
            }
          : category
      )
    );
  };

  const handleEditCategory = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      setEditingCategory({ id: categoryId, name: category.name });
    }
  };

  const handleCategoryNameSave = (newName: string) => {
    if (editingCategory) {
      setCategories(prevCategories =>
        prevCategories.map(category =>
          category.id === editingCategory.id
            ? { ...category, name: newName }
            : category
        )
      );
      setEditingCategory(null);
    }
  };

  const handleCancel = () => {
    // Reset to original state using deep copy
    setCategories(JSON.parse(JSON.stringify(originalCategories)));
  };

  const handleSave = () => {
    setShowSaveConfirm(true);
  };

  const confirmSave = async () => {
    try {
      setIsSaving(true);
      setShowSaveConfirm(false);

      const changes = {
        deletedItems: [] as string[],
        categoryChanges: [] as { itemId: string; from: string; to: string }[],
        categoryNames: [] as { id: string; name: string }[],
      };

      categories.forEach(category => {
        const originalCategory = originalCategories.find(
          c => c.id === category.id
        );
        if (originalCategory && originalCategory.name !== category.name) {
          changes.categoryNames.push({ id: category.id, name: category.name });
        }

        category.items.forEach(item => {
          if (item.isDeleted) {
            changes.deletedItems.push(item.id);
          } else if (item.originalCategory !== category.id) {
            changes.categoryChanges.push({
              itemId: item.id,
              from: item.originalCategory!,
              to: category.id,
            });
          }
        });
      });

      await menuApi.saveChanges(changes);

      // Update original state after successful save
      const newState = categories.map(category => ({
        ...category,
        items: category.items.map(item => ({
          ...item,
          originalCategory: category.id,
          isDeleted: false,
        })),
      }));

      setCategories(newState);
      toast.success('Changes saved successfully');
    } catch (error) {
      toast.error('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const [hasHorizontalScroll, setHasHorizontalScroll] = useState(false);
  useEffect(() => {
    const checkForScroll = () => {
      const container = document.querySelector('.overflow-x-auto');
      if (container) {
        setHasHorizontalScroll(container.scrollWidth > container.clientWidth);
      }
    };

    checkForScroll();
    window.addEventListener('resize', checkForScroll);
    return () => window.removeEventListener('resize', checkForScroll);
  }, [categories]);

  return (
    <div className="space-y-8">
      <ActionContainer
        title="Menu Category Plan"
        onCancel={hasChanges ? handleCancel : undefined}
        onSave={hasChanges ? handleSave : undefined}
        saveDisabled={!hasChanges || isSaving}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-nowrap -mx-3 justify-between overflow-x-auto">
            {categories.map(category => (
              <Droppable key={category.id} droppableId={category.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={
                      'mx-2 ' +
                      (snapshot.isDraggingOver ? 'bg-gray-100 rounded-lg' : '')
                    }
                  >
                    <MenuCategory
                      id={category.id}
                      title={category.name}
                      items={category.items}
                      onEdit={() => handleEditCategory(category.id)}
                      onDeleteItem={itemId =>
                        handleDeleteItem(category.id, itemId)
                      }
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
          <div
            className="absolute right-16 rounded-full top-1/2 -translate-y-1/2 bg-primary-500 text-white p-2 opacity-50 hover:opacity-100"
            style={{
              display: hasHorizontalScroll ? 'block' : 'none',
            }}
            onClick={() => {
              const container = document.querySelector('.overflow-x-auto');
              if (container) {
                container.scrollLeft += 500;
              }
            }}
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </div>
        </DragDropContext>
      </ActionContainer>

      {isUploadModalOpen && (
        <ProductUploadModal onClose={() => setIsUploadModalOpen(false)} />
      )}

      <ConfirmDialog
        isOpen={showSaveConfirm}
        title="Save Changes"
        message="Are you sure you want to save these changes? This action cannot be undone."
        onConfirm={confirmSave}
        onCancel={() => setShowSaveConfirm(false)}
      />

      <EditDialog
        isOpen={editingCategory !== null}
        title="Edit Category Name"
        initialValue={editingCategory?.name || ''}
        onConfirm={handleCategoryNameSave}
        onCancel={() => setEditingCategory(null)}
      />
    </div>
  );
};

export default ProductPage;
