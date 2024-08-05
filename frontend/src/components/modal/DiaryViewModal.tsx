import React from 'react';
import { Emotion, getEmoji } from '@/pages/emotiondiary/emotion';
import ModalWrapper from '@/components/modal/ModalWrapper';

interface DiaryViewModalProps {
  isOpen: boolean;
  diary: {
    id: string;
    date: string;
    emotion: Emotion;
    content: string;
  } | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

const DiaryViewModal: React.FC<DiaryViewModalProps> = ({
  isOpen,
  diary,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!isOpen || !diary) return null;

  const handleDelete = () => {
    if (window.confirm('정말로 이 일기를 삭제하시겠습니까?')) {
      onDelete(diary.id);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">{getEmoji(diary.emotion)}</span>
          {diary.date} 일기
        </h2>
        <div className="mb-4 bg-gray-100 p-4 rounded-lg">
          <p className="whitespace-pre-wrap">{diary.content}</p>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          >
            삭제
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

export default DiaryViewModal;
