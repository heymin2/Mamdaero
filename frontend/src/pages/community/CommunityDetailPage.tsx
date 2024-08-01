import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommunityPostCard from '@/components/card/community/CommunityPostCard';
import RoundedButton from '@/components/button/RoundedButton';
import { IoIosArrowBack } from 'react-icons/io';
import CommunityCommentCard from '@/components/card/community/CommunityCommentCard';

const CommunityDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/community');
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky bg-orange-50 top-0 z-10">
        <div className="flex justify-between items-end mx-16">
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
          <div className="flex my-6">
            <div className="text-right text-gray-500">
              <div>털어놓고 싶은 고민이나 일상, 어떤 이야기든 자유롭게 나눌 수 있어요.</div>
              <div>맘대로의 회원들과 다양한 정보를 이야기를 공유해보세요.</div>
            </div>
            <div className="text-4xl font-bold ms-8">
              <span className="text-orange-500">맘대로</span> 커뮤니티
            </div>
          </div>
        </div>
      </div>
      {/* 게시물 내용 */}
      <div className="flex-grow py-5 px-16">
        <CommunityPostCard />
        <CommunityCommentCard />
        <CommunityCommentCard />
      </div>
    </div>
  );
};

export default CommunityDetailPage;
