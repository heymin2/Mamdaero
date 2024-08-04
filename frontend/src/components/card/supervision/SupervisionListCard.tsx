import React from 'react';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  writer: string;
  view: number;
  like: number;
  createdAt: string;
}

interface BoardTableProps {
  posts: Post[];
  currentPage: number;
  postsPerPage: number;
  paginate: (pageNumber: number) => void;
}

const SupervisionListCard: React.FC<BoardTableProps> = ({
  posts,
  currentPage,
  postsPerPage,
  paginate,
}) => {
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full table-fixed">
        <colgroup>
          <col className="w-[10%]" />
          <col className="w-[40%]" />
          <col className="w-[16%]" />
          <col className="w-[7%]" />
          <col className="w-[7%]" />
          <col className="w-[20%]" />
        </colgroup>
        <thead>
          <tr className="border-b bg-blue-100">
            <th className="px-4 py-2 text-center">번호</th>
            <th className="px-4 py-2 text-center">제목</th>
            <th className="px-4 py-2 text-center">작성자</th>
            <th className="px-4 py-2 text-center">조회수</th>
            <th className="px-4 py-2 text-center">추천수</th>
            <th className="px-4 py-2 text-center">날짜</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map(post => (
            <tr key={post.id} className="border-b hover:bg-blue-100 transition-colors duration-200">
              <td className="px-4 py-2 text-center truncate">{post.id}</td>
              <td className="px-4 py-2 text-center truncate">
                <Link to={`/supervision/${post.id}`} className="hover:underline">
                  {post.title}
                </Link>
              </td>
              <td className="px-4 py-2 text-center truncate">{post.writer}</td>
              <td className="px-4 py-2 text-center truncate">{post.view}</td>
              <td className="px-4 py-2 text-center truncate">{post.like}</td>
              <td className="px-4 py-2 text-center truncate">{post.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: pageNumbers }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === i + 1 ? 'bg-blue-400 text-white' : 'bg-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SupervisionListCard;
