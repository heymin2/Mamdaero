import React, { useState } from 'react';
import Button from '@/components/button/Button';
import { useNavigate } from 'react-router-dom';

interface CounselorCompletedCardProps {
  counselId: string;
  clientId: string;
  clientName: string;
  date: string;
  time: string;
  status: string;
}

const CounselorCompletedCard: React.FC<CounselorCompletedCardProps> = ({
  counselId,
  clientName,
  date,
  time,
  status,
  clientId,
}) => {
  const navigate = useNavigate();
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
          <p>{counselId}</p>
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
            onClick={() => {}}
            size="lg"
            shape="rounded"
            color="gray"
          />
        </div>
      </div>
    </div>
  );
};

export default CounselorCompletedCard;
