import LoginCard from '@/components/card/LoginCard';
import MainTitleCard from '@/components/card/MainTitleCard';
import Lottie from 'lottie-react';
import animation from '@/api/animation1.json';
import lean2 from '@/assets/lean2.png';

const MainPage = () => {
  return (
    <div className="flex flex-col py-36">
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
  );
};

export default MainPage;
