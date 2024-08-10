import React, { useState } from 'react';
import CounselorReservationStatusCard from '@/components/card/mycounsel/CounselorReservationStatusCard';
import CounselorCompletedCard from '@/components/card/mycounsel/CounselorCompletedCard';
import { useNavigate } from 'react-router-dom';
import MyCounselBar from '@/components/navigation/MyCounselBar';

const CounselHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reservation' | 'completed'>('reservation');

  // 예시 데이터를 상태로 관리
  const [reservationData, setReservationData] = useState([
    {
      counselId: '1111',
      clientId: '1',
      clientName: '신혜민',
      date: '2024년 7월 17일',
      time: '13:00',
      status: '예약 완료',
    },
    {
      counselId: '1112',
      clientId: '2',
      clientName: '허세령',
      date: '2024년 7월 18일',
      time: '15:00',
      status: '예약취소 (2024년 7월 10일 16:00)',
    },
    {
      counselId: '1113',
      clientId: '3',
      clientName: '박형준',
      date: '2024년 7월 19일',
      time: '10:00',
      status: '예약 완료',
    },
  ]);

  const completedData = [
    {
      counselId: '1001',
      clientId: '4',
      clientName: '손동희',
      date: '2024년 7월 10일',
      time: '14:00',
      status: '상담 완료',
    },
    {
      counselId: '1002',
      clientId: '5',
      clientName: '이재빈',
      date: '2024년 7월 11일',
      time: '11:00',
      status: '상담 완료',
    },
    {
      counselId: '1003',
      clientId: '6',
      clientName: '박주영',
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
    <div className="flex flex-col min-h-screen">
      <MyCounselBar
        title1="맘대로"
        title2="상담내역"
        subtitle="상담 예약 현황과 지금까지 완료된 상담을 확인하세요!"
        user="counselor"
      />
      <div className="sticky bg-blue-50 top-0 z-10">
        <div role="tablist" className="tabs tabs-lg font-bold border-b-4 border-b-blue-300">
          <a
            className={`tab tab-lg h-14 ${activeTab === 'reservation' ? 'tab-active bg-blue-200 rounded-t-md' : 'bg-blue-50'}`}
            onClick={() => setActiveTab('reservation')}
          >
            예약 현황
          </a>
          <a
            className={`tab tab-lg h-14 ${activeTab === 'completed' ? 'tab-active bg-blue-200 rounded-t-md' : 'bg-blue-50'}`}
            onClick={() => setActiveTab('completed')}
          >
            완료된 상담
          </a>
        </div>
      </div>

      {activeTab === 'reservation' ? (
        <div className="px-4">
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
        <div className="px-4">
          {completedData.length > 0 ? (
            completedData.map(data => <CounselorCompletedCard key={data.counselId} {...data} />)
          ) : (
            <p className="text-center text-gray-500 py-4">완료된 상담이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CounselHistory;
