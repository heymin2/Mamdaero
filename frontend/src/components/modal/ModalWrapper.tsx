import React, { ReactNode } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg relative w-full max-w-2xl mx-4"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <IoCloseCircleOutline size={24} />
        </button>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export default ModalWrapper;
