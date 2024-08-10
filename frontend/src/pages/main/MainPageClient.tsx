import React from 'react';
import MainTitleCard from '@/components/card/mainpage/MainTitleCard';
import lean1 from '@/assets/lean1.png';
import Chatbot from '@/components/Chatbot';
import ClientConfirmCard from '@/components/card/mainpage/ClientConfirmCard';

const MainPageClient: React.FC = () => {
  return (
    <div className="carousel carousel-vertical rounded-box h-full w-full">
      <div className="carousel-item justify-center h-full">
        <div className="flex items-center justify-center gap-32">
          <div className="space-y-12">
            <MainTitleCard />
            <img src={lean1} alt="어린왕자" className="w-44" />
          </div>
          <div>
            <ClientConfirmCard />
          </div>
        </div>
        <div className="carousel-item justify-center min-h-[90%] max-h-[512px]">
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default MainPageClient;
