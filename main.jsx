import React, { useState, useEffect, useCallback } from 'react';

// Main App Component
const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Function to get the number of days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get the first day of the month (0 for Sunday, 1 for Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Function to navigate to the previous month
  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }, []);

  // Function to navigate to the next month
  const goToNextMonth = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }, []);

  // Effect to ensure the date object is always fresh for rendering
  useEffect(() => {
    // This effect can be used for any side effects related to currentDate changes
    // For now, it just ensures the state is updated if the underlying date changes for some reason.
  }, [currentDate]);

  // Render the days of the month
  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const numDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date(); // Get today's date for highlighting

    const days = [];

    // Add empty cells for the days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 text-center"></div>);
    }

    // Add the days of the month
    for (let i = 1; i <= numDays; i++) {
      const isToday =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      days.push(
        <div
          key={`day-${i}`}
          className={`
            p-2 text-center rounded-lg cursor-pointer transition-all duration-200
            ${isToday ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-indigo-100 dark:hover:bg-gray-700'}
            text-gray-800 dark:text-gray-200
          `}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center font-inter p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Previous Month"
          >
            <ChevronLeft />
          </button>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Next Month"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Days of the Week */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center font-medium text-sm text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Days of the Month Grid */}
        <div className="grid grid-cols-7 gap-2">
          {renderDays()}
        </div>
      </div>
    </div>
  );
};

export default App;
