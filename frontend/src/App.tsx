import { Routes, Route } from 'react-router-dom';
import NavClient from '@/components/navigation/NavClient';
import MainPage from '@/pages/MainPage';
import SignUpChoose from '@/pages/SignUpChoose';
import SignUpClient from '@/pages/SignUpClient';
import SignUpCounselor from '@/pages/SignUpCounselor';
import SignUpCounselorInfo from '@/components/input/SignUpCounselorInfo';
import CounselorListPage from './pages/CounselorListPage';

function App() {
  return (
    <div className="App grid grid-cols-8 min-h-screen">
      <div className="fixed flex min-h-screen col-span-1">
        <NavClient />
      </div>
      <div className="col-start-2 col-span-7 justify-center items-center px-16 py-6">
        <Routes>
          <Route path="/" element={<MainPage />} />
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
