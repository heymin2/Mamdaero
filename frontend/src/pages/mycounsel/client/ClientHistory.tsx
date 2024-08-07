import React, { useState } from 'react';
import ClientReservationStatusCard from '@/components/card/mycounsel/ClientReservationStatusCard';
import ClientCompletedCard from '@/components/card/mycounsel/ClientCompletedCard';

const ClientHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reservation' | 'completed'>('reservation');

  // 예시 데이터를 상태로 관리
  const [reservationData, setReservationData] = useState([
    {
      counselId: '1113',
      counselorId: '7',
      counselorName: '박민준',
      date: '2024년 7월 19일',
      time: '10:00',
      status: '예약 완료',
    },
  ]);

  const completedData = [
    {
      counselId: '1001',
      counselorId: '1',
      counselorName: '신혜민',
      date: '2024년 7월 10일',
      time: '14:00',
      status: '상담 완료',
    },
    {
      counselId: '1002',
      counselorId: '5',
      counselorName: '허세령',
      date: '2024년 7월 11일',
      time: '11:00',
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
    <div className="flex flex-col min-h-screen p-3">
      <div className="sticky bg-orange-50 top-0 z-10 pt-4">
        <div role="tablist" className="tabs tabs-lg font-bold border-b-4 border-b-orange-300">
          <a
            className={`tab tab-lg h-14 ${activeTab === 'reservation' ? 'tab-active bg-orange-200 rounded-t-md' : 'bg-orange-50'}`}
            onClick={() => setActiveTab('reservation')}
          >
            예약 현황
          </a>
          <a
            className={`tab tab-lg h-14 ${activeTab === 'completed' ? 'tab-active bg-orange-200 rounded-t-md' : 'bg-orange-50'}`}
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
              <ClientReservationStatusCard
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
            completedData.map(data => <ClientCompletedCard key={data.counselId} {...data} />)
          ) : (
            <p className="text-center text-gray-500 py-4">완료된 상담이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientHistory;
