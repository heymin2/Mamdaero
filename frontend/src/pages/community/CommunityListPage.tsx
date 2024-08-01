import { useState } from 'react';
import CommunityListCard from '@/components/card/CommunityListCard';
import CommunityBar from '@/components/navigation/CommunityBar';
import WriteButton from '@/components/button/WriteButton';
import Editor from '@/components/Editor';
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
      <CommunityBar />
      <WriteButton color="orange" />
      <CommunityListCard
        posts={posts}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        paginate={paginate}
      />
      <Editor />
    </div>
  );
};

export default CommunityListPage;
