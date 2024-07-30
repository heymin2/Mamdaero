import React from 'react';
import { Link } from 'react-router-dom';
import { ImClock } from 'react-icons/im';

const ReservConfirmCard: React.FC = () => {
  return (
    <div className="tems-center justify-center bg-white p-6 rounded-lg shadow-md max-w-md h-100 w-50">
      <div className="flex items-center justify-center w-full ">
        {/* <img src={alarm} alt="알람" className="w-24" /> */}
        <ImClock size={50} color="gray" />
      </div>
      <div className="text-2xl font-bold mb-4 text-center w-full h-full truncate">
        <h2>{'username'}님!</h2>
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
