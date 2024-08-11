import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/button/Button';
import TimeCard from '@/components/card/mypage/TimeCard';
import WeekSelection from '@/components/card/mypage/WeekSelection';
import MyCounselBar from '@/components/navigation/MyCounselBar';
import Time from './props/time';
import useAuthStore from '@/stores/authStore';

const allWeeks = {
  월: 1,
  화: 2,
  수: 3,
  목: 4,
  금: 5,
  토: 6,
  일: 7,
} as const;

type WeekName = keyof typeof allWeeks;

const CounselorManageTimePage: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const { getEmail } = useAuthStore();
  const currentMemberId = memberId || getEmail()?.split('@')[0] || 'unknown';

  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [weekTimes, setWeekTimes] = useState<{ [key: number]: Time[] }>({});
  const [startTime, setStartTime] = useState<number>(9);
  const [endTime, setEndTime] = useState<number>(10);
  const navigate = useNavigate();

  const handleWeekSelection = (week: number) => {
    setSelectedWeek(week);
  };

  const handleAddTime = (newTime: Time) => {
    setWeekTimes(prev => {
      const currentTimes = prev[selectedWeek!] || [];
      const isDuplicate = currentTimes.some(
        time => time.startTime === newTime.startTime && time.endTime === newTime.endTime
      );
      if (isDuplicate) return prev;

      return {
        ...prev,
        [selectedWeek!]: [...currentTimes, newTime],
      };
    });
  };

  const handleApplyTime = () => {
    console.log(weekTimes);
    // 여기에 시간을 서버에 저장하는 등의 로직을 추가합니다.
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 bg-blue-50 border-b-2 mb-12">
        <MyCounselBar
          title1="상담"
          title2="일정 관리"
          subtitle="상담 일정을 손쉽게 관리하고 업데이트 하세요!"
          buttonLabel="뒤로가기"
          user="counselor"
          buttonPath={`/mypage/${currentMemberId}`}
          size="md"
        />
      </div>
      <div className="flex justify-around px-4">
        <div className="w-1/5 pr-4">
          <div className="bg-white p-5 rounded-xl border-4 mb-4 flex flex-col items-center">
            <h1 className="text-xl font-bold mb-4 text-center">요일 선택</h1>
            <WeekSelection
              allWeeks={allWeeks}
              weeks={Object.keys(weekTimes).map(Number)}
              selectedWeek={selectedWeek}
              setWeeks={handleWeekSelection}
            />
          </div>
        </div>
        <div className="w-1/3 px-4">
          {selectedWeek !== null && (
            <TimeCard
              week={selectedWeek}
              startTime={startTime}
              endTime={endTime}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              times={weekTimes[selectedWeek] || []}
              setTimes={times => setWeekTimes(prev => ({ ...prev, [selectedWeek]: times }))}
              addTime={handleAddTime}
            />
          )}
        </div>
        <div className="w-1/3 pl-4">
          <div className="bg-white p-5 rounded-xl border-4 mb-4">
            <h1 className="text-xl font-bold mb-4 text-center">전체 일정</h1>
            <div className="space-y-3">
              {(Object.keys(allWeeks) as WeekName[]).map(weekName => {
                const weekNum = allWeeks[weekName];
                const times = weekTimes[weekNum];
                return (
                  times && (
                    <div key={weekNum} className="flex flex-col mb-2">
                      <h2 className="font-bold">{weekName}</h2>
                      {times.length > 0 ? (
                        times.map((time, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span>{`${time.startTime < 10 ? '0' : ''}${time.startTime}:00 ~ ${
                              time.endTime < 10 ? '0' : ''
                            }${time.endTime}:00`}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-500">일정이 없습니다.</p>
                      )}
                    </div>
                  )
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Button label="적용하기" shape="rounded" color="blue" onClick={handleApplyTime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorManageTimePage;
