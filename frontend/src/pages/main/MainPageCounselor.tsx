import React from 'react';
import MainTitleCard from '@/components/card/MainTitleCard';
import lean from '@/assets/lean1.png';
import CounselorConfirmCard from '@/components/card/CounselorConfirmCard';

const MainPageClient: React.FC = () => {
  return (
    <div className="flex items-center justify-start min-h-screen  w-full py-16">
      <div className="flex flex-col items-center w-full max-w-6xl space-y-7">
        <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-md w-3/5 max-w-md h-full">
          <MainTitleCard />
        </div>
        <img src={lean} alt="어린왕자" className="my-3 w-72" />
      </div>
      <div className="flex flex-col items-center w-full max-w-6xl space-y-7">
        <CounselorConfirmCard />
      </div>
    </div>
  );
};

export default MainPageClient;
