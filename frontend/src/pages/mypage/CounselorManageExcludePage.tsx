import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg, EventContentArg } from '@fullcalendar/core';
import Button from '@/components/button/Button';
import MyCounselBar from '@/components/navigation/MyCounselBar';
import useAuthStore from '@/stores/authStore';
import useCounselorStore from '@/stores/couselorStore';
import { useCounselorWorktime } from '@/hooks/useCounselorWorktime';
import dayjs from 'dayjs';
import { LoadingIndicator, ErrorMessage } from '@/components/StatusIndicators';

const CounselorManageExcludePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const { memberId } = useParams<{ memberId: string }>();
  const { getEmail } = useAuthStore();
  const currentMemberId = memberId || getEmail()?.split('@')[0] || 'unknown';
  const counselorId = useCounselorStore(state => state.id);

  const { workTimes, isLoading, isError, updateWorkTimes } = useCounselorWorktime();

  const handleEventClick = (arg: EventClickArg) => {
    const clickedDate = dayjs(arg.event.start).format('YYYY-MM-DD');
    setSelectedDate(clickedDate);
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const date = dayjs(eventInfo.event.start).format('YYYY-MM-DD');
    const dayWorkTimes = workTimes.filter(wt => wt.date === date);
    const hasWorkTime = dayWorkTimes.some(wt => wt.isWorkTime);

    return (
      <div className="flex justify-center items-center h-full">
        <button
          className={`btn btn-sm ${hasWorkTime ? 'btn-primary' : 'btn-secondary'} text-gray-50 text-md p-1 w-12`}
        >
          {hasWorkTime ? '근무' : '휴무'}
        </button>
      </div>
    );
  };

  const getEventDates = useMemo(() => {
    const events = [];
    const startDate = dayjs();
    const endDate = startDate.add(4, 'week');

    for (let d = startDate; d.isBefore(endDate); d = d.add(1, 'day')) {
      const date = d.format('YYYY-MM-DD');
      const dayWorkTimes = workTimes.filter(wt => wt.date === date);
      const hasWorkTime = dayWorkTimes.some(wt => wt.isWorkTime);

      events.push({
        title: hasWorkTime ? '근무' : '휴무',
        start: d.toDate(),
        allDay: true,
      });
    }

    return events;
  }, [workTimes]);

  const handleTimeToggle = (time: number) => {
    const workTime = workTimes.find(wt => wt.date === selectedDate && wt.time === time);
    if (workTime) {
      updateWorkTimes([{ workTimeId: workTime.id, isWorkTime: !workTime.isWorkTime }]);
    }
  };

  if (!counselorId) return <div>Counselor information not available</div>;
  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorMessage message="FAILED TO LOAD" />;

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
            <div className="w-full md:w-2/3 mb-6 md:mb-0">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={getEventDates}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
                headerToolbar={{
                  left: 'prev',
                  center: 'title',
                  right: 'next',
                }}
                validRange={{
                  start: dayjs().toDate(),
                  end: dayjs().add(4, 'week').toDate(),
                }}
                height="100%"
                eventColor="#ffffff"
                aspectRatio={1.35}
              />
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-gray-100 rounded-lg p-4 flex flex-col text-center ">
                <h2 className="text-xl font-bold mt-2">시간 선택</h2>
                <div className="divider"></div>
                <div className="min-h-[400px] flex flex-col justify-center">
                  <p className="text-blue-500 mb-4">선택된 날짜: {selectedDate}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4 max-h-80 overflow-y-auto">
                    {workTimes
                      .filter(wt => wt.date === selectedDate)
                      .map(workTime => (
                        <button
                          key={workTime.id}
                          className={`btn btn-sm ${
                            workTime.isWorkTime
                              ? 'bg-gray-500 text-white'
                              : 'bg-white text-gray-700'
                          }`}
                          onClick={() => handleTimeToggle(workTime.time)}
                          disabled={workTime.isReserved}
                        >
                          {workTime.time.toString().padStart(2, '0')}:00
                        </button>
                      ))}
                  </div>
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
