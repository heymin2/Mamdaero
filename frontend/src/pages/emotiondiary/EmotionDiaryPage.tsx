import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import EmotionBar from '@/components/navigation/EmotionBar';

type Emotion = '😊' | '😡' | '😢' | '😤' | '😰' | '😔';

interface DiaryEntry {
  id: string;
  date: string;
  content: string;
  emotion: Emotion;
  sharedWithCounselor: boolean;
}

const emotions: { [key: string]: Emotion } = {
  행복해요: '😊',
  화나요: '😡',
  우울해요: '😢',
  짜증나요: '😤',
  불안해요: '😰',
  슬퍼요: '😔',
};

const EmotionCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newEntry, setNewEntry] = useState<Omit<DiaryEntry, 'id' | 'date'>>({
    content: '',
    emotion: '😊',
    sharedWithCounselor: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);

  const username = '사용자'; // 실제로는 로그인 정보에서 가져와야 합니다

  useEffect(() => {
    // 오늘 날짜 기준으로 이전 일주일간의 샘플 데이터 생성
    const today = new Date();
    const sampleData: DiaryEntry[] = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - i));
      return {
        id: i.toString(),
        date: date.toISOString().split('T')[0],
        content: `${7 - i}일 전의 일기 내용입니다.`,
        emotion:
          Object.values(emotions)[Math.floor(Math.random() * Object.values(emotions).length)],
        sharedWithCounselor: Math.random() > 0.5,
      };
    });
    setDiaryEntries(sampleData);
  }, []);

  const renderCalendarDays = () => {
    const days = [];
    const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    for (let i = 1; i <= endDate.getDate(); i++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const dateString = currentDate.toISOString().split('T')[0];
      const entry = diaryEntries.find(e => e.date === dateString);
      const isToday = currentDate.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={i}
          className={`p-2 text-center ${isToday ? 'bg-blue-100 rounded' : ''}`}
          onClick={() => handleDayClick(dateString)}
        >
          <div>{i}</div>
          {entry && <div className="text-2xl cursor-pointer">{entry.emotion}</div>}
        </div>
      );
    }

    return days;
  };

  const handleDayClick = (date: string) => {
    const entry = diaryEntries.find(e => e.date === date);
    if (entry) {
      setSelectedDate(date);
      setNewEntry({
        content: entry.content,
        emotion: entry.emotion,
        sharedWithCounselor: entry.sharedWithCounselor,
      });
      setViewMode(true);
      setEditMode(false);
      setShowModal(true);
    }
  };

  const handleNewEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    setNewEntry({ content: '', emotion: '😊', sharedWithCounselor: false });
    setEditMode(false);
    setViewMode(false);
    setShowModal(true);
  };

  const saveEntry = () => {
    if (selectedDate) {
      const updatedEntries = editMode
        ? diaryEntries.map(e => (e.date === selectedDate ? { ...e, ...newEntry } : e))
        : [...diaryEntries, { id: Date.now().toString(), date: selectedDate, ...newEntry }];
      setDiaryEntries(updatedEntries);
      setShowModal(false);
    }
  };

  const deleteEntry = () => {
    if (selectedDate) {
      const updatedEntries = diaryEntries.filter(e => e.date !== selectedDate);
      setDiaryEntries(updatedEntries);
      setShowModal(false);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setViewMode(false);
  };

  const emotionStats = diaryEntries.reduce(
    (acc, entry) => {
      acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
      return acc;
    },
    {} as Record<Emotion, number>
  );

  return (
    <div>
      <EmotionBar subtitle="오늘의 감정을 기록해보세요!" />
      <div className="container mx-auto p-4 flex">
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
                )
              }
            >
              <FaChevronLeft />
            </button>
            <div>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
                )
              }
            >
              <FaChevronRight />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="font-bold text-center">
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-[500px]">
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">날짜</span>
                  <span className="font-semibold">{selectedDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>오늘의 감정</span>
                  {Object.values(emotions).map(emoji => (
                    <button
                      key={emoji}
                      className={`text-2xl ${newEntry.emotion === emoji ? 'opacity-100' : 'opacity-50'}`}
                      onClick={() => setNewEntry({ ...newEntry, emotion: emoji })}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* 상담사 공개 체크박스 */}
              <div className="bg-orange-100 px-4 py-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newEntry.sharedWithCounselor}
                    onChange={e =>
                      setNewEntry({ ...newEntry, sharedWithCounselor: e.target.checked })
                    }
                    className="mr-2"
                  />
                  상담사 공개
                </label>
              </div>

              {/* 일기 내용 */}
              <div className="p-4">
                <textarea
                  className="w-full h-40 p-2 border rounded mb-2 resize-none"
                  value={newEntry.content}
                  onChange={e => setNewEntry({ ...newEntry, content: e.target.value })}
                  placeholder="오늘의 감정을 기록하세요..."
                  readOnly={viewMode}
                />
              </div>

              {/* 모달 푸터 */}
              <div className="bg-gray-100 px-4 py-3 rounded-b-lg flex justify-end">
                {viewMode ? (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleEdit}
                  >
                    수정하기
                  </button>
                ) : (
                  <button
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                    onClick={saveEntry}
                  >
                    {editMode ? '수정 완료' : '작성 완료'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="w-1/4 pr-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">{username}님</h2>
            <p className="mb-4">오늘 하루 어땠나요? 기록해보세요!</p>
            <button className="btn btn-primary w-full mb-4" onClick={handleNewEntry}>
              일기 작성하기
            </button>
            <h3 className="text-lg font-semibold mb-2">감정 통계</h3>
            {Object.entries(emotionStats).map(([emotion, count]) => (
              <div key={emotion} className="flex items-center mb-2">
                <span className="text-2xl mr-2">{emotion}</span>
                <div className="bg-gray-200 h-4 flex-grow rounded">
                  <div
                    className="bg-blue-500 h-full rounded"
                    style={{ width: `${(count / diaryEntries.length) * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionCalendar;
