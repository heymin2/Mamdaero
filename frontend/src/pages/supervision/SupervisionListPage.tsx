import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import dayjs from 'dayjs';

import SupervisionListCard from '@/components/card/supervision/SupervisionListCard';
import SupervisionBar from '@/components/navigation/SupervisionBar';
import WriteButton from '@/components/button/WriteButton';
import AlignDropdown from '@/components/dropdown/AlignDropdown';

interface Page<T> {
  currentPage: number;
  data: T[];
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface Post {
  id: number;
  title: string;
  writer: string;
  view: number;
  likeCount: number;
  createdAt: string;
}

const fetchPosts = async (page: number): Promise<Page<Post>> => {
  const res = await axiosInstance({
    method: 'get',
    url: 'ca/counselor-board',
    params: {
      page: page - 1,
      condition: 'new',
    },
  });
  return {
    ...res.data,
    data: res.data.data.map((item: Post) => ({
      id: item.id,
      title: item.title,
      writer: item.writer,
      view: item.view,
      likeCount: item.likeCount,
      createdAt: dayjs(item.createdAt).format('YYYY-MM-DD'),
    })),
  };
};

const SupervisionListPage: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState('최신순');
  const [selectedOption2, setSelectedOption2] = useState('제목');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  const options1 = ['최신순', '오래된순', '추천 많은 순', '댓글 많은 순'];
  const options2 = ['제목', '내용', '작성자'];

  const {
    data: pageData,
    isLoading,
    error,
  } = useQuery<Page<Post>, Error>({
    queryKey: ['posts', currentPage] as const,
    queryFn: () => fetchPosts(currentPage),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const posts = pageData?.data || [];

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
          posts={pageData?.data || []}
          currentPage={currentPage}
          totalPages={pageData?.totalPages || 1}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default SupervisionListPage;
