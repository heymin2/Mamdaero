import React from 'react';

interface WeekSelectionProps {
  allWeeks: Record<string, number>;
  weeks: number[];
  selectedWeek: number | null;
  setWeeks: (week: number) => void;
}

const WeekSelection: React.FC<WeekSelectionProps> = ({
  allWeeks,
  weeks,
  selectedWeek,
  setWeeks,
}) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {Object.keys(allWeeks).map((day: string) => {
        const value = allWeeks[day];
        const isSelected = weeks.includes(value);
        const isCurrentlySelected = selectedWeek === value;

        return (
          <button
            key={day}
            className={`btn rounded-full w-16 h-16 flex items-center justify-center text-sm font-medium ${
              isCurrentlySelected
                ? 'bg-gray-300 text-black'
                : isSelected
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-blue-500'
            }`}
            onClick={() => setWeeks(value)}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
};

export default WeekSelection;
