import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  onClose: () => void;
  minDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelect, onClose, minDate }) => {
  const [viewDate, setViewDate] = React.useState(selectedDate || new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));
  };

  const isDateDisabled = (date: Date) => {
    if (!minDate) return false;
    return date < new Date(minDate.setHours(0, 0, 0, 0));
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (!isDateDisabled(selected)) {
      onSelect(selected);
      onClose();
    }
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(viewDate);
    const firstDay = getFirstDayOfMonth(viewDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      const isSelected = selectedDate?.getDate() === day && 
                        selectedDate?.getMonth() === viewDate.getMonth() &&
                        selectedDate?.getFullYear() === viewDate.getFullYear();
      const disabled = isDateDisabled(currentDate);

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          disabled={disabled}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
            ${isSelected 
              ? 'bg-secondary text-white' 
              : disabled
                ? 'text-gray-300 cursor-not-allowed'
                : 'hover:bg-secondary-50 text-gray-700'
            }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="absolute right-12 bottom-[-100px] w-64 mt-2 bg-white rounded-lg shadow-lg border p-4 z-[500]">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="font-medium">
          {months[viewDate.getMonth()]} {viewDate.getFullYear()}
        </div>
        <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;