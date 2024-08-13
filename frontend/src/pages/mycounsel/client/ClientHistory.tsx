import React, { useState, useEffect } from 'react';
import ClientReservationStatusCard from '@/components/card/mycounsel/ClientReservationStatusCard';
import ClientCompletedCard from '@/components/card/mycounsel/ClientCompletedCard';
import MyCounselBar from '@/components/navigation/MyCounselBar';
import axiosInstance from '@/api/axiosInstance';

interface Reservation {
  canceledAt: string | null;
  canceler: string | null;
  date: string;
  isDiaryShared: boolean;
  isTestShared: boolean;
  itemFee: number;
  itemName: string;
  requirement: string;
  reservationId: number;
  status: string;
  time: number;
  counselorName: string;
  clientName: string;
  counselorId: string;
  clientId: string;
}

const fetchReservation = async () => {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: 'cm/reservation',
    });

    const reservationCompleted: Reservation[] = [];
    const reservationHistory: Reservation[] = [];

    response.data.data.forEach((reservation: Reservation) => {
      if (reservation.status === '상담완료') {
        reservationCompleted.push(reservation);
      } else {
        reservationHistory.push(reservation);
      }
    });
    return { reservationCompleted, reservationHistory };
  } catch (error) {
    alert(`Error fetching reservations: ${error}`);
    throw error;
  }
};
const ClientHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reservation' | 'completed'>('reservation');
  const [reservationCompleted, setReservationCompleted] = useState<Reservation[]>([]);
  const [reservationHistory, setReservationHistory] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { reservationCompleted, reservationHistory } = await fetchReservation();
        setReservationCompleted(reservationCompleted);
        setReservationHistory(reservationHistory);
      } catch (error) {
        alert(`Failed to fetch reservations: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <MyCounselBar
        title1="맘대로"
        title2="상담내역"
        subtitle="상담 예약 현황과 지금까지 완료된 상담을 확인하세요!"
        user="client"
      />
      <div className="sticky bg-orange-50 top-0 z-10">
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
          {reservationHistory.length > 0 ? (
            reservationHistory.map(reservation => (
              <ClientReservationStatusCard key={reservation.reservationId} {...reservation} />
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">예약된 상담이 없습니다.</p>
          )}
        </div>
      ) : (
        <div className="px-4">
          {reservationCompleted.length > 0 ? (
            reservationCompleted.map(reservation => (
              <ClientCompletedCard key={reservation.reservationId} {...reservation} />
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">완료된 상담이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientHistory;
