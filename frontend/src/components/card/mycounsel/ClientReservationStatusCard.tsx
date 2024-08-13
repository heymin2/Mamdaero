import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/Button';
import ChatModal from '@/components/modal/ChatModal';
import ReservationDetailModal from '@/components/modal/ReservationDetailModal';
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
}

const fetchReservationDetail = async (reservationId: number) => {
  try {
    const response = await axiosInstance({
      method: 'get',
      url: `cm/reservation/${reservationId}`,
    });
    return response.data;
  } catch (error) {
    alert(`Error fetching reservation detail: ${error}`);

    throw error;
  }
};

const deleteReservation = async (reservationId: number) => {
  try {
    const response = await axiosInstance({
      method: 'delete',
      url: `cm/reservation/${reservationId}`,
    });
    return response.data;
  } catch (error) {
    alert(`Error canceling reservation: ${error}`);
    throw error;
  }
};

const CounselorReservationStatusCard: React.FC<Reservation> = ({
  reservationId,
  counselorId,
  clientName,
  counselorName,
  date,
  time,
  status,
  canceledAt,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [reservationDetail, setReservationDetail] = useState<Reservation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCancelReservation = async () => {
    const isConfirmed = window.confirm('정말 예약을 취소하시겠습니까?');
    if (isConfirmed) {
      setIsLoading(true);
      try {
        await deleteReservation(reservationId);
        setIsDeleted(true);
        alert('예약이 성공적으로 취소되었습니다.');
      } catch (error) {
        alert('예약 취소에 실패했습니다. 다시 시도해 주세요.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isDeleted) {
    return null;
  }

  const handleOpenDetailModal = async () => {
    try {
      const detail = await fetchReservationDetail(reservationId);
      setReservationDetail(detail);
      setIsDetailModalOpen(true);
    } catch (error) {
      alert(`Failed to fetch reservation detail: ${error}`);
    }
  };

  return (
    <div className="border-b-2 border-orange-300 p-6">
      <div className="flex gap-4">
        <h3 className="text-xl font-bold mb-3">{counselorName} 상담사님</h3>
      </div>
      <div className="grid grid-cols-7 gap-4">
        <div className="text-gray-500 col-span-1 space-y-3">
          <p>상담ID</p>
          <p>일자</p>
          <p>시간</p>
          <p>예약 상태</p>
        </div>
        <div className="font-apple-sdgothic-semi-bold col-span-4 space-y-3">
          <div className="flex gap-4 items-center">
            {reservationId}
            <Button
              label="상세보기"
              onClick={handleOpenDetailModal}
              size="xs"
              shape="rounded"
              color="extragray"
              textSize="xs"
            />
          </div>
          <p>{date}</p>
          <p>{time}:00</p>
          <div className="flex gap-4 items-center">
            {status}
            {status === '예약완료' && (
              <Button
                label="예약취소"
                onClick={handleCancelReservation}
                size="xs"
                shape="rounded"
                color="red"
                textSize="xs"
              />
            )}
            {status === '예약취소' && canceledAt && (
              <span className="text-sm text-gray-500">
                (취소일: {new Date(canceledAt).toLocaleString()})
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col col-span-2 items-center mt-4 gap-3">
          {status === '예약완료' && (
            <>
              <Button
                label="1:1 화상 채팅"
                onClick={() =>
                  navigate(`/mycounsel/client/history/facechat/${reservationId}/${counselorId}`)
                }
                size="lg"
                shape="rounded"
                color="orange"
              />
              <Button
                label="1:1 메신저 채팅"
                onClick={() => setIsChatModalOpen(true)}
                size="lg"
                shape="rounded"
                color="gray"
              />
            </>
          )}
        </div>
      </div>
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        memberName={counselorName}
        reservationId={reservationId.toString()}
        user="client"
      />
      {reservationDetail && (
        <ReservationDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          reservationDetail={reservationDetail}
        />
      )}
    </div>
  );
};

export default CounselorReservationStatusCard;
