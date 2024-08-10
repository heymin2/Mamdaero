import React from 'react';
import { ImClock } from 'react-icons/im';
import useAuthStore from '@/stores/authStore';

const ReservConfirmCard: React.FC = () => {
  const { email } = useAuthStore();

  return (
    <div className="p-8 max-w-sm w-full bg-gray-50 rounded-lg shadow-lg">
      <div className="flex w-full justify-center space-x-2 mb-3">
        <ImClock size={50} color="gray" />
      </div>
      <div className="text-2xl font-bold mb-4 text-center w-full h-full truncate">
        <h2>{email}상담사님!</h2>
        <h2>오늘 상담 확인하세요!</h2>
      </div>
      <ul className="space-y-2 text-center">
        <li>
          11:00 박화준 님
          <a href="#" className="text-blue-500">
            상세보기
          </a>
        </li>
        <li>
          13:00 신혜린 님
          <a href="#" className="text-blue-500">
            상세보기
          </a>
        </li>
        <li>
          14:00 이재빈 님
          <a href="#" className="text-blue-500">
            상세보기
          </a>
        </li>
        <li>
          16:00 허재혁 님
          <a href="#" className="text-blue-500">
            상세보기
          </a>
        </li>
        <li>
          17:00 손동희 님
          <a href="#" className="text-blue-500">
            상세보기
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ReservConfirmCard;
