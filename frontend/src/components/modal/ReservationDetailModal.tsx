import React from 'react';
import ModalWrapper from '@/components/modal/ModalWrapper'; // 기본 모달 컴포넌트

interface Reservation {
  reservationId: number;
  counselorName: string;
  itemName: string;
  itemFee: number;
  requirement: string;
  isDiaryShared: boolean;
  isTestShared: boolean;
  date: string;
  time: number;
  status: string;
  canceledAt: string | null;
  canceler: string | null;
}

interface ReservationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservationDetail: Reservation;
}

const ReservationDetailModal: React.FC<ReservationDetailModalProps> = ({
  isOpen,
  onClose,
  reservationDetail,
}) => {
  const {
    reservationId,
    counselorName,
    itemName,
    itemFee,
    requirement,
    isDiaryShared,
    isTestShared,
    date,
    time,
    status,
    canceledAt,
    canceler,
  } = reservationDetail;
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="text-2xl font-bold mb-4">예약 상세 정보</div>
      <div className="flex gap-6">
        <div className="font-bold space-y-2">
          <div>예약 ID</div>
          <div>상담 상품</div>
          <div>상담 비용</div>
          <div>일기 공유</div>
          <div>검사 공유</div>
          <div>요구사항</div>
        </div>
        <div className="space-y-2">
          <div>{reservationId}</div>
          <div>{itemName}</div>
          <div>{itemFee.toLocaleString()}원</div>
          <div>{isDiaryShared ? '예' : '아니오'}</div>
          <div>{isTestShared ? '예' : '아니오'}</div>
          <div>{requirement || '없음'}</div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ReservationDetailModal;
