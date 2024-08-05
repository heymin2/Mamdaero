import React from 'react';

const SignUpClientComplete: React.FC = () => {
  return (
    <div className="w-full max-w-md bg-white p-12 rounded-lg shadow-md text-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-center">가입이 완료되었습니다!</h2>
      <div className="flex justify-center">
        <button
          className="p-3 bg-blue-200 rounded-md text-gray-800 font-semibold"
          onClick={() => (window.location.href = '/')} // 메인 페이지로 리다이렉트
        >
          홈으로 가기
        </button>
      </div>
    </div>
  );
};

export default SignUpClientComplete;
