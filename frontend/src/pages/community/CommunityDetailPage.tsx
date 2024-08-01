import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommunityPostCard from '@/components/card/community/CommunityPostCard';
import RoundedButton from '@/components/button/RoundedButton';
import { IoIosArrowBack } from 'react-icons/io';
import CommunityCommentCard from '@/components/card/community/CommunityCommentCard';
import CommunityBar from '@/components/navigation/CommunityBar';
import CommunityWriteCommentCard from '@/components/card/community/CommunityWriteCommentCard';

const CommunityDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/community');
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky bg-orange-50 top-0 z-10">
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
              user="client"
            ></RoundedButton>
          </div>
          <CommunityBar />
        </div>
      </div>
      {/* 게시물 내용 */}
      <div className="flex-grow py-5 px-16">
        <CommunityPostCard />
        <CommunityCommentCard />
        <CommunityCommentCard />
        <CommunityWriteCommentCard />
      </div>
    </div>
  );
};

export default CommunityDetailPage;
