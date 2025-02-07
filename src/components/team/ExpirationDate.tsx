import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Infinity } from 'lucide-react';
import Calendar from '../ui/Calendar';
import { ExpireMode } from '@/types';

interface ExpirationDateProps {
  date: Date | null;
  onClear: () => void;
  onSelectDate: (date: Date | null) => void;
  expireMode: ExpireMode;
}

const ExpirationDate: React.FC<ExpirationDateProps> = ({
  date,
  onClear,
  onSelectDate,
  expireMode,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (selectedDate: Date) => {
    // console.log(selectedDate)
    onSelectDate(selectedDate);
    setShowCalendar(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectDate(null);
    onClear();
  };

  const handleCalendarClick = (e: React.MouseEvent) => {
    // if (date) return; // Prevent opening calendar if date exists
    e.stopPropagation();
    setShowCalendar(!showCalendar);
  };

  const getDisplayText = () => {
    if (expireMode === ExpireMode.INFINITE) return 'No expiration';
    if (!date) return 'Not set';
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const infinite = expireMode === ExpireMode.INFINITE;
  const notSet = !date || expireMode === ExpireMode.INFINITE;
  return (
    <div className="relative">
      <div
        className={`px-4 py-2 rounded-lg flex items-center justify-between ${
          notSet ? 'bg-gray-100' : 'bg-[#EEE9FD]'
        }`}
      >
        <div className="flex items-center space-x-2">
          {infinite && <Infinity className="w-4 h-4 text-gray-500" />}
          <span className={notSet ? 'text-gray-500' : 'text-brand'}>
            {getDisplayText()}
          </span>
        </div>
        <div className="flex space-x-1">
          {!notSet ? (
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

      {showCalendar && notSet && (
        <Calendar
          selectedDate={date}
          onSelect={handleDateSelect}
          onClose={() => setShowCalendar(false)}
          minDate={new Date()}
        />
      )}
    </div>
  );
};

export default ExpirationDate;
