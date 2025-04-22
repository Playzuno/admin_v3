import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { ActionContainer } from '../components/containers';
import MenuCategory, { MenuItem } from '../components/menu/MenuCategory';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import EditDialog from '../components/ui/EditDialog';
import { toast } from 'react-hot-toast';
import { ChevronRightIcon } from 'lucide-react';
import { useOrg } from '@/context/OrgContext';
import { Product } from '@/types';
import { productApi } from '@/api';
import Button from '@/components/ui/Button';
import ProductParser from '@/components/products/ProductParser';
import { objectDetectionApi } from '@/api';
interface Category {
  id: string;
  name: string;
  items: (MenuItem & {
    isDeleted?: boolean;
    originalCategory?: string;
  })[];
}

const defaultCategories: Category[] = [
  {
    id: '1',
    name: 'Category - 01',
    items: [],
  },
  {
    id: '2',
    name: 'Category - 02',
    items: [],
  },
  {
    id: '3',
    name: 'Category - 03',
    items: [],
  },
  {
    id: '4',
    name: 'Category - 04',
    items: [],
  },
  {
    id: '5',
    name: 'Category - 05',
    items: [],
  },
];

const ProductPage: React.FC = () => {
  const { branch } = useOrg();
  const [products, setProducts] = useState<Product[]>([]);
  const [originalCategories, setOriginalCategories] =
    useState<Category[]>(defaultCategories);
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchProducts = async () => {
    if (!branch) {
      return;
    }
    const resp = await productApi.getAll(branch.id);
    if (resp.status === 200) {
      setProducts(resp.data);
      // console.log('resp products', products);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [branch]);

  useEffect(() => {
    // console.log('products', products);
    setOriginalCategories(orgCategories => {
      const newCategories = orgCategories.map(v => {
        return {
          ...v,
          items: [],
        };
      });
      products.forEach(product => {
        const category = newCategories.find(
          c => c.id === product.categoryId.toString()
        );
        product.originalCategory = category?.id || '';
        if (category) {
          setOriginalCategories(prev => {
            const newCategories = [...prev];
            newCategories.find(c => c.id === category.id)?.items.push(product);
            return newCategories;
          });
        }
      });
      return newCategories;
    });
    // console.log(originalCategories);
  }, [products]);

  const onUpdateItem = (
    itemId: string,
    originalCategory: string,
    name: string
  ) => {
    setCategories(prev =>
      prev.map(v =>
        v.id === originalCategory
          ? {
              ...v,
              items: v.items.map(i =>
                i.id === itemId ? { ...i, name: name } : i
              ),
            }
          : v
      )
    );
  };

  useEffect(() => {
    setCategories(JSON.parse(JSON.stringify(originalCategories)));
  }, [originalCategories]);

  // Store a deep copy of initial categories
  const [categories, setCategories] = useState<Category[]>(
    JSON.parse(JSON.stringify(originalCategories))
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sessionUrl, setSessionUrl] = useState('');

  const [editingCategory, setEditingCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [parserBatchId, setParserBatchId] = useState('');
  const hasChanges = useMemo(() => {
    return categories.some(
      category =>
        category.name !==
          originalCategories.find(c => c.id === category.id)?.name ||
        category.items.some(
          item =>
            item.isDeleted ||
            item.originalCategory !== category.id ||
            item.name !== products.find(p => p.id === item.id)?.name
        )
    );
  }, [categories, originalCategories, products]);

  const startSession = async () => {
    const resp = await objectDetectionApi.startSession(branch?.id || '');
    console.log('resp', resp);
    if (resp.status === 200) {
      setSessionUrl(resp.data.url);
    }
  };

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
        categoryChanges: [] as {
          itemId: string;
          from: string;
          to: string;
          name: string;
        }[],
        categoryNames: [] as { id: string; name: string }[],
        insertedItems: [] as {
          name: string;
          categoryId: string;
          branchId: string;
        }[],
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
            if (item.branchId) {
              changes.deletedItems.push(item.id);
            }
          } else if (item.originalCategory !== category.id && item.branchId) {
            changes.categoryChanges.push({
              itemId: item.id,
              from: item.originalCategory!,
              to: category.id,
              name: item.name,
            });
          } else if (
            item.name !== products.find(p => p.id === item.id)?.name &&
            item.branchId
          ) {
            changes.categoryChanges.push({
              itemId: item.id,
              from: item.originalCategory!,
              to: item.originalCategory!,
              name: item.name,
            });
          } else if (!item.branchId) {
            changes.insertedItems.push({
              name: item.name,
              categoryId: Number(category.id),
              branchId: branch?.id || '',
            });
          }
        });
      });
      // console.log(changes);
      await saveChanges(changes);

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

  const saveChanges = async (changes: any) => {
    console.log('changes', changes);
    if (!branch?.id) {
      toast.error('Branch not found');
      return;
    }
    try {
      if (changes.deletedItems.length > 0) {
        await productApi.bulkDelete(
          branch?.id,
          changes.deletedItems.map((id: string) => id)
        );
      }
      if (changes.categoryChanges.length > 0) {
        const bulkUpdateData = changes.categoryChanges.map(
          (change: {
            itemId: string;
            from: string;
            to: string;
            name: string;
          }) => ({
            id: change.itemId,
            categoryId: Number(change.to),
            name: change.name,
            branchId: branch?.id,
          })
        );
        await productApi.bulkUpdate(branch?.id, bulkUpdateData);
      }
      if (changes.insertedItems.length > 0) {
        await productApi.bulkInsert(branch?.id, changes.insertedItems);
      }
      fetchProducts();
      if (parserBatchId) {
        await productApi.markQueueAsProcessed(
          branch?.orgId,
          branch?.id,
          parserBatchId
        );
      }
    } catch (error) {
      fetchProducts();
      toast.error('Failed to save changes. Please try again.');
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsUploadModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const parseNewProducts = async (newProducts: string[]) => {
    const uniqueProducts = newProducts.filter(
      product => !products.find(p => p.name === product)
    );
    let count = 0;
    const offset = products.length;
    const formedProducts = uniqueProducts.map(p => {
      count++;
      return {
        id: `${offset + count}`,
        name: p,
        categoryId: Math.min(1 + (count % 5), 5),
        isDeleted: false,
        originalCategory: Math.min(1 + (count % 5), 5).toString(),
      };
    });
    setCategories(prev => {
      const newCategories = [...prev];
      for (let i = 0; i < 5; i++) {
        const category = newCategories.find(c => c.id === (i + 1).toString());
        if (category) {
          category.items = [
            ...category.items,
            ...formedProducts.filter(p => p.categoryId === i + 1),
          ];
        }
      }
      return newCategories;
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 absolute top-10 right-10">
        <div className="flex gap-2 justify-end relative">
          <Button
            variant="primary"
            onClick={() => setIsScanModalOpen(true)}
            size="sm"
            bgColor="purple-100"
          >
            Scan Products
          </Button>
          <Button
            variant="primary"
            onClick={() => setIsUploadModalOpen(true)}
            size="sm"
            bgColor="brand"
          >
            Add Products
          </Button>
          {isUploadModalOpen && (
            <div
              className="absolute top-[60px] right-[25px] w-[410px] z-50"
              ref={inputRef}
            >
              <ProductParser
                parseNewProducts={parseNewProducts}
                setParserBatchId={setParserBatchId}
                onClose={() => setIsUploadModalOpen(false)}
              />
            </div>
          )}
          {isScanModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
              <div className="bg-gradient-to-b to-white from-secondary-50 border-secondary-500 border rounded-xl p-12 w-[500px] relative shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
                <button
                  onClick={() => {
                    setIsScanModalOpen(false);
                    setPhoneNumber('');
                  }}
                  className="absolute -top-3 -right-3 bg-orange-500 rounded-full w-8 h-8 flex items-center justify-center text-white hover:bg-orange-600"
                >
                  <span className="sr-only">Close</span>✕
                </button>
                <div className="text-center">
                  <h2 className="text-lg font-semibold mb-2">
                    Upload your Product
                  </h2>
                  <p
                    style={{ fontSize: '12px' }}
                    className="text-gray-600 mb-6"
                  >
                    Get your product 3D scanned and train your model
                  </p>
                  <div className="bg-gray-50 rounded-full flex items-center p-1 border border-secondary-500">
                    <div className="px-4 text-gray-600  border-r">+91</div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      className="flex-1 bg-transparent px-3 py-2 focus:outline-none"
                      placeholder="Enter phone number"
                      maxLength={10}
                      pattern="[0-9]*"
                      inputMode="numeric"
                    />
                    <button
                      onClick={() => {
                        startSession();
                        setIsScanModalOpen(false);
                      }}
                      style={{ fontSize: '12px' }}
                      className="text-orange-500 px-4 hover:text-orange-600 underline"
                    >
                      Send Link
                    </button>
                  </div>
                  {sessionUrl && (
                    <div className="mt-4">
                      <a
                        href={sessionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 px-4 hover:text-orange-600 underline"
                      >
                        Open Session
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
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
                      onUpdateItem={onUpdateItem}
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

      <ConfirmDialog
        isOpen={showSaveConfirm}
        title="Save Changes"
        message="Are you sure you want to save these changes? This action cannot be undone."
        onConfirm={confirmSave}
        primaryButtonText="Save"
        primaryButtonColor="brand"
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
