import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SupervisionPostCard from '@/components/card/supervision/SupervisionPostCard';
import Button from '@/components/button/Button';
import { IoIosArrowBack } from 'react-icons/io';
import SupervisionCommentCard from '@/components/card/supervision/SupervisionCommentCard';
import SupervisionBar from '@/components/navigation/SupervisionBar';
import SupervisionWriteCommentCard from '@/components/card/supervision/SupervisionWriteCommentCard';
import axios from 'axios';
import axiosInstance from '@/api/axiosInstance';

interface PostDetail {
  id: number;
  writer: string;
  title: string;
  content: string;
  view: number;
  createdAt: string;
  likeCount: number;
  isLike: boolean;
  isMine: boolean;
}

interface CommentDetail {
  id: number;
  writer: string;
  comment: string;
  createdAt: string;
}

const SupervisionDetailPage: React.FC = () => {
  const { supervisionId } = useParams<{ supervisionId: string }>();
  const navigate = useNavigate();
  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);
  const [comments, setComments] = useState<CommentDetail[]>([]);

  const backToList = () => {
    navigate('/supervision');
  };

  useEffect(() => {
    const fetchPostDetail = async (postId: number) => {
      try {
        const res = await axios.get(`https://mamdaero.o-r.kr/api/ca/counselor-board/${postId}`);
        setPostDetail(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchComments = async (postId: number) => {
      try {
        const res = await axios.get(
          `https://mamdaero.o-r.kr/api/ca/counselor-board/${postId}/comment`
        );
        const commentsData = Array.isArray(res.data.data) ? res.data.data : [];
        setComments(commentsData); // Correctly set comments array
      } catch (error) {
        console.error(error);
      }
    };

    if (supervisionId) {
      fetchPostDetail(Number(supervisionId));
      fetchComments(Number(supervisionId));
    }
  }, [supervisionId]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 슈퍼비전 상단바 */}
      <div className="sticky bg-blue-50 top-0 z-10">
        <div className="flex justify-between items-end ms-16">
          <div className="mb-3">
            <Button
              label={
                <span className="flex items-center ms-2">
                  <IoIosArrowBack />
                  <div className="ms-2 mt-0.5">게시글 목록 보기</div>
                </span>
              }
              onClick={backToList}
              size="상담사목록보기"
              textSize="sm"
              shape="rounded"
              color="blue"
            ></Button>
          </div>
          <SupervisionBar />
        </div>
      </div>
      {/* 게시물 내용 */}
      <div className="flex-grow py-5 px-16">
        {postDetail && (
          <>
            <SupervisionPostCard postDetail={postDetail} />
            <div className="border-y-2 border-blue-300 px-10 py-2 mt-3">
              <span className="text-blue-500 font-bold text-xl">{comments.length}</span>
              <span className="font-bold text-base">개의 댓글이 있습니다.</span>
            </div>
            {comments.map(comment => (
              <SupervisionCommentCard key={comment.id} commentDetail={comment} />
            ))}
            <SupervisionWriteCommentCard />
            <SupervisionWriteCommentCard />
          </>
        )}
      </div>
    </div>
  );
};

export default SupervisionDetailPage;
