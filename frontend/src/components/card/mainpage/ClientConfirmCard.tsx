import React, { useEffect } from 'react';
import { ImClock } from 'react-icons/im';
import useMemberStore from '@/stores/memberStore';

const ReservConfirmCard: React.FC = () => {
  const { name } = useMemberStore();

  return (
    <div className="p-8 max-w-sm w-96 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex w-full justify-center space-x-2 mb-3">
        <ImClock size={50} color="gray" />
      </div>
      <div className="text-2xl font-bold mb-4 text-center w-full h-full truncate">
        <h2>{name}님!</h2>
        <h2>오늘 상담 확인하세요!</h2>
      </div>
      <ul className="space-y-2 text-center ">
        <li>
          11:00 박민준 상담사님
          <a href="#" className="text-blue-500">
            상세보기
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ReservConfirmCard;
