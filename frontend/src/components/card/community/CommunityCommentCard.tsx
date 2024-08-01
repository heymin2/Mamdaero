import React, { useState, useRef, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import ReportButton from '@/components/button/ReportButton';

interface CommunityCommentCardProps {
  // You can add props here if needed in the future
}

const CommunityCommentCard: React.FC<CommunityCommentCardProps> = () => {
  const [showReportButton, setShowReportButton] = useState<boolean>(false);
  const reportButtonRef = useRef<HTMLDivElement | null>(null);

  const nickname: string = '하늘의 미소';
  const date: string = '2024.7.21 (토) 13:31';
  const content: string = `안녕하세요,
저도 비슷한 경험을 했던 적이 있어요.
최근에 기분이 많이 변했는데, 저에게 도움이 되었던 건 일상에 작은 변화를 주는 것이었어요.
예를 들어, 매일 산책을 하거나 새로운 취미를 시작하는 것처럼요.
또, 감정을 털어놓을 수 있는 친구나 가족과의 대화가 큰 도움이 되더라고요.

혹시 전문가와 상담을 고려해 보셨나요
 때로는 전문적인 도움이 필요할 수도 있답니다.

기분이 많이 나아지길 바랄게요. 함께 응원할게요!
좋은 하루 되세요.`;

  const toggleReportButton = (): void => {
    setShowReportButton(!showReportButton);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (reportButtonRef.current && !reportButtonRef.current.contains(event.target as Node)) {
        setShowReportButton(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="border-b-2 border-orange-300 px-10 py-3">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">{nickname}</div>
        <div className="flex items-center">
          <span className="mr-2">{date}</span>
          <div className="relative" ref={reportButtonRef}>
            <button onClick={toggleReportButton} className="p-1">
              <BsThreeDots />
            </button>
            {showReportButton && (
              <div className="absolute left-full ml-2 top-0 z-10">
                <ReportButton />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mx-5 my-2">{content}</div>
    </div>
  );
};

export default CommunityCommentCard;
