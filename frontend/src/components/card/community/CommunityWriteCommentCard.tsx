import RegisterBUtton from '@/components/button/RegisterButton';
import React from 'react';

const CommunityWriteCommentCard = () => {
  const nickname = '하늘의 미소';
  const onClick = () => {};

  return (
    <div className=" mx-16 my-5 border rounded-md bg-orange-100 border-gray-300 shadow-md">
      <div className="px-8">
        <div className="font-bold text-lg mb-2 mt-3">{nickname}</div>
        <div className="border p-2 bg-orange-100 border-gray-300">
          <textarea placeholder="댓글을 작성해 보세요!" className="bg-orange-100 w-full h-16" />
        </div>
        <div className="text-right mb-3 mt-2">
          <RegisterBUtton onClick={onClick} color="orange" />
        </div>
      </div>
    </div>
  );
};

export default CommunityWriteCommentCard;
