import React, { useState } from 'react';
import MyCounselBar from '@/components/navigation/MyCounselBar';
import { MdPostAdd } from 'react-icons/md';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import Button from '@/components/button/Button';
import Prince from '@/assets/memo_prince.png';
import Bubble from '@/assets/bubble2.png';
import Postit from '@/assets/postit.png';
import Postit2 from '@/assets/postit2.png';
import Postit3 from '@/assets/postit3.png';
import PostitWriteModal from '@/components/modal/PostitWriteModal';

const postitImages = [Postit, Postit2, Postit3];

interface Postit {
  id: number;
  content: string;
  color: string;
  likes: number;
  isLiked: boolean;
}

const PostitPage: React.FC = () => {
  const [postits, setPostits] = useState<Postit[]>([
    { id: 1, content: '기뻐요', color: 'bg-yellow-200', likes: 5, isLiked: false },
    { id: 2, content: '우울해요', color: 'bg-green-200', likes: 3, isLiked: false },
    { id: 3, content: '불안해요', color: 'bg-blue-200', likes: 7, isLiked: false },
    { id: 4, content: '짜증나요', color: 'bg-pink-200', likes: 2, isLiked: false },
    { id: 5, content: '행복해요', color: 'bg-purple-200', likes: 10, isLiked: false },
    { id: 6, content: '피곤해요', color: 'bg-red-200', likes: 4, isLiked: false },
    { id: 7, content: '설레요', color: 'bg-indigo-200', likes: 8, isLiked: false },
    { id: 8, content: '화나요', color: 'bg-orange-200', likes: 1, isLiked: false },
    { id: 9, content: '슬퍼요', color: 'bg-teal-200', likes: 6, isLiked: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = (id: number) => {
    setPostits(
      postits.map(postit =>
        postit.id === id
          ? {
              ...postit,
              likes: postit.isLiked ? postit.likes - 1 : postit.likes + 1,
              isLiked: !postit.isLiked,
            }
          : postit
      )
    );
  };

  const handleReport = (id: number) => {
    alert(`포스트잇 ${id}번이 신고되었습니다.`);
  };

  const handleCreatePostit = (content: string) => {
    const newPostit: Postit = {
      id: postits.length + 1,
      content,
      color: 'bg-yellow-200',
      likes: 0,
      isLiked: false,
    };
    setPostits([...postits, newPostit]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 bg-orange-50 shadow-[0_4px_2px_-2px_rgba(0,0,0,0.1)]">
        <MyCounselBar
          title1="맘대로"
          title2="포스트잇"
          subtitle="질문에 포스트잇을 달아보세요!"
          user="client"
        />
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="sticky top-36 flex flex-col items-center">
              <div className="relative flex flex-col items-center justify-center">
                <img src={Bubble} alt="Bubble" className="w-full h-auto" />
                <div className="absolute inset-0 flex flex-col justify-between items-center text-center py-8 p-8 h-52">
                  <h2 className="text-xl font-bold text-orange-500">질문</h2>
                  <p className="text-lg font-bold w-full">
                    지금 당신에게 필요한 한마디는 무엇인가요?
                  </p>
                  <Button
                    color="orange"
                    size="md"
                    textSize="md"
                    label={
                      <div className="flex items-center justify-center">
                        작성하기
                        <MdPostAdd className="inline mr-1" />
                      </div>
                    }
                    onClick={() => setIsModalOpen(true)}
                  />
                </div>
              </div>
              <img src={Prince} className="w-5/6 mt-10" alt="Prince" />
            </div>
          </div>
          <div className="col-span-3 bg-white p-4 rounded-lg shadow-[0_4px_2px_-2px_rgba(0,0,0.1,0.1)]">
            <div className="grid grid-cols-3 gap-8">
              {postits.map((postit, index) => (
                <div key={postit.id} className="relative aspect-square">
                  <img
                    src={postitImages[index % 3]}
                    alt="Postit"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleReport(postit.id)}
                        className="text-gray-600 hover:text-red-500"
                      >
                        <RiAlarmWarningLine size={20} />
                      </button>
                    </div>
                    <p className="text-center font-bold mr-5">{postit.content}</p>
                    <div className="flex justify-center items-center">
                      <button onClick={() => handleLike(postit.id)} className="flex items-center">
                        {postit.isLiked ? (
                          <IoMdHeart className="text-red-500" size={20} />
                        ) : (
                          <IoMdHeartEmpty size={20} />
                        )}
                        <span className="ml-1">{postit.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PostitWriteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePostit}
        question="지금 당신에게 필요한 한마디는 무엇인가요?"
      />
    </div>
  );
};

export default PostitPage;
