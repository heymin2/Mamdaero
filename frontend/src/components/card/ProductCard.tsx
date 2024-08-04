import React, { useState } from 'react';
import LoginClient from '@/components/input/LoginClient.tsx';
import LoginCounselor from '@/components/input/LoginCounselor.tsx';
import Product from '@/pages/mypage/props/product';

// 마이페이지- 내 상품관리- products
import { FiX, FiPlusCircle } from 'react-icons/fi';
interface ProductCardProps {
  onAddProduct: (product: Product) => void;
}

// 상품 카드 컴포넌트
const ProductCard: React.FC<ProductCardProps> = ({ onAddProduct }) => {
  // style variants
  const productLabel = 'ml-2 text-md font-bold ';
  const productContent = 'text-start pt-3 pl-3 w-full bg-white border border-blue-300 rounded-xl ';
  const fixCss = 'absolute bottom-1 right-1 w-3 h-3 '; //공백 일부로 넣어둠
  // states
  const [productName, setName] = useState<string>('');
  const [productPrice, setPrice] = useState<string>('');
  const [productDescription, setDescription] = useState<string>('');
  //handler
  const handleAddProduct = () => {
    onAddProduct({
      name: productName,
      price: productPrice,
      description: productDescription,
    });
    // 입력 필드 초기화
    setName('');
    setPrice('');
    setDescription('');
  };

  // 공통 유틸리티 함수로 clearContent 정의
  const clearContent = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    console.log('내용 비우기');
    setter(''); // 상태를 빈 문자열로 설정하여 텍스트 비우기
  };
  return (
    <div className=" p-5 flex flex-col gap-1 bg-blue-50 border border-blue-200 rounded-xl">
      <>
        <h1 className={productLabel}>상담 이름</h1>
        <div className="relative flex-1">
          <input
            className={productContent}
            value={productName}
            onChange={e => setName(e.target.value)}
          />
          <FiX className={fixCss} onClick={() => clearContent(setName)} />
        </div>
      </>
      <>
        <h1 className={productLabel}>상담 가격</h1>
        <div className="relative flex-1">
          <input
            className={productContent}
            value={productPrice}
            onChange={e => setPrice(e.target.value)}
          />
          <FiX className={fixCss} onClick={() => clearContent(setPrice)} />
        </div>
      </>
      <>
        <h1 className={productLabel}>상담 설명</h1>
        <div className="relative flex-1">
          <textarea
            className={productContent + 'min-h-32'}
            value={productDescription}
            onChange={e => setDescription(e.target.value)}
          />
          <FiX className={fixCss + 'bottom-3'} onClick={() => clearContent(setDescription)} />
        </div>
      </>
      {/* 상품 추가 버튼 */}
      <button onClick={handleAddProduct} className="bg-transparent mx-auto block font-bold">
        <FiPlusCircle className="inline" />
        상품 추가
      </button>
    </div>
  );
};
export default ProductCard;
