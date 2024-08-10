import { Link, NavLink } from 'react-router-dom';
import logo from '@/assets/MamdaeroLogo.svg';
import { CgProfile } from 'react-icons/cg';
import { LuBellRing } from 'react-icons/lu';
import ProfileDropdown from '@/components/dropdown/ProfileDropdown';

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
          <LuBellRing size={24} />
        </Link>
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default NavClient;
