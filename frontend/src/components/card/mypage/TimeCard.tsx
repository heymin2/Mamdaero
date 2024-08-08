// 마이페이지- 상담 일정 관리 - Times
import React, { useState, useEffect } from 'react';
import Time from '@/pages/mypage/props/time';
import { FiX, FiPlusCircle } from 'react-icons/fi';

const generateTimeOptions = () => {
  return Array.from({ length: 24 }, (_, i) => `${i < 10 ? '0' : ''}${i}`);
};
interface TimeCardProps {
  week: number;
  startTime: number;
  endTime: number;
  times: Time[];
  setEndTime: (startTime: number) => void;
  setStartTime: (endTime: number) => void;
  setTimes: (times: Time[]) => void;
  addTime: (times: Time) => void;
}
// 상품 카드 컴포넌트
const TimeCard: React.FC<TimeCardProps> = props => {
  // states
  const [endTimeOptions, setEndTimeOptions] = useState<string[]>(generateTimeOptions());

  useEffect(() => {
    const startTimeIndex = generateTimeOptions().indexOf(
      props.startTime < 10 ? '0' + props.startTime : props.startTime.toString()
    );
    const newEndTimeOptions = generateTimeOptions().slice(startTimeIndex + 1);
    setEndTimeOptions(newEndTimeOptions);
  }, [props.startTime]);

  // handler
  const addTime = () => {
    const newTimeSlot = {
      week: props.week,
      startTime: props.startTime,
      endTime: props.endTime,
      setStartTime: props.setStartTime,
      setEndTime: props.setEndTime,
      times: props.times,
      setTimes: props.setTimes,
    };
    props.setTimes([...props.times, newTimeSlot]);
  };

  const handleRemoveTime = (index: number) => {
    const newTimes = props.times.filter((_, i) => i !== index);
    props.setTimes(newTimes);
  };
  return (
    <>
      <span className="font-bold">시간 선택</span>
      <article className="flex flex-col gap-3 bg-blue-50 p-10 rounded-3xl border border-blue-500">
        <div className="flex flex-col gap-2 mb-2">
          {/* times 배열 */}
          {props.times.map((time, index) => (
            <div
              key={index}
              className="flex justify-evenly box-content font-bold text-center bg-blue-200 border rounded-full "
            >
              <span>{`${time.startTime < 10 ? '0' + time.startTime : time.startTime} ~ 
                ${time.endTime < 10 ? '0' + time.endTime : time.endTime}`}</span>
              <button onClick={() => handleRemoveTime(index)}>
                <FiX />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <select
            className="bg-white rounded-full border border-blue-500 text-bold"
            value={props.startTime}
            onChange={e => {
              props.setStartTime(Number(e.target.value));
            }}
          >
            {generateTimeOptions().map(time => (
              <option key={time} value={Number(time)}>
                {time}
              </option>
            ))}
          </select>
          <span className="px-1">~</span>
          <select
            className="bg-white rounded-full border border-blue-500 text-bold"
            value={props.endTime}
            onChange={e => props.setEndTime(Number(e.target.value))}
          >
            {endTimeOptions.map(time => (
              <option key={time} value={Number(time)}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <button onClick={addTime} className="bg-transparent mx-auto block font-bold">
          <FiPlusCircle className="inline" />
          시간 추가
        </button>
        <button onClick={addTime}>send data to parent</button>
      </article>
    </>
  );
};
export default TimeCard;
