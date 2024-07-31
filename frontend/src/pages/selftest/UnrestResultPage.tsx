import React from 'react';
import { useLocation } from 'react-router-dom';

const UnrestResultPage: React.FC = () => {
  const location = useLocation();
  const { totalScore } = location.state || { totalScore: 0 };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full py-16">
      <h1 className="text-3xl font-bold mb-8">불안 자가 심리 검진 결과</h1>
      <p className="text-xl">총 점수: {totalScore}</p>
    </div>
  );
};

export default UnrestResultPage;
