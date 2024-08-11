import LoginCard from '@/components/card/mainpage/LoginCard';
import MainTitleCard from '@/components/card/mainpage/MainTitleCard';
import lean2 from '@/assets/lean2.png';
import Chatbot from '@/components/Chatbot';
import { SlArrowDown } from 'react-icons/sl';
const MainPage = () => {
  return (
    <div className="flex w-full ">
      <div className="carousel carousel-vertical rounded-box h-[90vh] w-full justify-between">
        <div className="carousel-item flex-col justify-evenly items-center h-full">
          <div className="flex w-full justify-evenly">
            <div className="my-auto">
              <MainTitleCard />
              <img src={lean2} alt="" className="w-44" />
            </div>
            <LoginCard />
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

export default MainPage;
