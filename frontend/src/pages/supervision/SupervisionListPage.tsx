import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SupervisionListCard from '@/components/card/supervision/SupervisionListCard';
import SupervisionBar from '@/components/navigation/SupervisionBar';
import WriteButton from '@/components/button/WriteButton';
interface Post {
  id: number;
  title: string;
  author: string;
  viewCount: number;
  likeCount: number;
  date: string;
}

const SupervisionListPage: React.FC = () => {
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
  const navigate = useNavigate();
  const writePost = () => {
    navigate('/supervision/write/post');
  };
  return (
    <div>
      <SupervisionBar />
      <div className="mx-4">
        <div className="text-right mr-20">
          <WriteButton onClick={writePost} color="blue" />
        </div>
        <SupervisionListCard
          posts={posts}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default SupervisionListPage;
