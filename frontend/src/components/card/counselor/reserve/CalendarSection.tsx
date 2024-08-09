// src/components/counselor/reserve/CalendarSection.tsx

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

interface CalendarSectionProps {
  selectedDate: string | null;
  setSelectedDate: (date: string) => void;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ selectedDate, setSelectedDate }) => {
  const handleEventClick = (info: { event: { startStr: string } }) => {
    setSelectedDate(info.event.startStr);
  };

  const renderEventContent = (eventInfo: { event: { title: string } }) => (
    <div className="flex justify-center items-center h-full">
      <button className="btn btn-xs btn-primary text-xs p-1">{eventInfo.event.title}</button>
    </div>
  );

  const getEventDates = () => {
    const events = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 27);

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      events.push({
        title: '예약하기',
        start: new Date(d),
        allDay: true,
      });
    }

    return events;
  };

  return (
    <div>
      <div className="flex items-end border-b-4 border-b-orange-400 mb-4 space-x-5">
        <div className="text-xl font-bold">날짜 선택</div>
        <div className="text-sm">예약 가능 날짜 중에 선택해주세요.</div>
      </div>
      <div className="rounded-2xl overflow-hidden shadow-md">
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
          eventColor="#fff7ed"
          titleFormat={{ year: 'numeric', month: 'numeric' }}
          height="auto"
          contentHeight="auto"
        />
      </div>
      {selectedDate && (
        <div className="mt-2 text-sm text-orange-500">
          선택된 날짜: {new Date(selectedDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default CalendarSection;
