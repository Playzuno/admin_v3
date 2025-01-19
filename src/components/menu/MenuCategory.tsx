import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MoreHorizontal, Edit2, Trash2, RotateCcw } from 'lucide-react';

export interface MenuItem {
  id: string;
  name: string;
  isDeleted?: boolean;
}

interface MenuCategoryProps {
  id: string;
  title: string;
  items: MenuItem[];
  onEdit?: () => void;
  onDeleteItem?: (itemId: string) => void;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({
  id,
  title,
  items,
  onEdit,
  onDeleteItem,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button 
          onClick={onEdit}
          className="px-4 py-2 bg-purple-100 rounded-lg text-secondary hover:bg-purple-200 transition-colors flex items-center space-x-2"
        >
          <Edit2 className="w-4 h-4" />
          <span>edit</span>
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`bg-white rounded-lg p-4 flex items-center justify-between shadow-sm select-none ${
                  snapshot.isDragging ? 'shadow-lg bg-white cursor-grabbing' : ''
                } ${item.isDeleted ? 'opacity-50' : ''}`}
                style={{
                  ...provided.draggableProps.style,
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
              >
                <div className="flex items-center space-x-3">
                  <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-grab" />
                  <span className={`text-gray-700 ${item.isDeleted ? 'line-through' : ''}`}>
                    {item.name}
                  </span>
                </div>
                <button 
                  className={`${
                    item.isDeleted 
                      ? 'text-green-500 hover:text-green-600' 
                      : 'text-primary hover:text-primary-600'
                  }`}
                  onClick={() => onDeleteItem?.(item.id)}
                >
                  {item.isDeleted ? (
                    <RotateCcw className="w-4 h-4" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;