import React, { useState, useEffect, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Edit2, MoreVertical, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export interface MenuItem {
  id: string;
  name: string;
  isDeleted?: boolean;
  originalCategory: string;
  branchId?: string;
  videoURL?: string;
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
  isModalOpen?: boolean;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({
  id,
  title,
  items,
  onEdit,
  onDeleteItem,
  onUpdateItem,
  isModalOpen = false,
}) => {
  const updateItem = (item: MenuItem, name: string) => {
    onUpdateItem?.(item.id, item.originalCategory, name);
  };

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (isModalOpen) {
      setOpenMenuId(null);
    }
  }, [isModalOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openMenuId &&
        menuRefs.current[openMenuId] &&
        !menuRefs.current[openMenuId]?.contains(event.target as Node)
      ) {
        setOpenMenuId(null);
      }
    }
    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);
  const onMenuActionClick = (
    action: string,
    itemId: string,
    branchId: string
  ) => {
    switch (action) {
      case 'edit':
        document.getElementById(`input-${itemId}`)?.focus();
        setOpenMenuId(null);
        break;
      case 'delete':
        onDeleteItem?.(itemId);
        setOpenMenuId(null);
        break;
      case 'frames':
        navigate(`/frames/${branchId}/${itemId}`);
        setOpenMenuId(null);
        break;
      case 'train-model':
        // navigate(`/train/${branchId}/${itemId}`);
        break;
      case 'marking':
        console.log('marking', itemId);
        setOpenMenuId(null);
        break;
      case 'view-gallery':
        console.log('view-gallery', itemId);
        setOpenMenuId(null);
        break;
      default:
        setOpenMenuId(null);
    }
  };

  return (
    <div className="bg-neutral-100 rounded-2xl p-6 w-[330px]">
      <div className="flex justify-between items-center">
        <h2 className="title-2">{title}</h2>
        {/* <Button
          variant="zuno-dark"
          onClick={onEdit}
          style={{ padding: '8px 16px' }}
        >
          <Edit2 className="w-4 h-4 pr-1" />
          <span>edit</span>
        </Button> */}
      </div>

      <div className="border-b border-secondary-500 h-2 mb-6"></div>

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
                  className="flex items-center space-x-3 relative"
                  onClick={() =>
                    document.getElementById(`input-${item.id}`)?.focus()
                  }
                >
                  <MoreVertical
                    className="w-4 h-4 text-gray-400 cursor-pointer"
                    onClick={e => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === item.id ? null : item.id);
                    }}
                  />
                  {openMenuId === item.id && (
                    <div
                      ref={el => (menuRefs.current[item.id] = el)}
                      className="dropdown-menu absolute right-0 top-8 mt-2 w-48 rounded-xl border border-brand-400 shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <div className="py-1 flex flex-col gap-2">
                        <button
                          onClick={() =>
                            onMenuActionClick('frames', item.id, item.branchId!)
                          }
                          className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-purple-50 hover:text-purple-900"
                        >
                          Frames
                        </button>
                        <button
                          onClick={() =>
                            onMenuActionClick(
                              'train-model',
                              item.id,
                              item.branchId!
                            )
                          }
                          className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-purple-50 hover:text-purple-900"
                        >
                          Train model
                        </button>
                        <button
                          onClick={() =>
                            onMenuActionClick(
                              'edit',
                              item.id,
                              item.branchId || ''
                            )
                          }
                          className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-purple-50 hover:text-purple-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            onMenuActionClick(
                              'delete',
                              item.id,
                              item.branchId || ''
                            )
                          }
                          className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-purple-50 hover:text-purple-900"
                        >
                          Delete
                        </button>
                        {/* <button
                          onClick={() =>
                            onMenuActionClick(
                              'marking',
                              item.id,
                              item.branchId!
                            )
                          }
                          className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-purple-50 hover:text-purple-900"
                        >
                          Marking
                        </button> */}

                        {/* If your are removing below Marking button means, consider above commented Marking button code also. */}
                        <button
                          onClick={() =>
                            onMenuActionClick(
                              'marking',
                              item.id,
                              item.branchId!
                            )
                          }
                          disabled={true}
                          className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:text-purple-900 disabled:text-gray-300 disabled:cursor-not-allowed"
                        >
                          Marking
                        </button>
                        {/* <button
                          onClick={() =>
                            onMenuActionClick(
                              'view-gallery',
                              item.id,
                              item.branchId!
                            )
                          }
                          className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-purple-50 hover:text-purple-900"
                        >
                          View Gallery
                        </button> */}

                         {/* If your are removing below View Gallery button means, consider above commented View Gallery button code also. */}

                        <button
                          onClick={() =>
                            onMenuActionClick(
                              'view-gallery',
                              item.id,
                              item.branchId!
                            )
                          }
                          disabled={true}
                          className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:text-purple-900 disabled:text-gray-300 disabled:cursor-not-allowed"
                        >
                          View Gallery
                        </button>
                      </div>
                    </div>
                  )}
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
                {/* <button
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
                </button> */}
                <div>
                  {item.videoURL ? (
                    <CheckCircle
                      className="w-6 h-6 text-green-500 cursor-pointer"
                      strokeWidth={1}
                      onClick={() => {
                        if (item.videoURL) {
                          navigator.clipboard.writeText(item.videoURL);
                          toast.success('URL copied to clipboard');
                        }
                      }}
                    />
                  ) : (
                    <img src="/assets/icons/svg/scan.svg" alt="scan" />
                  )}
                </div>
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
