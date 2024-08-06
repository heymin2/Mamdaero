import React, { ReactNode } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ isOpen, onClose, children }) => {
  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box relative w-11/12 max-w-2xl">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          <IoCloseCircleOutline size={24} />
        </button>
        <div className="p-4">{children}</div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default ModalWrapper;
