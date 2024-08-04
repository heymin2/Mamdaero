import React, { useState, useRef, useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import ReportButton from '@/components/button/ReportButton';
import { FaRegComments } from 'react-icons/fa6';

interface CommentDetail {
  id: number;
  writer: string;
  comment: string;
  createdAt: string;
}
interface SupervisionCommentCardProps {
  commentDetail: CommentDetail;
}

const SupervisionCommentCard: React.FC<SupervisionCommentCardProps> = ({ commentDetail }) => {
  const [showReportButton, setShowReportButton] = useState<boolean>(false);
  const reportButtonRef = useRef<HTMLDivElement | null>(null);

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
    <div className="border-b-2 border-blue-300 px-10 pt-4 pb-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center text-lg font-bold">
          <FaRegComments />
          {commentDetail.writer}
        </div>{' '}
        <div className="flex items-center">
          <span className="mr-2">{commentDetail.createdAt}</span>
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
      <div className="mx-8 my-2">{commentDetail.comment}</div>
    </div>
  );
};

export default SupervisionCommentCard;
