import React from 'react';
import dayjs from 'dayjs';
import parse, { DOMNode, Element } from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, InvalidateQueryFilters } from '@tanstack/react-query';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';

import EditButton from '@/components/button/EditButton';
import DeleteButton from '@/components/button/DeleteButton';
import axiosInstance from '@/api/axiosInstance';

interface SupervisionPostCardProps {
  postDetail: {
    id: number;
    title: string;
    writer: string;
    createdAt: string;
    view: number;
    likeCount: number;
    content: string;
    file: string;
  };
  queryKey: InvalidateQueryFilters;
}

const SupervisionPostCard: React.FC<SupervisionPostCardProps> = ({ postDetail, queryKey }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id, title, writer, view, likeCount, content, file } = postDetail;
  const createdAt = dayjs(postDetail.createdAt).format('YYYY-MM-DD HH:mm:ss'); // 시간 포맷 수정

  // 파일 이름 추출
  const getFileName = (url: string) => {
    if (url.length > 0) {
      const firstIndex = url[0].indexOf('_');
      if (firstIndex !== -1) {
        return url[0].slice(firstIndex + 1);
      }
      return url;
    }
  };

  // 이미지 로딩 핸들러
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.maxWidth = '100%'; // 이미지가 컨테이너에 맞게 조정됨
  };

  // 게시글 수정
  const handleArticleEdit = () => {
    navigate(`/supervision/edit/${id}`);
  };

  // 게시글 삭제
  const handleArticleDelete = () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      deleteArticleMutation.mutate(id);
    }
  };

  // HTML 콘텐츠를 React 컴포넌트로 변환
  const parseContent = (html: string) => {
    return parse(html, {
      replace: (domNode: DOMNode) => {
        if (domNode instanceof Element && domNode.name === 'img') {
          const { src, alt } = domNode.attribs as { src?: string; alt?: string };

          if (src) {
            return (
              <img
                src={src}
                alt={alt || 'image'}
                onLoad={handleImageLoad}
                style={{ maxWidth: '100%' }}
              />
            );
          }
        }
        // 기본적으로는 domNode를 그대로 반환
        return domNode;
      },
    });
  };
  const deleteArticleMutation = useMutation({
    mutationFn: (postId: number) =>
      axiosInstance({
        method: 'delete',
        url: `/ca/counselor-board/${postId}`,
      }),
    onSuccess: () => {
      alert('게시글이 성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries(queryKey);
      navigate('/supervision');
    },
    onError: error => {
      console.error('게시글 삭제 중 오류 발생:', error);
      alert('게시글 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.');
    },
  });

  return (
    <div className="space-y-3">
      {/* 게시글 제목 헤더 */}
      <div className="border-y-2 border-blue-300 p-5">
        <h1 className="font-bold text-3xl">{title}</h1>
        <div className="flex justify-between items-end mt-3">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-gray-400 me-2">글쓴이</span>
              <span className="font-bold">{writer}</span>
            </div>
            <div className="flex">
              <span className="text-gray-400 me-2">일시</span>
              <span className="font-bold">{createdAt}</span>
              <span className="text-gray-400 mx-5 me-2">조회수</span>
              <span className="font-bold">{view}</span>
            </div>
          </div>
          <div className="justify-end">
            <div className="flex gap-2">
              <EditButton onClick={handleArticleEdit} color="blue" />
              <DeleteButton onClick={handleArticleDelete} />
            </div>
          </div>
        </div>
      </div>
      {/* 게시글 내용 */}
      <div className="relative p-10">
        <div className="whitespace-pre-wrap">{parseContent(content)}</div>
      </div>

      <div className="bottom-3 right-5 flex justify-between text-base gap-1 py-2 ps-10 pr-12">
        <div>
          {file && (
            <div className="border">
              <span className="font-bold mr-2">첨부 파일</span>
              <a href={file} download={getFileName(file)} className="text-blue-500 underline">
                {getFileName(file)}
              </a>
            </div>
          )}
        </div>
        <div className="flex font-bold">
          <IoMdHeartEmpty size={24} color="red" />
          <IoMdHeart size={24} color="red" />
          <div>좋아요</div>
          <div>{likeCount}</div>
        </div>
      </div>
    </div>
  );
};

export default SupervisionPostCard;
