import React, { useState } from 'react';
import Button from '@/components/button/Button';
import { useNavigate } from 'react-router-dom';

interface CounselorReservationStatusCardProps {
  counselId: string;
  counselorId: string;
  counselorName: string;
  date: string;
  time: string;
  status: string;
  onDelete: (id: string) => void; // 삭제 콜백 함수 추가
}

const CounselorReservationStatusCard: React.FC<CounselorReservationStatusCardProps> = ({
  counselId,
  counselorId,
  counselorName,
  date,
  time,
  status,
  onDelete,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

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
          <p>{counselId}</p>
          <p>{date}</p>
          <p>{time}</p>
          <div className="flex gap-4 items-center">
            {status}
            <Button
              label="예약취소"
              onClick={handleCancelReservation}
              size="xs"
              shape="rounded"
              color="red"
              textSize="xs"
            />
          </div>
        </div>
        <div className="flex flex-col col-span-2 items-center mt-3 gap-3">
          <Button
            label="1:1 화상 채팅"
            onClick={() =>
              navigate(`/mycounsel/client/history/facechat/${counselId}/${counselorId}`)
            }
            size="lg"
            shape="rounded"
            color="orange"
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

export default CounselorReservationStatusCard;
