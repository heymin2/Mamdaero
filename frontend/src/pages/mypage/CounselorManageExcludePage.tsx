import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/Button';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import TimeSelector from '@/pages/mypage/TimeSelector';
import axiosInstance from '@/api/axiosInstance';
interface ScheduleEntry {
  id: number;
  date: Date;
  time: number;
  is_reserved: boolean;
  is_worktime: boolean;
}

const CounselorManageExcludePage: React.FC = () => {
  // 일정 추가
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState(false);

  // handler
  const navigate = useNavigate();

  // 뒤로가기 버튼
  const backToList = () => {
    navigate('/mypage/counselor');
  };
  const getCurrentDate = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset() * 60000;
    const adjustedTime = new Date(today.getTime() - offset);
    return adjustedTime.toISOString().split('T')[0];
  };
  const handleEventClick = (arg: EventClickArg) => {
    const schedule = arg.event.extendedProps as ScheduleEntry;
    console.log('handleEventClick', schedules);
  };
  const getEventDates = () => {
    const events = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 27);

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      events.push({
        title: `${d.getDay()}`,
        start: new Date(d),
        allDay: true,
      });
    }

    return events;
  };
  const renderEventContent = (eventInfo: { event: { title: string } }) => (
    <div className="flex justify-center items-center h-full">
      <button className="btn btn-xs btn-primary text-xs p-1">{eventInfo.event.title}</button>
    </div>
  );

  return (
    <>
      <header className="flex justify-end my-6 mx-16 text-4xl font-bold gap-4">
        <span className="text-blue-500 me-1">근무 예외</span> 시간관리
        <Button label=" 뒤로가기" shape="rounded" onClick={backToList} color="blue" />
      </header>
      <div className="divider"></div>
      <main className="container p-4 flex space-x-16">
        {/* 캘린더 */}
        <section className="w-3/4 ">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev',
              center: 'title',
              right: 'next',
            }}
            fixedWeekCount={false}
            titleFormat={{ year: 'numeric', month: 'numeric' }}
            height="auto"
            dateClick={function (info) {
              console.log(info);
              setSelectedDay(selectedDay ? false : true);
            }}
            events={getEventDates()}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            eventColor="#fff7ed" // 이벤트 컬러 변경
            selectAllow={function (selectInfo) {
              const offset = new Date().getTimezoneOffset() * 60000;
              const today = new Date();
              today.setDate(today.getDate() - offset);
              const maxDate = new Date();
              maxDate.setDate(today.getDate() + 30);
              if (today <= selectInfo.start && selectInfo.end <= maxDate) {
                return true;
              } else {
                return false;
              }
            }}
          />
        </section>
        {/* 카드 */}
        <section className={selectedDay ? 'block' : 'hidden' + ' w-2/5'}>
          <div className="card bg-base-100 shadow-xl p-4">
            <TimeSelector selectedTimes={selectedTimes} onSelectTimes={setSelectedTimes} />
            <div className="card-body">
              <form>
                <button
                  type="submit"
                  className="btn bg-blue-200 hover:bg-blue-300 text-gray-700 w-full"
                  onClick={e => {
                    e.preventDefault();
                    const currentDate = getCurrentDate();
                    console.log(currentDate);
                  }}
                >
                  적용 하기
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CounselorManageExcludePage;
