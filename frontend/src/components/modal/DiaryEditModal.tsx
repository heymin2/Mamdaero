import React, { useState } from 'react';
import { Emotion, emotionEmojis } from '@/pages/emotiondiary/emotion';
import ModalWrapper from '@/components/modal/ModalWrapper';

interface DiaryEditModalProps {
  isOpen: boolean;
  diary: { id: string; date: string; emotion: Emotion; content: string };
  onClose: () => void;
  onSubmit: (diary: { id: string; date: string; emotion: Emotion; content: string }) => void;
}

const DiaryEditModal: React.FC<DiaryEditModalProps> = ({ isOpen, diary, onClose, onSubmit }) => {
  if (!diary) return null; // diary가 null이면 아무것도 렌더링하지 않음

  const [emotion, setEmotion] = useState<Emotion>(diary.emotion);
  const [content, setContent] = useState(diary.content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...diary,
      emotion,
      content,
    });
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl mb-4">일기 수정 ({diary.date})</h2>
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
            수정
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default DiaryEditModal;
