import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/Button';
import ProductCard from '@/components/card/mypage/ProductCard';
import MyCounselBar from '@/components/navigation/MyCounselBar';
import ProductModal from '@/components/modal/ProductModal';
import ProductEditModal from '@/components/modal/ProductEditModal';

interface CounselorItem {
  counselor_item_id: number;
  counselor_id: number;
  name: string;
  description: string | null;
  fee: number;
  is_delete: boolean;
}

const dummyProducts: CounselorItem[] = [
  {
    counselor_item_id: 1,
    counselor_id: 1,
    name: '기본 상담',
    description: '30분 기본 상담 서비스',
    fee: 50000,
    is_delete: false,
  },
  {
    counselor_item_id: 2,
    counselor_id: 1,
    name: '심층 상담',
    description: '1시간 심층 상담 서비스',
    fee: 100000,
    is_delete: false,
  },
  {
    counselor_item_id: 3,
    counselor_id: 1,
    name: '패키지 상담',
    description: '5회 패키지 상담 서비스',
    fee: 200000,
    is_delete: false,
  },
];

const CounselorManageProductPage: React.FC = () => {
  const [products, setProducts] = useState<CounselorItem[]>(dummyProducts);
  const [selectedProduct, setSelectedProduct] = useState<CounselorItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleAddProduct = (
    newProduct: Omit<CounselorItem, 'counselor_item_id' | 'counselor_id' | 'is_delete'>
  ) => {
    const newId = Math.max(...products.map(p => p.counselor_item_id)) + 1;
    const productToAdd: CounselorItem = {
      ...newProduct,
      counselor_item_id: newId,
      counselor_id: 1,
      is_delete: false,
    };
    setProducts([...products, productToAdd]);
  };

  const handleApplyProduct = () => {
    console.log(products);
  };

  const openModal = (product: CounselorItem) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const openEditModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditProduct = (editedProduct: CounselorItem) => {
    setProducts(
      products.map(p =>
        p.counselor_item_id === editedProduct.counselor_item_id ? editedProduct : p
      )
    );
    setSelectedProduct(editedProduct);
    closeEditModal();
    setIsModalOpen(true);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct && window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      setProducts(products.filter(p => p.counselor_item_id !== selectedProduct.counselor_item_id));
      closeModal();
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 bg-blue-50 border-b-2 mb-12">
        <MyCounselBar
          title1="상담"
          title2="상품 관리"
          subtitle="상담 상품을 손쉽게 관리하고 업데이트 하세요!"
          buttonLabel="뒤로가기"
          user="counselor"
          buttonPath="/mypage/counselor"
          size="md"
        />
      </div>
      <div className="flex justify-around px-4">
        <div className="w-1/2 pr-4">
          <ProductCard onAddProduct={handleAddProduct} />
        </div>
        <div className="w-1/2 pl-4 ">
          <div className="bg-white p-5 rounded-xl border-4 mb-4">
            <h1 className="text-xl font-bold mb-4 text-center">내 상품 모음</h1>
            <input
              type="text"
              placeholder="상품 검색..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="space-y-3">
              {filteredProducts.map(product => (
                <div
                  key={product.counselor_item_id}
                  className="flex items-center p-3 bg-gray-100 rounded-lg"
                >
                  <span className="font-semibold w-1/2 truncate" title={product.name}>
                    {product.name}
                  </span>
                  <span className="text-gray-600 w-1/4 text-right">
                    {product.fee.toLocaleString()}원
                  </span>
                  <div className="w-1/4 min-w-[80px] flex justify-end">
                    <Button
                      label="상세보기"
                      shape="rounded"
                      color="blue"
                      onClick={() => openModal(product)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Button label="적용하기" shape="rounded" color="blue" onClick={handleApplyProduct} />
          </div>
        </div>
      </div>
      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
          onEdit={openEditModal}
          onDelete={handleDeleteProduct}
        />
      )}
      {selectedProduct && (
        <ProductEditModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          product={selectedProduct}
          onSave={handleEditProduct}
        />
      )}
    </div>
  );
};

export default CounselorManageProductPage;
