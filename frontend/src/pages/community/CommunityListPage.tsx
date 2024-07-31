import { useState } from 'react';
import CommunityListCard from '@/components/card/CommunityListCard';

interface Post {
  id: number;
  title: string;
  author: string;
  viewCount: number;
  likeCount: number;
  date: string;
}

const CommunityListPage: React.FC = () => {
  const generateSamplePosts = (): Post[] => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `게시글 ${i + 1}`,
      author: `작성자 ${i + 1}`,
      viewCount: i + 1,
      likeCount: i + 1,
      date: new Date(2024, 6, 31 - i).toISOString().split('T')[0],
    }));
  };

  const [posts] = useState<Post[]>(generateSamplePosts());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 10;

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex my-6 justify-end">
        <div className="text-right text-gray-500">
          <div>털어놓고 싶은 고민이나 일상, 어떤 이야기든 자유롭게 나눌 수 있어요.</div>
          <div>맘대로의 회원들과 다양한 정보를 이야기를 공유해보세요.</div>
        </div>
        <div className="text-4xl font-bold ms-8">
          <span className="text-orange-500">맘대로</span> 커뮤니티
        </div>
      </div>
      <CommunityListCard
        posts={posts}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default CommunityListPage;
