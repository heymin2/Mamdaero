import { Routes, Route, useLocation } from 'react-router-dom';
import NavClient from '@/components/navigation/NavClient';
import MainPage from '@/pages/MainPage';
import MainPageClient from '@/pages/MainPageClient';
import MainPageCounselor from '@/pages/MainPageCounselor';
import SignUpChoose from '@/pages/SignUpChoose';
import SignUpClient from '@/pages/SignUpClient';
import SignUpCounselor from '@/pages/SignUpCounselor';
import SignUpCounselorInfo from '@/components/input/SignUpCounselorInfo';
import CounselorListPage from './pages/CounselorListPage';

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
          {/* <Route path="/" element={<MainPage />} /> */}
          {/* <Route path="/" element={<MainPageClient />} /> */}
          <Route path="/" element={<MainPageCounselor />} />
          <Route path="/signup/choose" element={<SignUpChoose />} />
          <Route path="/signup/client" element={<SignUpClient />} />
          <Route path="/signup/counselor/*" element={<SignUpCounselor />} />
          <Route path="/counselor" element={<CounselorListPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
