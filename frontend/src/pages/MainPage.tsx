import React, { useState } from 'react';
import LoginClient from '@/components/input/LoginClient.tsx';
import LoginCounselor from '@/components/input/LoginCounselor.tsx';
import SquareButton from '@/components/button/SquareButton.tsx';
const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'client' | 'counselor'>('client');

  const clientLogin = () => {
    setActiveTab('client');
  };
  const counselorLogin = () => {
    setActiveTab('counselor');
  };
  return (
    <div className="p-8 max-w-sm w-full bg-gray-100 rounded-lg shadow-lg">
      <div className="flex w-full justify-center space-x-2 mb-3">
        <SquareButton
          label="일반 회원 로그인"
          onClick={clientLogin}
          size="mdlg"
          user={activeTab === 'client' ? 'client' : 'common'}
        ></SquareButton>
        <SquareButton
          label="상담사 로그인"
          onClick={counselorLogin}
          size="mdlg"
          user={activeTab === 'counselor' ? 'counselor' : 'common'}
        ></SquareButton>
      </div>
      <div>
        {activeTab === 'client' && <LoginClient />}
        {activeTab === 'counselor' && <LoginCounselor />}
      </div>
    </div>
  );
};

export default MainPage;
