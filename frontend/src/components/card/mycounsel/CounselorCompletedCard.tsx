import React, { useState } from 'react';
import Button from '@/components/button/Button';
import { useNavigate } from 'react-router-dom';
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
  clientName: string;
  counselorId: string;
  clientId: string;
}

const CounselorCompletedCard: React.FC<Reservation> = ({
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
  clientName,
  clientId,
}) => {
  const navigate = useNavigate();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  return (
    <div className="border-b-2 border-blue-300 p-6">
      <h3 className="text-xl font-bold mb-3">{clientName} 님</h3>
      <div className="grid grid-cols-7 gap-4">
        <div className="text-gray-500 col-span-1 space-y-3">
          <p>상담ID</p>
          <p>일자</p>
          <p>시간</p>
          <p>현재 상태</p>
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
          <p>{time}</p>
          <p className="text-green-600 font-bold">{status}</p>
        </div>
        <div className="flex flex-col col-span-2 items-center mt-3 gap-3">
          <Button
            label="상담 기록 보기"
            onClick={() => {
              navigate(`/mycounsel/counselor/record/${clientId}`);
            }}
            size="lg"
            shape="rounded"
            color="blue"
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
      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        memberName={clientName}
        reservationId={reservationId.toString()}
        user="counselor"
      />
    </div>
  );
};

export default CounselorCompletedCard;
