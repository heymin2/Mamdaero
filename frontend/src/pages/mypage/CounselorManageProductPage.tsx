import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import Button from '@/components/button/Button';
import ProductViewModal from '@/components/modal/ProductViewModal';
import ProductCard from '@/components/card/ProductCard';
import Product from '@/pages/mypage/props/product';

const CounselorEditProfilePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/mypage/counselor');
  };
  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };
  const handleApplyProduct = () => {
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
      <header className="flex justify-between items-center">
        <h1 className="text-black text-xl font-bold">내 상품 관리</h1>
        <Button label=" 뒤로가기" onClick={backToList} shape="rounded" color="blue" />
      </header>
      <div className="divider"></div>
      <div className="flex flex-wrap justify-around">
        <div className="flex flex-col gap-10 min-w-[30%]">
          <ProductCard onAddProduct={handleAddProduct} />
        </div>
        {/* 내 상품 모음 */}
        <div className="text-center min-w-[30%]">
          <div className="mb-3 min-h-[70%] bg-white p-5 rounded-xl border-4">
            <h1 className="text-md">내 상품 모음</h1>
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
                  <span
                    onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
                      event.stopPropagation(); // 이벤트 전파를 막음
                      const newProducts = products.filter((_, i) => i !== index);
                      setProducts(newProducts);
                    }}
                  >
                    삭제
                    <FiX className="inline z-10" />
                  </span>
                  {/* view modal 창 */}
                  <dialog className="modal scrollbar-hide" id={'productModal-' + index}>
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
                    <form method="dialog" className="modal-backdrop scrollbar-hide">
                      <button className="scrollbar-hide">close</button>
                    </form>
                  </dialog>
                </div>
              ))}
            </div>
          </div>
          <Button label="적용하기" shape="rounded" color="blue" onClick={handleApplyProduct} />
        </div>
      </div>
    </>
  );
};
export default CounselorEditProfilePage;
