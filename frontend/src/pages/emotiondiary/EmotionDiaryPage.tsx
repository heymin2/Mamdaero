import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Emotion, getEmoji } from '@/pages/emotiondiary/emotion';
import DiaryWriteModal from '@/components/modal/DiaryWriteModal';
import DiaryEditModal from '@/components/modal/DiaryEditModal';
import DiaryViewModal from '@/components/modal/DiaryViewModal';
import { sampleDiaries } from '@/pages/emotiondiary/sampleData';
import EmotionBar from '@/components/navigation/EmotionBar';
import EmotionStatisticsBar from '@/components/navigation/EmotionStatisticsBar';

interface DiaryEntry {
  id: string;
  date: string;
  emotion: Emotion;
  content: string;
}

const EmotionDiaryPage: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>(sampleDiaries);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDiary, setSelectedDiary] = useState<DiaryEntry | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleDateClick = (arg: { dateStr: string }) => {
    if (arg.dateStr === new Date().toISOString().split('T')[0]) {
      setSelectedDate(arg.dateStr);
      setIsWriteModalOpen(true);
    }
  };

  const handleEventClick = (arg: EventClickArg) => {
    const diary = arg.event.extendedProps as DiaryEntry;
    if (diary) {
      setSelectedDiary(diary);
      setIsViewModalOpen(true);
    }
  };

  const handleWriteDiary = (newDiary: DiaryEntry) => {
    setDiaries([...diaries, newDiary]);
    setIsWriteModalOpen(false);
  };

  const handleEditDiary = (editedDiary: DiaryEntry) => {
    setDiaries(diaries.map(diary => (diary.id === editedDiary.id ? editedDiary : diary)));
    setIsEditModalOpen(false);
  };

  const handleDeleteDiary = (id: string) => {
    setDiaries(diaries.filter(diary => diary.id !== id));
    setIsViewModalOpen(false);
  };

  return (
    <div>
      <EmotionBar subtitle="오늘의 감정을 기록해보세요!" />
      {/*  */}
      <div className="container mx-auto p-4 flex">
        <div className="w-3/4">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={diaries.map(diary => ({
              id: diary.id,
              date: diary.date,
              title: getEmoji(diary.emotion),
              extendedProps: diary,
            }))}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
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
        {/*  */}
        <div className="w-1/4 pr-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">{'username'}님</h2>
            <p className="mb-4">오늘 하루 어땠나요? 기록해보세요!</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => {
                setSelectedDate(new Date().toISOString().split('T')[0]);
                setIsWriteModalOpen(true);
              }}
            >
              오늘의 일기 쓰기
            </button>
            <div>
              <EmotionStatisticsBar diaries={diaries} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionDiaryPage;
