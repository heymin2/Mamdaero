import { Routes, Route } from 'react-router-dom';
import NavClient from '@/components/navigation/NavClient';
import MainPage from '@/pages/MainPage';
import SignUpChoose from '@/pages/SignUpChoose';
import SignUpClient from '@/pages/SignUpClient';
import SignUpCounselor from '@/pages/SignUpCounselor';
import SignUpCounselorInfo from '@/components/input/SignUpCounselorInfo';

function App() {
  return (
    <div className="App flex min-h-screen">
      <div className="fixed ">
        <NavClient />
      </div>
      <div className="content flex-grow flex ml-52 justify-center items-center">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup/choose" element={<SignUpChoose />} />
          <Route path="/signup/client" element={<SignUpClient />} />
          <Route path="/signup/counselor/*" element={<SignUpCounselor />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
