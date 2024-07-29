import { Link, NavLink } from 'react-router-dom';
import logo from '@/assets/MamdaeroLogo.svg';

const navStyle =
  'p-3 text-lg font-semibold hover:bg-gray-200 text-center transition-colors duration-300';
const activeStyle = 'bg-orange-100 border-l-4 border-orange-500';

const NavClient = () => {
  return (
    <div className="flex flex-col w-1.5/12 h-screen bg-white text-gray-800 fixed shadow-lg">
      <div className="flex justify-center items-center">
        <NavLink to="/">
          <img src={logo} alt="로고" className="my-3 h-12" />
        </NavLink>
      </div>
      <NavLink
        to="/counselor"
        className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : ''}`}
      >
        상담사 조회
      </NavLink>
      <NavLink
        to="/postit"
        className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : ''}`}
      >
        익명 방명록
      </NavLink>
      <NavLink
        to="/simpletest"
        className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : ''}`}
      >
        간단 심리 테스트
      </NavLink>
      <NavLink
        to="/selftest"
        className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : ''}`}
      >
        자가 심리 검진
      </NavLink>
      <NavLink
        to="/community"
        className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : ''}`}
      >
        커뮤니티
      </NavLink>
      <NavLink
        to="/emotiondiary"
        className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : ''}`}
      >
        감정 일기
      </NavLink>
      <NavLink
        to="mycounsel"
        className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : ''}`}
      >
        나의 상담
      </NavLink>
      <div className="flex justify-evenly mt-auto mb-5">
        <Link to="/notice" className="font-bold">
          공지사항
        </Link>
        <Link to="/alarm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>
        </Link>
        <Link to="/mypage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default NavClient;
