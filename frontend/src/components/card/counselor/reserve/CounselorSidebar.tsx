// src/components/counselor/reserve/CounselorSidebar.tsx

import React, { useState } from 'react';
import DefaultProfile from '@/assets/DefaultProfile.jpg';
import SquareButton from '@/components/button/SquareButton';

interface CounselorSidebarProps {
  username: string;
  handleReservation: () => void;
}

const CounselorSidebar: React.FC<CounselorSidebarProps> = ({ username, handleReservation }) => {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const products = [
    {
      name: '상담이름1',
      price: '50,000원',
      description:
        '스트레스 해소의 길 상담은 개인의 스트레스 요인을 분석하고 효과적인 대처 방법을 제공하여 일상 생활에서의 스트레스 관리를 돕는 심리 상담 서비스입니다.',
    },
    {
      name: '상담이름2',
      price: '40,000원',
      description:
        '우울증 극복을 위한 상담은 우울증의 원인을 분석하고 효과적인 치료 방법을 제공하여 우울증을 극복할 수 있도록 돕는 심리 상담 서비스입니다.',
    },
  ];

  return (
    <div className="sticky top-20 overflow-auto">
      <img src={DefaultProfile} className="w-full h-64 object-cover rounded-lg" alt="" />
      <div className="flex my-4 justify-start">
        <div className="flex items-end">
          <div className="text-2xl font-bold">{username}</div>
          <div className="text-base font-bold ml-2">상담사</div>
        </div>
      </div>
      <div>
        <div className="text-xl font-bold border-b-4 border-primary pb-2 mb-4">상품선택</div>
        {products.map(product => (
          <div
            key={product.name}
            className="mb-3 collapse collapse-plus bg-white border border-orange-400 shadow-sm rounded-lg"
          >
            <input
              type="checkbox"
              className="peer"
              checked={expandedProduct === product.name}
              onChange={() =>
                setExpandedProduct(expandedProduct === product.name ? null : product.name)
              }
            />
            <div className="collapse-title text-base font-medium">
              <span className="font-bold">
                {product.name} {product.price}
              </span>
            </div>
            <div className="collapse-content">
              <p className="mb-4">{product.description}</p>
              <div className="flex justify-center">
                <SquareButton
                  label="예약하기"
                  onClick={handleReservation}
                  size="md"
                  user="client"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounselorSidebar;
