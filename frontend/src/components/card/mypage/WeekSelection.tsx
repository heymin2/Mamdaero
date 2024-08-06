// src/components/counselor/reserve/TimeSelection.tsx

import React from 'react';

interface WeekSelectionProps {
  allWeeks: Record<string, number>;
  week: number;
  weeks: number[];
  setWeeks: (weeks: number[]) => void;
}
const WeekSelection: React.FC<WeekSelectionProps> = ({ allWeeks, week, weeks, setWeeks }) => {
  return (
    <div>
      <div className="flex items-end font-bold border-b-4 border-blue-400 mb-4">
        <span className="box-border text-lg flex-1 font-bold">요일 선택</span>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {Object.keys(allWeeks).map((day: string) => {
          const value = allWeeks[day];
          const isWeekInWeeks = weeks.includes(value);

          return (
            <React.Fragment key={day}>
              <button
                className={`btn ${
                  isWeekInWeeks ? 'btn-primary' : 'btn-outline btn-primary bg-white'
                } rounded-full`}
                onClick={() => {
                  const newWeeks = isWeekInWeeks
                    ? weeks.filter(week => week !== value)
                    : [...weeks, value];
                  console.log(newWeeks);
                  setWeeks(newWeeks);
                }}
              >
                {day}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default WeekSelection;
