import LoginCard from '@/components/card/mainpage/LoginCard';
import MainTitleCard from '@/components/card/mainpage/MainTitleCard';
import lean2 from '@/assets/lean2.png';
import Chatbot from '@/components/Chatbot';

const MainPage = () => {
  return (
    <div className="carousel carousel-vertical rounded-box h-full w-full">
      <div className="carousel-item justify-center h-full">
        <div className="flex items-center justify-center gap-32">
          <div className="space-y-12">
            <MainTitleCard />
            <img src={lean2} alt="" className="w-44" />
            {/* <Lottie animationData={animation} style={{ width: 400, height: 400 }} /> */}
          </div>
          <div>
            <LoginCard />
          </div>
        </div>
      </div>
      <div className="carousel-item justify-center min-h-[90%] max-h-[512px]">
        <Chatbot />
      </div>
    </div>
  );
};

export default MainPage;
