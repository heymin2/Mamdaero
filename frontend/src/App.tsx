import { Routes, Route, useLocation } from 'react-router-dom';
import NavClient from '@/components/navigation/NavClient';
import MainPage from '@/pages/main/MainPage';
import SignUpChoose from '@/pages/signup/SignUpChoose';
import SignUpClient from '@/pages/signup/SignUpClient';
import SignUpCounselor from '@/pages/signup/SignUpCounselor';
import SignUpCounselorInfo from '@/components/input/SignUpCounselorInfo';
import SelfTestListPage from '@/pages/selftest/SelfTestListPage';
import UnrestPage from '@/pages/selftest/UnrestPage';
import UnrestResultPage from '@/pages/selftest/UnrestResultPage';
import StressPage from '@/pages/selftest/StressPage';
import StressResultPage from '@/pages/selftest/StressResultPage';
import DepressedPage from '@/pages/selftest/DepressedPage';
import DepressedResultPage from '@/pages/selftest/DepressedResultPage';
import PTSDPage from '@/pages/selftest/PTSDPage';
import PTSDResultPage from '@/pages/selftest/PTSDResultPage';
import BipolarPage from '@/pages/selftest/BipolarPage';
import BipolarResultPage from '@/pages/selftest/BipolarResultPage';
import CounselorListPage from '@/pages/counselor/CounselorListPage';
import CounselorDetailPage from '@/pages/counselor/CounselorDetailPage';
import CommunityListPage from '@/pages/community/CommunityListPage';
import ClientMyPage from '@/pages/mypage/ClientMyPage';
import CounselorMyPage from '@/pages/mypage/CounselorMyPage';
import CounselorEditProfile from '@/pages/mypage/CounselorEditProfile';
import CounselorManageProduct from '@/pages/mypage/CounselorManageProduct';
import CounselorManageTime from '@/pages/mypage/CounselorManageTime';
import CounselorManageExclude from '@/pages/mypage/CounselorManageExclude';
const routeBackgroundColors: { [key: string]: string } = {
  '/signup/counselor': 'bg-blue-50',
};

function getBackgroundColor(pathname: string): string {
  for (const [route, color] of Object.entries(routeBackgroundColors)) {
    if (pathname.startsWith(route)) {
      return color;
    }
  }
  return 'bg-orange-50'; // 기본 배경색
}

function App() {
  const location = useLocation();
  const backgroundColor = getBackgroundColor(location.pathname);

  return (
    <div className="App grid grid-cols-8 min-h-screen">
      <div className="fixed flex min-h-screen col-span-1">
        <NavClient />
      </div>
      <div
        className={`col-start-2 col-span-7 justify-center items-center px-16 py-6 ${backgroundColor}`}
      >
        <Routes>
          {/* Main Routes  */}
          <Route path="/" element={<MainPage />} />
          {/* SignUp Routes */}
          <Route path="/signup/choose" element={<SignUpChoose />} />
          <Route path="/signup/client" element={<SignUpClient />} />
          <Route path="/signup/counselor/*" element={<SignUpCounselor />} />
          {/* Counselor Routes */}
          <Route path="/counselor" element={<CounselorListPage />} />
          <Route path="/counselor/:counselorID" element={<CounselorDetailPage />} />
          {/* Self Test Routes */}
          <Route path="/selftest" element={<SelfTestListPage />} />
          <Route path="/selftest/unrest" element={<UnrestPage />} />
          <Route path="/selftest/unrest/result" element={<UnrestResultPage />} />

          <Route path="/selftest/stress" element={<StressPage />} />
          <Route path="/selftest/stress/result" element={<StressResultPage />} />
          <Route path="/selftest/depressed" element={<DepressedPage />} />
          <Route path="/selftest/depressed/result" element={<DepressedResultPage />} />
          <Route path="/selftest/ptsd" element={<PTSDPage />} />
          <Route path="/selftest/ptsd/result" element={<PTSDResultPage />} />
          <Route path="/selftest/bipolar" element={<BipolarPage />} />
          <Route path="/selftest/bipolar/result" element={<BipolarResultPage />} />
          {/* My Pages Route */}
          <Route path="/mypage/client" element={<ClientMyPage />} />
          <Route path="/mypage/counselor" element={<CounselorMyPage />} />
          <Route path="/mypage/counselor/edit" element={<CounselorEditProfile />} />
          <Route path="/mypage/counselor/product" element={<CounselorManageProduct />} />
          <Route path="/mypage/counselor/time" element={<CounselorManageTime />} />
          <Route path="/mypage/counselor/exclude" element={<CounselorManageExclude />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
