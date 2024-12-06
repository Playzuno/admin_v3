import React, { useState } from 'react';
import { Edit2, MoreVertical, Trash2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import ProductUploadModal from '../components/products/ProductUploadModal';

interface MenuItem {
  id: string;
  name: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Category - 01',
    items: [
      { id: '1', name: 'Masala Dosa with Ghee', category: '1' },
      { id: '2', name: 'Onion Rava with Ghee', category: '1' },
      { id: '3', name: 'Paneer Dosa with Ghee', category: '1' },
      { id: '4', name: 'Mushroom Dosa with Ghee', category: '1' },
      { id: '5', name: 'Normal Dosa with Ghee', category: '1' },
      { id: '6', name: 'Podi Dosa with Ghee', category: '1' },
      { id: '7', name: 'Onion Podi Dosa with Ghee', category: '1' },
    ],
  },
  {
    id: '2',
    name: 'Category - 02',
    items: [
      { id: '8', name: 'Masala Dosa with Ghee', category: '2' },
      { id: '9', name: 'Onion Rava with Ghee', category: '2' },
      { id: '10', name: 'Paneer Dosa with Ghee', category: '2' },
      { id: '11', name: 'Mushroom Dosa with Ghee', category: '2' },
      { id: '12', name: 'Normal Dosa with Ghee', category: '2' },
      { id: '13', name: 'Podi Dosa with Ghee', category: '2' },
      { id: '14', name: 'Onion Podi Dosa with Ghee', category: '2' },
    ],
  },
  {
    id: '3',
    name: 'Category - 03',
    items: [
      { id: '15', name: 'Masala Dosa with Ghee', category: '3' },
      { id: '16', name: 'Onion Rava with Ghee', category: '3' },
      { id: '17', name: 'Paneer Dosa with Ghee', category: '3' },
      { id: '18', name: 'Mushroom Dosa with Ghee', category: '3' },
      { id: '19', name: 'Normal Dosa with Ghee', category: '3' },
      { id: '20', name: 'Podi Dosa with Ghee', category: '3' },
      { id: '21', name: 'Onion Podi Dosa with Ghee', category: '3' },
    ],
  },
];

const ProductPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside any droppable
    if (!destination) return;

    // Same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // Find source and destination categories
    const sourceCategory = categories.find(cat => cat.id === source.droppableId);
    const destCategory = categories.find(cat => cat.id === destination.droppableId);

    if (!sourceCategory || !destCategory) return;

    // Create new array to maintain immutability
    const newCategories = [...categories];
    const sourceCategoryIndex = newCategories.findIndex(cat => cat.id === source.droppableId);
    const destCategoryIndex = newCategories.findIndex(cat => cat.id === destination.droppableId);

    // Get the item being moved
    const [movedItem] = newCategories[sourceCategoryIndex].items.splice(source.index, 1);
    movedItem.category = destination.droppableId;

    // Insert the item at the new position
    newCategories[destCategoryIndex].items.splice(destination.index, 0, movedItem);

    setCategories(newCategories);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b">
          <h1 className="text-xl font-semibold text-gray-900">Menu Category Plan</h1>
          <button 
            className="bg-secondary hover:bg-secondary-600 text-white px-6 py-2 rounded-md transition-colors"
            onClick={() => setIsUploadModalOpen(true)}
          >
            Add Products
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-6 p-6">
            {categories.map(category => (
              <div 
                key={category.id} 
                className="bg-orange-50 rounded-lg p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                  <button className="px-4 py-2 bg-orange-200 rounded-lg text-primary hover:bg-orange-300 transition-colors flex items-center space-x-2">
                    <Edit2 className="w-4 h-4" />
                    <span>edit</span>
                  </button>
                </div>

                <Droppable droppableId={category.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`space-y-4 min-h-[200px] ${
                        snapshot.isDraggingOver ? 'bg-orange-100' : ''
                      }`}
                    >
                      {category.items.map((item, index) => (
                        <Draggable 
                          key={item.id} 
                          draggableId={item.id} 
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`bg-white rounded-lg p-4 flex items-center justify-between shadow-sm ${
                                snapshot.isDragging ? 'shadow-lg bg-white' : ''
                              }`}
                            >
                              <div 
                                className="flex items-center space-x-3 flex-1"
                                {...provided.dragHandleProps}
                              >
                                <MoreVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span className="text-gray-700">{item.name}</span>
                              </div>
                              <button 
                                className="text-primary hover:text-primary-600 ml-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle delete
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      {isUploadModalOpen && (
        <ProductUploadModal onClose={() => setIsUploadModalOpen(false)} />
      )}
    </div>
  );
};

export default ProductPage;