import EditButton from '@/components/button/EditButton';
import DeleteButton from '@/components/button/DeleteButton';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import dayjs from 'dayjs';

interface SupervisionPostCardProps {
  postDetail: {
    title: string;
    writer: string;
    createdAt: string;
    view: number;
    likeCount: number;
    content: string;
  };
}

const SupervisionPostCard: React.FC<SupervisionPostCardProps> = ({ postDetail }) => {
  const { title, writer, view, likeCount, content } = postDetail;
  const createdAt = dayjs(postDetail.createdAt).format('YYYY-MM-DD hh:mm:ss');
  return (
    <div className="space-y-3">
      {/* 게시글 제목 헤더 */}
      <div className=" border-y-2 border-blue-300 p-5">
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
            <div className="flex  gap-2">
              <EditButton color="blue" />
              <DeleteButton />
            </div>
          </div>
        </div>
      </div>
      {/* 게시글 내용 */}
      <div className="relative border-y-2 border-blue-300 p-10">
        <div className="whitespace-pre-wrap">{content}</div>
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
