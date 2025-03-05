import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MoreHorizontal, Edit2, Trash2, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';

export interface MenuItem {
  id: string;
  name: string;
  isDeleted?: boolean;
  originalCategory: string;
  branchId?: string;
}

interface MenuCategoryProps {
  id: string;
  title: string;
  items: MenuItem[];
  onEdit?: () => void;
  onDeleteItem?: (itemId: string) => void;
  onUpdateItem?: (
    itemId: string,
    originalCategory: string,
    name: string
  ) => void;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({
  id,
  title,
  items,
  onEdit,
  onDeleteItem,
  onUpdateItem,
}) => {
  const updateItem = (item: MenuItem, name: string) => {
    onUpdateItem?.(item.id, item.originalCategory, name);
  };
  return (
    <div className="bg-primary-50 rounded-2xl p-6 w-[330px]">
      <div className="flex justify-between items-center">
        <h2 className="title-2">{title}</h2>
        <Button
          variant="zuno-orange-light"
          onClick={onEdit}
          style={{ padding: '8px 16px' }}
        >
          <Edit2 className="w-4 h-4 pr-1" />
          <span>edit</span>
        </Button>
      </div>

      <div className="border-b border-primary-500 h-2 mb-6"></div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`bg-white rounded-lg p-4 flex items-center justify-between shadow-sm select-none ${
                  snapshot.isDragging
                    ? 'shadow-lg bg-white cursor-grabbing'
                    : ''
                } ${item.isDeleted ? 'opacity-50' : ''} `}
                style={{
                  ...provided.draggableProps.style,
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                }}
              >
                <div
                  className="flex items-center space-x-3"
                  onClick={() =>
                    document.getElementById(`input-${item.id}`)?.focus()
                  }
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-grab" />
                  <span
                    className={`text-gray-700 ${item.isDeleted ? 'line-through' : ''}`}
                  >
                    <input
                      id={`input-${item.id}`}
                      type="text"
                      value={item.name}
                      onChange={e => updateItem(item, e.target.value)}
                      style={{ color: !item.branchId ? 'green' : '' }}
                      className={`border-b border-transparent focus:outline-none focus:border-orange-500`}
                    />
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
