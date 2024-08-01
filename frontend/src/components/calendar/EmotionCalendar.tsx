// src/components/calendar/CalendarSection.tsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Emotion, getEmotionImage } from '@/pages/emotiondiary/emotion';
import DiaryWriteModal from '@/components/modal/DiaryWriteModal';
import DiaryEditModal from '@/components/modal/DiaryEditModal';
import DiaryViewModal from '@/components/modal/DiaryViewModal';

interface DiaryEntry {
  id: string;
  date: string;
  emotion: Emotion;
  content: string;
}

interface EmotionCalendarProps {
  diaries: DiaryEntry[];
  selectedDate: string | null;
  selectedDiary: DiaryEntry | null;
  isWriteModalOpen: boolean;
  isEditModalOpen: boolean;
  isViewModalOpen: boolean;
  handleDateClick: (arg: { dateStr: string }) => void;
  handleEventClick: (arg: EventClickArg) => void;
  handleWriteDiary: (newDiary: DiaryEntry) => void;
  handleEditDiary: (editedDiary: DiaryEntry) => void;
  handleDeleteDiary: (id: string) => void;
  setIsWriteModalOpen: (isOpen: boolean) => void;
  setIsEditModalOpen: (isOpen: boolean) => void;
  setIsViewModalOpen: (isOpen: boolean) => void;
  setSelectedDate: (date: string | null) => void;
}

const EmotionCalendar: React.FC<EmotionCalendarProps> = ({
  diaries,
  selectedDate,
  selectedDiary,
  isWriteModalOpen,
  isEditModalOpen,
  isViewModalOpen,
  handleDateClick,
  handleEventClick,
  handleWriteDiary,
  handleEditDiary,
  handleDeleteDiary,
  setIsWriteModalOpen,
  setIsEditModalOpen,
  setIsViewModalOpen,
  setSelectedDate,
}) => {
  const renderEventContent = (eventInfo: EventContentArg) => (
    <div className="flex items-center">
      <img src={eventInfo.event.title} alt="emotion" style={{ width: '20px', height: '20px' }} />
    </div>
  );

  return (
    <div className="w-3/4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={diaries.map(diary => ({
          id: diary.id,
          date: diary.date,
          title: getEmotionImage(diary.emotion), // 이미지 경로를 title에 설정
          extendedProps: diary,
        }))}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventContent={renderEventContent} // 커스텀 이벤트 콘텐츠 렌더링
      />
      <DiaryWriteModal
        isOpen={isWriteModalOpen}
        date={selectedDate || new Date().toISOString().split('T')[0]}
        onClose={() => setIsWriteModalOpen(false)}
        onSubmit={handleWriteDiary}
      />
      {selectedDiary && (
        <>
          <DiaryEditModal
            isOpen={isEditModalOpen}
            diary={selectedDiary}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleEditDiary}
          />
          <DiaryViewModal
            isOpen={isViewModalOpen}
            diary={selectedDiary}
            onClose={() => setIsViewModalOpen(false)}
            onEdit={() => {
              setIsViewModalOpen(false);
              setIsEditModalOpen(true);
            }}
            onDelete={handleDeleteDiary}
          />
        </>
      )}
    </div>
  );
};

export default EmotionCalendar;
