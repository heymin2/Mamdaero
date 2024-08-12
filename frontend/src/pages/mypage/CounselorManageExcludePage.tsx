import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@/components/button/Button';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import MyCounselBar from '@/components/navigation/MyCounselBar';
import dayjs from 'dayjs';
import useAuthStore from '@/stores/authStore';

interface ScheduleEntry {
  id: number;
  date: string;
  times: number[];
  is_reserved: boolean;
  is_worktime: boolean;
}

const CounselorManageExcludePage: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
  const { memberId } = useParams<{ memberId: string }>();
  const { getEmail } = useAuthStore();
  const currentMemberId = memberId || getEmail()?.split('@')[0] || 'unknown';

  useEffect(() => {
    // 초기 근무 시간 설정 (9시부터 18시까지)
    const initialTimes = Array.from({ length: 10 }, (_, i) => i + 9);
    setSelectedTimes(initialTimes);
    console.log('Initial times set:', initialTimes);
  }, []);

  const handleEventClick = (arg: EventClickArg) => {
    const clickedDate = dayjs(arg.event.start).format('YYYY-MM-DD');
    setSelectedDate(clickedDate);
    console.log('Selected date:', clickedDate);

    const existingSchedule = schedules.find(s => s.date === clickedDate);
    if (existingSchedule) {
      setSelectedTimes(existingSchedule.times);
      console.log('Existing schedule found:', existingSchedule);
    } else {
      // 기본 근무 시간 설정 (9시부터 18시까지)
      const defaultTimes = Array.from({ length: 10 }, (_, i) => i + 9);
      setSelectedTimes(defaultTimes);
      console.log('Default times set:', defaultTimes);
    }
  };

  const renderEventContent = (eventInfo: EventContentArg) => (
    <div className="flex justify-center items-center h-full">
      <button className="btn btn-sm btn-secondary text-gray-50 text-md p-1">
        {eventInfo.event.title}
      </button>
    </div>
  );

  const getEventDates = () => {
    const events = [];
    const startDate = dayjs().add(1, 'day');
    const endDate = startDate.add(27, 'day');

    for (let d = startDate; d.isBefore(endDate) || d.isSame(endDate); d = d.add(1, 'day')) {
      events.push({
        title: '변경하기',
        start: d.toDate(),
        allDay: true,
      });
    }

    return events;
  };

  const handleTimeToggle = (time: number) => {
    setSelectedTimes(prev => {
      const newTimes = prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time].sort((a, b) => a - b);
      return newTimes;
    });
  };

  const handleApply = () => {
    if (selectedDate) {
      const newSchedule: ScheduleEntry = {
        id: schedules.length + 1,
        date: selectedDate,
        times: selectedTimes,
        is_reserved: false,
        is_worktime: true,
      };

      setSchedules(prev => {
        const updatedSchedules = prev.some(s => s.date === selectedDate)
          ? prev.map(s => (s.date === selectedDate ? newSchedule : s))
          : [...prev, newSchedule];
        console.log('Applied new schedule:', newSchedule);
        console.log('Updated schedules:', updatedSchedules);
        return updatedSchedules;
      });

      setSelectedDate(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 bg-blue-50 border-b-2">
        <MyCounselBar
          title1="근무 예외"
          title2="시간 관리"
          subtitle="예기치 못한 스케줄 변경 시, 근무 일정을 손쉽게 수정하세요!"
          buttonLabel="뒤로가기"
          user="counselor"
          buttonPath={`/mypage/${currentMemberId}`}
          size="md"
        />
      </div>
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:space-x-8 max-h-[550px]">
            {/* 캘린더 */}
            <div className="w-full md:w-2/3 mb-6 md:mb-0">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={getEventDates()}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
                headerToolbar={{
                  left: 'prev',
                  center: 'title',
                  right: 'next',
                }}
                eventColor="#ffffff"
                titleFormat={{ year: 'numeric', month: 'numeric' }}
                height="100%"
                aspectRatio={1.35}
              />
            </div>
            {/* 시간 선택 */}
            <div className="w-full md:w-1/3">
              <div className="bg-gray-100 rounded-lg p-4 flex flex-col text-center ">
                <h2 className="text-xl font-bold mt-2">시간 선택</h2>
                <div className="divider"></div>
                <div className="min-h-[400px] flex flex-col justify-center">
                  {selectedDate ? (
                    <div>
                      <p className="text-blue-500 mb-4">선택된 날짜: {selectedDate}</p>
                      <div className="grid grid-cols-2 gap-2 mb-4 max-h-80 overflow-y-auto">
                        {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                          <button
                            key={hour}
                            className={`btn btn-sm ${
                              selectedTimes.includes(hour)
                                ? 'bg-gray-500 text-white'
                                : 'bg-white text-gray-700'
                            }`}
                            onClick={() => handleTimeToggle(hour)}
                          >
                            {hour.toString().padStart(2, '0')}:00
                          </button>
                        ))}
                      </div>
                      <Button label="적용하기" color="blue" size="full" onClick={handleApply} />
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 text-lg">날짜를 선택해주세요 </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CounselorManageExcludePage;
