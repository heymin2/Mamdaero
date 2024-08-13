import React, { useState } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import Button from '@/components/button/Button';

interface BernardTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}
import bernardResult from '@/assets/benardResult.png';

const benardsExamples = [
  { name: '내가 보는 나', description: '자기자신을 어떻게 보고 있는지' },
  {
    name: '타인이 보는 나',
    description: '타인이 자기 자신을 어떻게 보고 있을 것이라고 생각하는지',
  },
  { name: '나의 인생관', description: '그 사람이 자신의 인생을 어떻게 느끼고 있는지' },
  { name: '나의 잠재 의식', description: '자기 자신이 자신의 인생을 어떻게 느끼고 있는지' },
  { name: '나의 가족관', description: '그 사람이 자기 자신의 가족을 어떻게 느끼는지' },
  {
    name: '나의 애정관',
    description: '그 사람이 사랑이나 우정 등 애정관계에 대해 어떻게 느끼는지',
  },
];
const BernardTestModal: React.FC<BernardTestModalProps> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState('');
  const handleClose = () => {
    setTimeout(() => {
      onClose();
    }, 200); // 애니메이션 지속 시간과 일치시킵니다
  };
  return (
    <div>
      <dialog className={`modal ${isOpen ? 'modal-open' : ''} w-full h-full`}>
        <div className="modal-box w-full h-full max-w-[50%] max-h-[45%] overflow-hidden bg-orange-50 ml-[180px]">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            <IoCloseCircleOutline size={24} />
          </button>
          <img src={bernardResult} alt="검사결과" />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleClose}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default BernardTestModal;
