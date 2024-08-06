import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlusCircle, FiXCircle } from 'react-icons/fi';
import Button from '@/components/button/Button';
import TimeCard from '@/components/card/mypage/TimeCard';
import WeekSelection from '@/components/card/mypage/WeekSelection';
import Time from './props/time';

const CounselorManageTimePage: React.FC = () => {
  const week = 0;
  const [weeks, setWeeks] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(9);
  const [endTime, setEndTime] = useState<number>(10);
  const [times, setTimes] = useState<Time[]>([]);
  const [availableWeeks, setAvailableWeeks] = useState<string[]>([]);
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/mypage/counselor');
  };

  const allWeeks = { 월: 1, 화: 2, 수: 3, 목: 4, 금: 5, 토: 6, 일: 7 };

  const handleAddTime = (newTime: Time) => {
    setTimes([...times, newTime]);
  };
  const applyTime = () => {
    console.log('시간 적용하기');
  };

  return (
    <div>
      <header className="flex justify-between items-center">
        <h1 className="text-black text-xl font-bold">상담 일정 관리</h1>
        <Button label=" 뒤로가기" size="md" onClick={backToList} shape="rounded" color="blue" />
      </header>
      <div className="divider"></div>
      <main className="flex justify-around">
        <section className="flex flex-col flex-wrap items-center gap-4 p-5 border border-blue-500 bg-blue-100 rounded-xl">
          <WeekSelection allWeeks={allWeeks} weeks={weeks} week={week} setWeeks={setWeeks} />
        </section>
        <section>
          <TimeCard
            week={week}
            startTime={startTime}
            endTime={endTime}
            times={times}
            setEndTime={setEndTime}
            setStartTime={setStartTime}
            setTimes={setTimes}
            addTime={handleAddTime}
          />
        </section>
        <section>
          <div className="flex flex-col">
            {weeks.map(week => (
              <div key={week} className="flex flex-col">
                {times.map((time, index) => (
                  <span key={index}>{`${week} ${time.startTime} ${time.endTime}`}</span>
                ))}
              </div>
            ))}
          </div>
          <span className="my-auto">
            <Button
              label="적용하기"
              color="blue"
              shape="rounded"
              onClick={applyTime}
              size="lg"
              textSize="xl"
            />
          </span>
        </section>
      </main>
    </div>
  );
};
export default CounselorManageTimePage;
