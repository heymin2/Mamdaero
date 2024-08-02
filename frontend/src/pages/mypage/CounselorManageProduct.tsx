import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiPlusCircle } from 'react-icons/fi';
import Button from '@/components/button/RoundedButton';
import ProductViewModal from '@/components/modal/ProductViewModal';
// product 컴포넌트
interface Product {
  name: string;
  price: string;
  description: string;
}
interface ProductCardProps {
  onAddProduct: (product: Product) => void;
}

// 상품 카드 컴포넌트
const ProductCard: React.FC<ProductCardProps> = ({ onAddProduct }) => {
  // style variants
  const productLabel = 'ml-5 text-3xl font-bold ';
  const productContent =
    'text-start pt-3 pl-3 w-full min-h-32 bg-white border border-blue-300 rounded-xl ';
  const fixCss = 'absolute bottom-0 right-0 w-7 h-7';
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
    <div className=" p-5 flex flex-col gap-5 bg-blue-50 border border-blue-200 rounded-xl">
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
          <input
            className={productContent}
            value={productDescription}
            onChange={e => setDescription(e.target.value)}
          />
          <FiX className={fixCss} onClick={() => clearContent(setDescription)} />
        </div>
      </>
      {/* 상품 추가 버튼 */}
      <button onClick={handleAddProduct} className="bg-transparent mx-auto block">
        <FiPlusCircle className="inline" />
        상품 추가
      </button>
    </div>
  );
};

const CounselorEditProfile = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/mypage/counselor');
  };
  const addProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };
  const applyProduct = () => {
    console.log('물건 적용하기');
  };
  const openModal = (index: number) => {
    const modal = document.getElementById(`productModal-${index}`);
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };
  return (
    <>
      <header className="flex justify-between py-10">
        <h1 className="text-black text-5xl font-bold">내 상품 관리</h1>
        <Button label=" 뒤로가기" size="lg" onClick={backToList} user="counselor" />
      </header>
      <div className="divider"></div>
      <div className="flex flex-wrap justify-around gap-10">
        <div className="flex-grow-[1] flex flex-col gap-10">
          <ProductCard onAddProduct={addProduct} />
        </div>
        {/* 내 상품 모음 */}
        <div className="text-center flex-grow-[0.5]">
          <div className="mb-3 min-h-[70%] bg-white p-5 rounded-xl border-4">
            <h1 className="text-xl">내 상품 모음</h1>
            <div className="pt-3">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-wrap justify-between items-center p-3 box-content bg-gray-200 rounded-lg mb-2"
                  onClick={() => {
                    openModal(index);
                  }}
                >
                  <span>{product.name}</span>
                  <span>
                    삭제
                    <FiX
                      className="inline"
                      onClick={() => {
                        const newProducts = products.filter((_, i) => i !== index);
                        setProducts(newProducts);
                      }}
                    />
                  </span>
                  {/* view modal 창 */}
                  <dialog className="modal" id={'productModal-' + index}>
                    <div className="modal-box flex flex-col min-h-[30rem] justify-center gap-5">
                      <span className="font-bold text-3xl">상담이름 : {product.name}</span>
                      <span className="font-bold text-3xl">상담 가격 : {product.price}</span>
                      <span className="font-bold text-3xl">상담 설명 : {product.description}</span>
                      <div className="modal-action justify-center">
                        {/* 모달 창 끄는 form */}
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                      </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>
              ))}
            </div>
          </div>
          <Button label="적용하기" user="counselor" onClick={applyProduct} size="lg" />
        </div>
      </div>
    </>
  );
};
export default CounselorEditProfile;
