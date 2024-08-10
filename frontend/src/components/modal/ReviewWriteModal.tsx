import React, { useState } from 'react';
import Button from '@/components/button/Button';
import ModalWrapper from '@/components/modal/ModalWrapper';
import { FaStar } from 'react-icons/fa';

interface ReviewWriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  counselorName: string;
  date: string;
  time: string;
}

const ReviewWriteModal: React.FC<ReviewWriteModalProps> = ({
  isOpen,
  onClose,
  counselorName,
  date,
  time,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState('');
  const [hover, setHover] = useState<number | null>(null);

  const handleSubmit = () => {
    const currentTime = new Date().toLocaleString();
    console.log({
      counselorName,
      date: `${date} ${time}`,
      rating,
      review,
      reviewTime: currentTime,
    });
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} size="md">
      <div className="bg-white p-6 rounded-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">상담 리뷰 작성</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-bold">상담사</p>
            <p>{counselorName}</p>
          </div>
          <div>
            <p className="font-bold">상담 일시</p>
            <p>{`${date} ${time}`}</p>
          </div>
          <div className="flex items-center">
            <label className="font-bold mr-2">별점</label>
            <div className="flex">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      className="hidden"
                    />
                    <FaStar
                      className="cursor-pointer"
                      color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                      size={30}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <div>
            <p className="font-bold">작성 시간</p>
            <p>{new Date().toLocaleString()}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">리뷰 내용</label>
          <textarea
            className="w-full h-32 p-2 border rounded"
            value={review}
            onChange={e => setReview(e.target.value)}
            placeholder="상담에 대한 리뷰를 작성해주세요."
          />
        </div>

        <div className="flex justify-end">
          <Button
            label="리뷰 등록"
            onClick={handleSubmit}
            size="md"
            shape="rounded"
            color="orange"
            textSize="sm"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ReviewWriteModal;
