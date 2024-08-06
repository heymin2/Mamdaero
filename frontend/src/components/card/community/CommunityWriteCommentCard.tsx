import RegisterButton from '@/components/button/RegisterButton';

const CommunityWriteCommentCard = () => {
  const nickname = '하늘의 미소';
  const onClick = () => {};

  return (
    <div className=" mx-16 my-5 border rounded-md bg-zinc-50 border-gray-300 shadow-md">
      <div className="px-8">
        <div className="font-bold text-lg mb-2 mt-3">{nickname}</div>
        <div className="bg-zinc-50">
          <textarea placeholder="댓글을 작성해 보세요!" className="bg-zinc-50 w-full h-16" />
        </div>
        <div className="text-right mb-3 mt-2">
          {/* <RegisterButton
            onClick={onClick}
            color="orange"
            disabled={mutation.isPending || comment.trim() === ''}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default CommunityWriteCommentCard;
