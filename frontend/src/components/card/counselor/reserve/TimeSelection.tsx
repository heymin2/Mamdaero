import React from 'react';

interface TimeSelectionProps {
  availableTimes: number[];
  selectedTime: number | null;
  setSelectedTime: (time: number) => void;
}

const TimeSelection: React.FC<TimeSelectionProps> = ({
  availableTimes,
  selectedTime,
  setSelectedTime,
}) => {
  // 시간을 "HH:00" 형식의 문자열로 변환하는 함수
  const formatTime = (hour: number): string => {
    return `${String(hour).padStart(2, '0')}:00`;
  };
  console.log(availableTimes);
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
            {formatTime(time)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelection;
