import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiPlusCircle } from 'react-icons/fi';
import Button from '@/components/button/RoundedButton';
const productLabel = 'text-3xl font-bold';
// const productLabel = '';
const productContent = 'bg-white min-h-12 border border-blue-300 relative rounded-xl pt-3 ';
// const productContent = '';
const fixCss = 'absolute bottom-0 right-0 w-7 h-7';
const applyProduct = () => {
  console.log('상품 적용하기');
};
// product 컴포넌트
interface ProductCardProps {
  productName: string;
  productPrice: string;
  productDescription: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  productPrice,
  productDescription,
}) => {
  const clearContent = () => {
    console.log('내용 비우기');
  };
  return (
    // <div className="">
    <div className="bg-blue-50 flex flex-col p-5 border border-blue-200 gap-5 rounded-xl">
      <div>
        <h1 className={productLabel}>상담 이름</h1>
        <div className={productContent}>
          {productName}
          <button className={fixCss} onClick={clearContent}>
            <FiX />
          </button>
        </div>
      </div>
      <div>
        <h1 className={productLabel}>상담 가격</h1>
        <div className={productContent}>
          {productPrice}원
          <button className={fixCss} onClick={clearContent}>
            <FiX />
          </button>
        </div>
      </div>
      <div>
        <h1 className={productLabel}>상담 설명</h1>
        <div className={productContent}>
          {productDescription}
          <button className={fixCss} onClick={clearContent}>
            <FiX />
          </button>
        </div>
      </div>
    </div>
  );
};

const CounselorEditProfile = () => {
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/mypage/counselor');
  };
  const addProduct = () => {
    console.log('상품 추가 버튼');
  };
  return (
    <div>
      <header className="flex justify-between">
        <h1 className="text-black text-5xl font-bold">내 상품 관리</h1>
        <Button label=" 뒤로가기" size="xs" onClick={backToList} user="counselor" />
      </header>
      <div className="divider"></div>
      <div className="flex flex-wrap justify-evenly">
        <div id="product-wrap" className="min-w-[50%] flex flex-col gap-10">
          <ProductCard
            productName="HTTP 검사"
            productPrice="40,000"
            productDescription="집, 나무, 사랑 그림 심리 검사합니다."
          />
          <ProductCard
            productName="HTTP 검사"
            productPrice="40,000"
            productDescription="집, 나무, 사랑 그림 심리 검사합니다."
          />
          {/* 상품 추가 버튼 */}
          <button className="bg-transparent mx-auto block" onClick={addProduct}>
            <FiPlusCircle className="inline" />
            &nbsp;상품 추가
          </button>
        </div>
        {/* 내 상품 모음 */}
        <div className="text-center min-w-[20%] ">
          <div className="bg-white p-5 rounded-xl border-4 mb-3 min-h-[50%]">
            <h1 className="text-xl">내 상품 모음</h1>
            <div className=" pt-3">
              <div className="flex flex-wrap  justify-between items-center bg-gray-200 rounded-lg p-3 box-content">
                <span>HTTP 검사</span>
                <span>
                  삭제
                  <FiX className="inline" />
                </span>
              </div>
            </div>
          </div>
          <Button label="적용하기" user="counselor" onClick={applyProduct} size="lg" />
        </div>
      </div>
    </div>
  );
};
export default CounselorEditProfile;
