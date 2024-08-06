import React, { useState } from 'react';
import Button from '@/components/button/Button';

interface CounselorReservationStatusCardProps {
  counselId: string;
  clientName: string;
  date: string;
  time: string;
  status: string;
  onDelete: (id: string) => void; // 삭제 콜백 함수 추가
}

const CounselorReservationStatusCard: React.FC<CounselorReservationStatusCardProps> = ({
  counselId,
  clientName,
  date,
  time,
  status,
  onDelete,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleCancelReservation = () => {
    const isConfirmed = window.confirm('정말 예약을 취소하시겠습니까?');
    if (isConfirmed) {
      // 여기서 실제 삭제 로직을 구현합니다.
      // 예를 들어, API 호출을 통해 서버에서 예약을 삭제할 수 있습니다.
      onDelete(counselId);
      setIsDeleted(true);
    }
  };

  if (isDeleted) {
    return null; // 삭제된 경우 컴포넌트를 렌더링하지 않습니다.
  }

  return (
    <div className="border-b-2 border-blue-300 py-4 mb-4 p-4">
      <div className="flex justify-between items-center mb-2 p-2">
        <h3 className="text-xl font-semibold">{clientName} 님</h3>
        <Button
          label="예약취소"
          onClick={handleCancelReservation}
          size="md"
          shape="rounded"
          color="red"
          textSize="sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div>
          <p>상담ID: {counselId}</p>
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
          label="1:1 화상 채팅"
          onClick={() => {}}
          size="lg"
          shape="rounded"
          color="blue"
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

export default CounselorReservationStatusCard;
