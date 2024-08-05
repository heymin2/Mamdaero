import React, { useState } from 'react';
import CounselorReservationStatusCard from '@/components/card/mycounsel/CounselorReservationStatusCard';
import CounselorCompletedCard from '@/components/card/mycounsel/CounselorCompletedCard';

const CounselHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reservation' | 'completed'>('reservation');

  // 예시 데이터를 상태로 관리
  const [reservationData, setReservationData] = useState([
    {
      counselId: '1111',
      counselorName: '박민준',
      clientName: '손동희',
      date: '2024년 7월 17일',
      time: '13:00',
      status: '예약 완료',
    },
    {
      counselId: '1112',
      counselorName: '김지원',
      clientName: '이서연',
      date: '2024년 7월 18일',
      time: '15:00',
      status: '예약취소',
    },
    {
      counselId: '1113',
      counselorName: '정현우',
      clientName: '최예진',
      date: '2024년 7월 19일',
      time: '10:00',
      status: '예약 완료',
    },
  ]);

  const completedData = [
    {
      counselId: '1001',
      counselorName: '이민서',
      clientName: '박지훈',
      date: '2024년 7월 10일',
      time: '14:00',
      status: '상담 완료',
    },
    {
      counselId: '1002',
      counselorName: '송하은',
      clientName: '김도윤',
      date: '2024년 7월 11일',
      time: '11:00',
      status: '상담 완료',
    },
    {
      counselId: '1003',
      counselorName: '황서준',
      clientName: '정수빈',
      date: '2024년 7월 12일',
      time: '16:00',
      status: '상담 완료',
    },
  ];

  // 예약 취소 핸들러
  const handleCancelReservation = (counselId: string) => {
    setReservationData(prevData =>
      prevData.filter(reservation => reservation.counselId !== counselId)
    );
  };

  return (
    <div>
      <div className="container mx-auto p-8">
        <div role="tablist" className="tabs tabs-lifted tabs-lg mb-4 font-bold">
          <a
            className={`tab tab-lg h-16 ${activeTab === 'reservation' ? 'tab-active [--tab-bg:#93c5fd] [--tab-border-color:#93c5fd]' : '[--tab-border-color:#93c5fd]'}`}
            onClick={() => setActiveTab('reservation')}
          >
            예약 현황
          </a>
          <a
            className={`tab tab-lg h-16 ${activeTab === 'completed' ? 'tab-active [--tab-bg:#93c5fd] [--tab-border-color:#93c5fd]' : '[--tab-border-color:#93c5fd]'}`}
            onClick={() => setActiveTab('completed')}
          >
            완료된 상담
          </a>
        </div>

        {activeTab === 'reservation' ? (
          <div>
            {reservationData.length > 0 ? (
              reservationData.map(data => (
                <CounselorReservationStatusCard
                  key={data.counselId}
                  {...data}
                  onDelete={handleCancelReservation}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">예약된 상담이 없습니다.</p>
            )}
          </div>
        ) : (
          <div>
            {completedData.map(data => (
              <CounselorCompletedCard key={data.counselId} {...data} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CounselHistory;
