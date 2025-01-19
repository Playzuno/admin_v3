import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Infinity } from 'lucide-react';
import Calendar from '../ui/Calendar';

interface ExpirationDateProps {
  date: string | null;
  onClear: () => void;
  onSelectDate: (date: Date | null) => void;
}

const ExpirationDate: React.FC<ExpirationDateProps> = ({ date, onClear, onSelectDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (selectedDate: Date) => {
    onSelectDate(selectedDate);
    setShowCalendar(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectDate(null);
    onClear();
  };

  const handleCalendarClick = (e: React.MouseEvent) => {
    if (date) return; // Prevent opening calendar if date exists
    e.stopPropagation();
    setShowCalendar(!showCalendar);
  };

  const getDisplayText = () => {
    if (!date) return 'No expiration';
    return date;
  };

  return (
    <div className="relative">
      <div className={`px-4 py-2 rounded-lg flex items-center justify-between ${
        !date ? 'bg-gray-100' : 'bg-secondary-50'
      }`}>
        <div className="flex items-center space-x-2">
          {!date && <Infinity className="w-4 h-4 text-gray-500" />}
          <span className={!date ? 'text-gray-500' : 'text-secondary'}>
            {getDisplayText()}
          </span>
        </div>
        <div className="flex space-x-1">
          {date ? (
            <button 
              onClick={handleClear}
              className="p-1 hover:bg-secondary-100 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={handleCalendarClick}
              className="p-1 hover:bg-secondary-100 rounded transition-colors"
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      {showCalendar && !date && (
        <Calendar
          selectedDate={null}
          onSelect={handleDateSelect}
          onClose={() => setShowCalendar(false)}
          minDate={new Date()}
        />
      )}
    </div>
  );
};

export default ExpirationDate;