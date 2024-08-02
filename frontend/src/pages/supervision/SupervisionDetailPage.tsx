import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SupervisionPostCard from '@/components/card/supervision/SupervisionPostCard';
import RoundedButton from '@/components/button/RoundedButton';
import { IoIosArrowBack } from 'react-icons/io';
import SupervisionCommentCard from '@/components/card/supervision/SupervisionCommentCard';
import SupervisionBar from '@/components/navigation/SupervisionBar';
import SupervisionWriteCommentCard from '@/components/card/supervision/SupervisionWriteCommentCard';
const SupervisionDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/supervision');
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* 슈퍼비전 상단바 */}
      <div className="sticky bg-blue-50 top-0 z-10">
        <div className="flex justify-between items-end ms-16">
          <div className="mb-3">
            <RoundedButton
              label={
                <span className="flex items-center ms-2">
                  <IoIosArrowBack />
                  <div className="ms-2 mt-0.5">게시글 목록 보기</div>
                </span>
              }
              onClick={backToList}
              size="상담사목록보기"
              user="counselor"
            ></RoundedButton>
          </div>
          <SupervisionBar />
        </div>
      </div>
      {/* 게시물 내용 */}
      <div className="flex-grow py-5 px-16">
        <SupervisionPostCard />
        <SupervisionCommentCard />
        <SupervisionCommentCard />
        <SupervisionWriteCommentCard />
      </div>
    </div>
  );
};

export default SupervisionDetailPage;
