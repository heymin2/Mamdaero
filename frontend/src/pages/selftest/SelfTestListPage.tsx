import React from 'react';
import { FaCheck } from 'react-icons/fa';
import SelfTestCard from '@/components/card/SelfTestCard';

const SelfTestListPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full py-16">
      <div className="w-full max-w-6xl px-4 mb-12">
        <div className="flex justify-between items-center ml-5 mr-5">
          <div className="flex space-x-5 items-center">
            <div className="font-bold text-4xl text-orange-500">자가 심리 검진</div>
            <div>맘대로 자가검진을 통해 내 마음건강을 측정해보세요!</div>
          </div>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => window.history.back()}
          >
            뒤로가기
          </button>
        </div>
        <div className="border-t-2 border-gray-300 mt-2"></div>
      </div>

      <div className="flex text-sm space-x-5 mb-12">
        <FaCheck />
        <p>추후 상담사와의 상담시, 사전 심리검사 제출용으로 쓸 수 있습니다.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-10 w-full h-full">
        <SelfTestCard mental="depressed" />
        <SelfTestCard mental="unrest" />
        <SelfTestCard mental="stress" />
        <SelfTestCard mental="ptsd" />
        <SelfTestCard mental="bipolar" />
      </div>
    </div>
  );
};

export default SelfTestListPage;
