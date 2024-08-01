import { Link, NavLink } from 'react-router-dom';
import logo from '@/assets/MamdaeroLogo.svg';
import { CgProfile } from 'react-icons/cg';
import { LuBellRing } from 'react-icons/lu';

const navStyle =
  'p-3 text-lg font-semibold hover:bg-gray-200 text-center transition-colors duration-300';
const activeStyle = 'bg-blue-100 border-l-4 border-blue-500';

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
        to="/supervision"
        className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : ''}`}
      >
        슈퍼비전
      </NavLink>
      <NavLink
        to="/community"
        className={({ isActive }) => `${navStyle} ${isActive ? activeStyle : ''}`}
      >
        커뮤니티
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
          <LuBellRing size={24} />
        </Link>
        <Link to="/mypage/counselor">
          <CgProfile size={24} />
        </Link>
      </div>
    </div>
  );
};

export default NavClient;
