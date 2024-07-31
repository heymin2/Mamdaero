import React from 'react';
import { FaCheck } from 'react-icons/fa';
import SelfTestCard from '@/components/card/SelfTestCard';
import NavTest from '@/components/navigation/NavTest';

const SelfTestListPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full py-16">
      <NavTest
        title="맘대로"
        subtitle="맘대로 자가검진을 통해 내 마음건강을 측정해보세요!"
        showBackButton={false}
      />
      <div className="flex text-sm space-x-5 mb-12">
        <FaCheck />
        <p>추후 상담사와의 상담시, 사전 심리검사 제출용으로 쓸 수 있습니다.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-10 w-full h-full mb-10">
        <SelfTestCard mental="depressed" />
        <SelfTestCard mental="unrest" />
        <SelfTestCard mental="stress" />
      </div>
      <div className="flex flex-wrap justify-center gap-10 w-full h-full">
        <SelfTestCard mental="ptsd" />
        <SelfTestCard mental="bipolar" />
      </div>
    </div>
  );
};

export default SelfTestListPage;
