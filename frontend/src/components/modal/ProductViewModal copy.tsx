// 현재(24.08.02)기준 사용 X LJB
import React from 'react';
import ModalWrapper from '@/components/modal/ModalWrapper';

interface ProductViewModalProps {
  isOpen: boolean;
  product: {
    name: string;
    price: string;
    description: string;
  } | null;
  onClose: () => void;
  onEdit: () => void;
}

const ProductViewModal: React.FC<ProductViewModalProps> = ({
  isOpen,
  product,
  onClose,
  onEdit,
}) => {
  if (!isOpen || !product) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">{product.name} 일기</span>
        </h2>
        <div className="mb-4 bg-gray-100 p-4 rounded-lg">
          <p className="whitespace-pre-wrap">{product.price}</p>
        </div>
        <div className="mb-4 bg-gray-100 p-4 rounded-lg">
          <p className="whitespace-pre-wrap">{product.description}</p>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            수정
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200"
          >
            닫기
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ProductViewModal;
