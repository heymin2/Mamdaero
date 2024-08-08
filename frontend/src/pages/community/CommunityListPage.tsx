import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommunityListCard from '@/components/card/community/CommunityListCard';
import CommunityBar from '@/components/navigation/CommunityBar';
import WriteButton from '@/components/button/WriteButton';
import AlignDropdown from '@/components/dropdown/AlignDropdown';

interface Post {
  id: number;
  title: string;
  author: string;
  viewCount: number;
  likeCount: number;
  date: string;
}

const CommunityListPage: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState('최신순');
  const [selectedOption2, setSelectedOption2] = useState('제목');

  const options1 = ['최신순', '오래된순', '추천 많은 순', '댓글 많은 순'];
  const options2 = ['제목', '내용', '작성자'];
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
    navigate('/community/write/post');
  };
  return (
    <div>
      <CommunityBar />
      <div className="mx-8">
        <div className="flex justify-between mx-5">
          <div>
            <AlignDropdown
              selectedOption={selectedOption1}
              options={options1}
              onOptionClick={setSelectedOption1}
            />
          </div>
          <div className="text-right">
            <WriteButton onClick={writePost} color="orange" />
          </div>
        </div>
        <CommunityListCard
          posts={posts}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default CommunityListPage;
