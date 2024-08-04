import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SupervisionListCard from '@/components/card/supervision/SupervisionListCard';
import SupervisionBar from '@/components/navigation/SupervisionBar';
import WriteButton from '@/components/button/WriteButton';
import axios from 'axios';
import dayjs from 'dayjs';
import AlignDropdown from '@/components/dropdown/AlignDropdown';
interface Post {
  id: number;
  title: string;
  writer: string;
  view: number;
  like: number;
  createdAt: string;
}

const SupervisionListPage: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState('최신순');
  const [selectedOption2, setSelectedOption2] = useState('제목');

  const options1 = ['최신순', '오래된순', '추천 많은 순', '댓글 많은 순'];
  const options2 = ['제목', '내용', '작성자'];

  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get<Post[]>('https://mamdaero.o-r.kr/api/ca/counselor-board', {
          params: {
            page: 0,
            condition: 'new',
          },
        });

        const responseData = res.data;
        const formattedPosts: Post[] = responseData.map(item => ({
          id: item.id,
          title: item.title,
          writer: item.writer,
          view: item.view,
          like: 0,
          createdAt: dayjs(item.createdAt).format('YYYY-MM-DD'),
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  const writePost = () => {
    navigate('/supervision/write/post');
  };
  return (
    <div>
      <SupervisionBar />
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
            <WriteButton onClick={writePost} color="blue" />
          </div>
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
