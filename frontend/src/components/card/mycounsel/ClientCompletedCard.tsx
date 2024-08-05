import React from 'react';
import Button from '@/components/button/Button';

interface CounselorCompletedCardProps {
  counselId: string;
  counselorName: string;
  clientName: string;
  date: string;
  time: string;
  status: string;
}

const CounselorCompletedCard: React.FC<CounselorCompletedCardProps> = ({
  counselId,
  counselorName,
  clientName,
  date,
  time,
  status,
}) => {
  return (
    <div className="border-b-2 border-blue-300 py-4 mb-4 p-4">
      <div className="flex justify-between items-center mb-2 p-2">
        <h3 className="flex text-gray-500 items-center text-xl font-semibold space-x-3">
          <span className="text-black">{counselorName} 상담사 </span>
        </h3>
        <span className="text-green-600 h-9 font-semibold">{status}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <p>상담ID: {counselId}</p>
          <p>상담사: {counselorName}</p>
          <p>일자: {date}</p>
        </div>
        <div>
          <p>내담자: {clientName}</p>
          <p>시간: {time}</p>
          <p>현재 상태: {status}</p>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          label="리뷰 작성하기"
          onClick={() => {}}
          size="lg"
          shape="rounded"
          color="orange"
          textSize="sm"
        />
        <Button
          label="1:1 메신저 채팅"
          onClick={() => {}}
          size="lg"
          shape="rounded"
          color="gray"
          textSize="sm"
        />
      </div>
    </div>
  );
};

export default CounselorCompletedCard;
