import React, { useState } from 'react';
import { Emotion, emotionEmojis } from '@/pages/emotiondiary/emotion';
import ModalWrapper from '@/components/modal/ModalWrapper';

interface DiaryWriteModalProps {
  isOpen: boolean;
  date: string;
  onClose: () => void;
  onSubmit: (diary: { id: string; date: string; emotion: Emotion; content: string }) => void;
}

const DiaryWriteModal: React.FC<DiaryWriteModalProps> = ({ isOpen, date, onClose, onSubmit }) => {
  const [emotion, setEmotion] = useState<Emotion>('행복해요');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: Date.now().toString(),
      date,
      emotion,
      content,
    });
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl mb-4">일기 쓰기 ({date})</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">감정 선택:</label>
          <div className="flex space-x-2">
            {Object.entries(emotionEmojis).map(([key, value]) => (
              <button
                key={key}
                type="button"
                className={`p-2 rounded ${emotion === key ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setEmotion(key as Emotion)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">내용:</label>
          <textarea
            className="w-full p-2 border rounded"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            취소
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            저장
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default DiaryWriteModal;
