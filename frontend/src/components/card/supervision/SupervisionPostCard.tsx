import React from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import dayjs from 'dayjs';
import parse, { DOMNode, Element } from 'html-react-parser';

import EditButton from '@/components/button/EditButton';
import DeleteButton from '@/components/button/DeleteButton';

interface SupervisionPostCardProps {
  postDetail: {
    title: string;
    writer: string;
    createdAt: string;
    view: number;
    likeCount: number;
    content: string;
    file: string;
  };
}

const SupervisionPostCard: React.FC<SupervisionPostCardProps> = ({ postDetail }) => {
  const { title, writer, view, likeCount, content, file } = postDetail;
  const createdAt = dayjs(postDetail.createdAt).format('YYYY-MM-DD HH:mm:ss'); // 시간 포맷 수정
  console.log(content);
  // 파일 이름 추출
  const getFileName = (url: string) => {
    const parts = url;
    return parts[parts.length - 1];
  };

  // 이미지 로딩 핸들러
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.maxWidth = '100%'; // 이미지가 컨테이너에 맞게 조정됨
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
              <EditButton color="blue" />
              <DeleteButton />
            </div>
          </div>
        </div>
      </div>
      {/* 게시글 내용 */}
      <div className="relative border-y-2 border-blue-300 p-10">
        <div className="whitespace-pre-wrap">{parseContent(content)}</div>
        {file && (
          <div className="mt-4">
            <a href={file} download={getFileName(file)} className="text-blue-500 underline">
              첨부 파일: {getFileName(file)}
            </a>
          </div>
        )}
        <div className="absolute bottom-3 right-5 flex text-base gap-1 p-2">
          <IoMdHeartEmpty size={24} color="red" />
          <IoMdHeart size={24} color="red" />
          <div className="font-semibold">좋아요</div>
          <div className="font-bold">{likeCount}</div>
        </div>
      </div>
    </div>
  );
};

export default SupervisionPostCard;
