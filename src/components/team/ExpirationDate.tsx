import React, { useState } from 'react';
import { X, Calendar as CalendarIcon } from 'lucide-react';
import Calendar from '../ui/Calendar';

interface ExpirationDateProps {
  date: string;
  onClear: () => void;
  onSelectDate: (date: Date) => void;
}

const ExpirationDate: React.FC<ExpirationDateProps> = ({ date, onClear, onSelectDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const isPlaceholder = date === 'Expiration date';

  const handleDateSelect = (selectedDate: Date) => {
    onSelectDate(selectedDate);
    setShowCalendar(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClear();
  };

  const handleCalendarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="relative">
      <div className={`px-4 py-2 rounded-lg flex items-center justify-between ${
        isPlaceholder ? 'bg-gray-100' : 'bg-secondary-50'
      }`}>
        <span className={isPlaceholder ? 'text-gray-500' : 'text-secondary'}>
          {date}
        </span>
        <div className="flex space-x-1">
          <button 
            onClick={handleClear}
            className="p-1 hover:bg-secondary-100 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <button 
            onClick={handleCalendarClick}
            className="p-1 hover:bg-secondary-100 rounded transition-colors"
          >
            <CalendarIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {showCalendar && (
        <Calendar
          selectedDate={date === 'Expiration date' ? null : new Date(date)}
          onSelect={handleDateSelect}
          onClose={() => setShowCalendar(false)}
        />
      )}
    </div>
  );
};

export default ExpirationDate;