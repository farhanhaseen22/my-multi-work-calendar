import React, { useState, useEffect, useCallback } from "react";

// Lucide React icons for navigation (simple SVG definitions)
const ChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-chevron-left"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucude-chevron-right"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// Main App Component
const App = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [viewMode, setViewMode] = React.useState("month"); // 'month', 'week', 'day'

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Function to get the number of days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get the first day of the month (0 for Sunday, 1 for Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // --- Navigation Functions ---

  // Go to previous month
  const goToPreviousMonth = React.useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }, []);

  // Go to next month
  const goToNextMonth = React.useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }, []);

  // Go to previous year
  const goToPreviousYear = React.useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(newDate.getFullYear() - 1);
      return newDate;
    });
  }, []);

  // Go to next year
  const goToNextYear = React.useCallback(() => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(newDate.getFullYear() + 1);
      return newDate;
    });
  }, []);

  // Go to today's date
  const goToToday = React.useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  // Handle click on a day in the mini-calendar
  const handleMiniCalendarDayClick = React.useCallback((day) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth(),
        day
      );
      return newDate;
    });
  }, []);

  // --- Render Functions ---

  // Render the days of the month for the main calendar
  const renderMonthDays = () => {
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
                ${
                  isToday
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-indigo-100 dark:hover:bg-gray-700"
                }
                text-gray-800 dark:text-gray-200
                `}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  // Render the mini-calendar
  const renderMiniCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const numDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();

    const days = [];

    // Add empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`mini-empty-${i}`} className="p-1 text-center"></div>
      );
    }

    // Add days
    for (let i = 1; i <= numDays; i++) {
      const isToday =
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      const isSelectedMonthDay = i === currentDate.getDate(); // Highlight the currently selected day in the main calendar

      days.push(
        <div
          key={`mini-day-${i}`}
          onClick={() => handleMiniCalendarDayClick(i)}
          className={`
                p-1 text-center rounded-md cursor-pointer transition-colors duration-100
                ${isToday ? "bg-indigo-500 text-white" : ""}
                ${
                  isSelectedMonthDay && !isToday
                    ? "bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-100"
                    : ""
                }
                ${
                  !isToday && !isSelectedMonthDay
                    ? "hover:bg-gray-200 dark:hover:bg-gray-600"
                    : ""
                }
                text-gray-700 dark:text-gray-300
                `}
        >
          {i}
        </div>
      );
    }

    return (
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
            aria-label="Previous Month (Mini)"
          >
            <ChevronLeft />
          </button>
          <span className="font-semibold text-sm text-gray-800 dark:text-white">
            {currentDate.toLocaleString("default", {
              month: "short",
              year: "numeric",
            })}
          </span>
          <button
            onClick={goToNextMonth}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
            aria-label="Next Month (Mini)"
          >
            <ChevronRight />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
          {daysOfWeek.map((day) => (
            <div
              key={`mini-day-header-${day}`}
              className="text-center font-medium"
            >
              {day.substring(0, 1)}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mini-calendar-grid">{days}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center font-inter p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
        {/* View Mode Toggle */}
        <div className="flex justify-center space-x-2 mb-6">
          <button
            onClick={() => setViewMode("month")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                    ${
                      viewMode === "month"
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }
                `}
          >
            Month
          </button>
          <button
            onClick={() => setViewMode("week")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                    ${
                      viewMode === "week"
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }
                `}
          >
            Week
          </button>
          <button
            onClick={() => setViewMode("day")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                    ${
                      viewMode === "day"
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }
                `}
          >
            Day
          </button>
        </div>

        {/* Calendar Header (Month & Year Navigation) */}
        <div className="flex justify-between items-center mb-6">
          {/* Year Navigation Left */}
          <button
            onClick={goToPreviousYear}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Previous Year"
          >
            <ChevronLeft />
            <ChevronLeft className="-ml-2" /> {/* Double chevron for year */}
          </button>

          {/* Month Navigation Left */}
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Previous Month"
          >
            <ChevronLeft />
          </button>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex-grow text-center">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          {/* Month Navigation Right */}
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Next Month"
          >
            <ChevronRight />
          </button>

          {/* Year Navigation Right */}
          <button
            onClick={goToNextYear}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Next Year"
          >
            <ChevronRight className="-mr-2" /> {/* Double chevron for year */}
            <ChevronRight />
          </button>
        </div>

        {/* Go to Today Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={goToToday}
            className="px-5 py-2 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Today
          </button>
        </div>

        {/* Conditional Rendering based on View Mode */}
        {viewMode === "month" && (
          <>
            {/* Days of the Week */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center font-medium text-sm text-gray-500 dark:text-gray-400"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days of the Month Grid */}
            <div className="grid grid-cols-7 gap-2">{renderMonthDays()}</div>
          </>
        )}

        {viewMode === "week" && (
          <div className="text-center text-gray-600 dark:text-gray-300 py-10">
            Week View is under construction!
            <p className="mt-2 text-sm">
              This would display a single week's events.
            </p>
          </div>
        )}

        {viewMode === "day" && (
          <div className="text-center text-gray-600 dark:text-gray-300 py-10">
            Day View is under construction!
            <p className="mt-2 text-sm">
              This would display events for a single selected day.
            </p>
          </div>
        )}

        {/* Mini-Calendar */}
        {renderMiniCalendar()}
      </div>
    </div>
  );
};
export default App;
