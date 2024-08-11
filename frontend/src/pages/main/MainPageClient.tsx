import React from 'react';
import MainTitleCard from '@/components/card/mainpage/MainTitleCard';
import lean1 from '@/assets/lean1.png';
import ClientConfirmCard from '@/components/card/mainpage/ClientConfirmCard';
import Chatbot from '@/components/Chatbot';
import { SlArrowDown } from 'react-icons/sl';
const MainPageClient: React.FC = () => {
  return (
    <div className="flex w-full ">
      <div className="carousel carousel-vertical rounded-box h-[90vh] w-full justify-between">
        <div className="carousel-item flex-col justify-evenly items-center h-full">
          <div className="flex w-full justify-evenly">
            <div className="my-auto">
              <MainTitleCard />
              <img src={lean1} alt="어린왕자" className="w-44" />
            </div>
            <ClientConfirmCard />
          </div>
          <div>
            <a href="#chatbot">
              <SlArrowDown size={40} />
            </a>
          </div>
        </div>
        <div id="chatbot" className="carousel-item justify-center h-full">
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default MainPageClient;
