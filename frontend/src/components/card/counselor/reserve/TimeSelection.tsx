// src/components/counselor/reserve/TimeSelection.tsx

import React from 'react';

interface TimeSelectionProps {
  availableTimes: string[];
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
}

const TimeSelection: React.FC<TimeSelectionProps> = ({
  availableTimes,
  selectedTime,
  setSelectedTime,
}) => {
  return (
    <div>
      <div className="flex items-end font-bold border-b-4 border-b-orange-400 mb-4">
        <div className="text-xl">시간 선택</div>
      </div>
      <div className="grid grid-cols-6 gap-3">
        {availableTimes.map(time => (
          <button
            key={time}
            className={`btn ${
              selectedTime === time ? 'btn-primary' : 'btn-outline btn-primary bg-white'
            } rounded-full`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelection;
