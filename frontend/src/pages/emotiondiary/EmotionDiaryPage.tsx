import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Emotion, getEmotionImage } from '@/pages/emotiondiary/emotion';
import DiaryWriteModal from '@/components/modal/DiaryWriteModal';
import DiaryEditModal from '@/components/modal/DiaryEditModal';
import DiaryViewModal from '@/components/modal/DiaryViewModal';
import { sampleDiaries } from '@/pages/emotiondiary/sampleData';
import EmotionStatisticsBar from '@/components/navigation/EmotionStatisticsBar';
import EmotionBar from '@/components/navigation/EmotionBar';

interface DiaryEntry {
  id: string;
  date: string;
  emotion: Emotion;
  content: string;
  shareWithCounselor: boolean;
}

const EmotionDiaryPage: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>(sampleDiaries);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDiary, setSelectedDiary] = useState<DiaryEntry | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset() * 60000;
    const adjustedTime = new Date(today.getTime() - offset);
    return adjustedTime.toISOString().split('T')[0];
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

  const renderEventContent = (eventInfo: EventContentArg) => (
    <div className="flex w-full justify-center items-center">
      <img
        src={eventInfo.event.title}
        alt="emotion"
        className="w-full h-full object-contain cursor-pointer"
        style={{ width: '50%', height: '50%' }}
      />
    </div>
  );

  return (
    <div>
      <EmotionBar subtitle="오늘의 감정을 기록해보세요!" />
      {showAlert && (
        <div role="alert" className="alert alert-error my-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>오늘 일기는 이미 작성되었습니다.</span>
        </div>
      )}
      <div className="container p-4 flex space-x-16">
        {/* 캘린더 */}
        <div className="w-3/4 ">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={diaries.map(diary => ({
              id: diary.id,
              date: diary.date,
              title: getEmotionImage(diary.emotion),
              extendedProps: diary,
            }))}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            headerToolbar={{
              left: 'prev',
              center: 'title',
              right: 'next',
            }}
            eventColor="#fff7ed" // 이벤트 컬러 변경
            titleFormat={{ year: 'numeric', month: 'numeric' }}
            height="auto"
          />

          <DiaryWriteModal
            isOpen={isWriteModalOpen}
            date={selectedDate || getCurrentDate()}
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
        {/* 카드 */}
        <div className="w-2/5">
          <div className="card bg-base-100 shadow-xl p-4">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold mb-2">{'username'}님</h2>
              <p className="mb-4">오늘 하루는 어떤 기분이었나요?</p>
              <button
                className="btn bg-orange-200 hover:bg-orange-300 text-gray-700 w-full"
                onClick={() => {
                  const currentDate = getCurrentDate();
                  const isDiaryExist = diaries.some(diary => diary.date === currentDate);
                  if (!isDiaryExist) {
                    setSelectedDate(currentDate);
                    setIsWriteModalOpen(true);
                  } else {
                    setShowAlert(true);
                  }
                }}
              >
                오늘의 일기 쓰기
              </button>
              <div className="mt-4">
                <EmotionStatisticsBar diaries={diaries} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionDiaryPage;
