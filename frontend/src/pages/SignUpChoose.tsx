import React from 'react';
import { Link } from 'react-router-dom';
import SquareButton from '@/components/button/SquareButton.tsx';
import SignUpCard from '@/components/card/SignUpCard';

const SignUpChoose: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-orange-50 w-full py-16">
      {/* 회원가입 제목과 뒤로가기 버튼을 감싸는 div */}
      <div className="w-full max-w-6xl px-4 mb-12">
        <div className="flex justify-between items-center ml-5 mr-5">
          <h1 className="text-3xl font-bold">회원가입</h1>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => window.history.back()}
          >
            뒤로가기
          </button>
        </div>
        <div className="border-t-2 border-gray-300 mt-2"></div>
      </div>
      {/* 회원가입 박스들 */}
      <div className="w-full flex justify-center mt-12">
        <div className="flex justify-center space-x-8 max-w-6xl w-full px-4">
          <SignUpCard
            user="client"
            icon="👤"
            title="일반 회원 등록"
            description="일반 회원 등록"
            buttonText="회원가입"
            link="/signup/client"
          />
          <SignUpCard
            user="counselor"
            icon="👥"
            title="상담사 회원 등록"
            description="상담사 회원 등록"
            buttonText="상담사 회원가입"
            link="/signup/counselor"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpChoose;
