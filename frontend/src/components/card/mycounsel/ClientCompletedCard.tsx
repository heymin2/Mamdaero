import React, { useState } from 'react';
import Button from '@/components/button/Button';
import ReviewWriteModal from '@/components/modal/ReviewWriteModal';
import ChatModal from '@/components/modal/ChatModal';

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
  counselorId: string;
}

const ClientCompletedCard: React.FC<Reservation> = ({
  reservationId,
  counselorId,
  counselorName,
  date,
  time,
  status,
  itemName,
  itemFee,
  requirement,
  isDiaryShared,
  isTestShared,
  canceledAt,
  canceler,
  ...otherProps
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  return (
    <div className="border-b-2 border-orange-300 p-6">
      <h3 className="text-xl font-bold mb-3">{counselorName} 상담사님</h3>
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
              onClick={() => setIsDetailModalOpen(true)}
              size="xs"
              shape="rounded"
              color="extragray"
              textSize="xs"
            />
          </div>
          <p>{date}</p>
          <p>{time}:00</p>
          <p className="text-green-600 font-bold">{status}</p>
        </div>
        <div className="flex flex-col col-span-2 items-center mt-3 gap-3">
          <Button
            label="리뷰쓰기"
            onClick={() => setIsReviewModalOpen(true)}
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
        </div>
      </div>
      <ReviewWriteModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        counselorName={counselorName}
        date={date}
        time={`${time}:00`}
      />
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        memberName={counselorName}
        reservationId={reservationId.toString()}
        user="client"
      />
    </div>
  );
};

export default ClientCompletedCard;
