import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import RegisterButton from '@/components/button/RegisterButton';

interface SupervisionCommentCardProps {
  postId: number;
}

const postComment = async (postId: number, comment: string): Promise<void> => {
  await axiosInstance({
    method: 'post',
    url: `ca/counselor-board/${postId}/comment`,
    data: { comment },
  });
};

const SupervisionWriteCommentCard: React.FC<SupervisionCommentCardProps> = ({ postId }) => {
  const [comment, setComment] = useState<string>('');
  const queryClient = useQueryClient();
  const nickname = '하늘의 미소';

  const mutation = useMutation({
    mutationFn: (comment: string) => postComment(postId, comment),
    onSuccess: () => {
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: (error: unknown) => {
      alert(`오류가 발생했습니다. ${error}`);
    },
  });

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      mutation.mutate(comment);
    }
  };

  return (
    <div className="mx-8 my-6 border rounded-md bg-zinc-50 border-gray-300 shadow-sm">
      <div className="px-8">
        <div className="font-bold text-lg mb-2 mt-3">{nickname}</div>
        <div className="bg-zinc-50">
          <textarea
            value={comment}
            onChange={event => setComment(event.target.value)}
            placeholder="댓글을 작성해 보세요!"
            className="bg-zinc-50 w-full h-16"
          />
        </div>
        <div className="text-right mb-3 mt-2">
          <RegisterButton
            onClick={handleCommentSubmit}
            color="blue"
            disabled={mutation.isPending || comment.trim() === ''}
          />
        </div>
      </div>
    </div>
  );
};

export default SupervisionWriteCommentCard;
