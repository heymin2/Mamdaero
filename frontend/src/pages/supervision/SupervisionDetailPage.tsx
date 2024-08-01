import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SupervisionPostCard from '@/components/card/supervision/SupervisionPostCard';
import RoundedButton from '@/components/button/RoundedButton';
import { IoIosArrowBack } from 'react-icons/io';
import SupervisionCommentCard from '@/components/card/supervision/SupervisionCommentCard';

const SupervisionDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/supervision');
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky bg-blue-50 top-0 z-10">
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
              user="counselor"
            ></RoundedButton>
          </div>
          <div className="flex my-6">
            <div className="text-right text-gray-500">
              <div>편안한 온라인 상담 슈퍼비전을 통해</div>
              <div>다양한 사례를 간접 경험하며 전문성 향상을 돕습니다.</div>
            </div>
            <div className="text-4xl font-bold ms-8">
              <span className="text-blue-500">슈퍼비전</span> 커뮤니티
            </div>
          </div>
        </div>
      </div>
      {/* 게시물 내용 */}
      <div className="flex-grow py-5 px-16">
        <SupervisionPostCard />
        <SupervisionCommentCard />
        <SupervisionCommentCard />
      </div>
    </div>
  );
};

export default SupervisionDetailPage;
