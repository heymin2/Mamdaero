import React from 'react';
import MainTitleCard from '@/components/card/MainTitleCard';
import lean from '@/assets/lean2.png';
import alarm from '@/assets/clock-check-svgrepo-com.svg';

const MainPageClient: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-orange-50 w-full p-28">
      <div className="flex flex-col items-center w-full max-w-6xl space-y-7">
        <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-md w-3/5 max-w-md h-full">
          <MainTitleCard />
        </div>
        <img src={lean} alt="어린왕자" className="my-3 w-72" />
      </div>
      <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-md w-100 max-w-md h-100">
        <div className="w-50">
          <div className="flex items-center justify-center w-full ">
            <img src={alarm} alt="알람" className="w-24" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">
            {'username'}상담사님! 오늘 상담 확인하세요!
          </h2>
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
      </div>
    </div>
  );
};

export default MainPageClient;
