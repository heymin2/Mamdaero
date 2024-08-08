import React, { useState } from 'react';
import Button from '@/components/button/Button';
import ModalWrapper from '@/components/modal/ModalWrapper';

interface PostitWriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  question: string;
}

const PostitWriteModal: React.FC<PostitWriteModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  question,
}) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent('');
      onClose();
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} size="sm">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-2 text-orange-500">질문</h2>
        <p className="text-lg mb-4">{question}</p>
        <textarea
          className="w-full h-24 p-2 border rounded mb-4 resize-none"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="내용을 입력하세요..."
        />
        <div className="flex justify-center space-x-2">
          <Button color="gray" size="sm" textSize="sm" label="취소" onClick={onClose} />
          <Button color="orange" size="sm" textSize="sm" label="작성" onClick={handleSubmit} />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default PostitWriteModal;
