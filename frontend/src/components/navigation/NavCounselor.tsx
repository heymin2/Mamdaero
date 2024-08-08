import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '@/assets/MamdaeroLogo.svg';
import { CgProfile } from 'react-icons/cg';
import { LuBellRing } from 'react-icons/lu';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import DiaryViewModal from '../modal/DiaryViewModal';

const navStyle =
  'p-3 text-lg font-semibold hover:bg-gray-200 text-center transition-colors duration-300';
const navSubStyle =
  'py-2 px-6 text-base font-semibold hover:bg-gray-100 text-left transition-colors duration-300';
const activeStyle = 'bg-blue-100 border-l-4 border-blue-500';
const activeSubStyle = 'bg-gray-200';

const NavClient: React.FC = () => {
  const [isMyCounselOpen, setIsMyCounselOpen] = useState(false);
  const location = useLocation();

  const isMyCounselActive =
    location.pathname.includes('/mycounsel/counselor/history') ||
    location.pathname.includes('/mycounsel/counselor/record');

  useEffect(() => {
    if (!isMyCounselActive) {
      setIsMyCounselOpen(false);
    }
  }, [location, isMyCounselActive]);

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
      <button
        onClick={() => setIsMyCounselOpen(!isMyCounselOpen)}
        className={`${navStyle} text-left ${isMyCounselOpen || isMyCounselActive ? activeSubStyle : ''}`}
      >
        {isMyCounselOpen ? (
          <div className="flex items-center justify-center space-x-3">
            <span>나의 상담</span> <FaChevronDown />
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-3">
            <span>나의 상담</span> <FaChevronUp />
          </div>
        )}
      </button>
      {isMyCounselOpen && (
        <div className="flex flex-col mt-1 bg-gray-50">
          <NavLink
            to="/mycounsel/counselor/history"
            className={({ isActive }) => `${navSubStyle} ${isActive ? activeStyle : ''}`}
          >
            상담 내역
          </NavLink>
          <NavLink
            to="/mycounsel/counselor/record"
            className={({ isActive }) => `${navSubStyle} ${isActive ? activeStyle : ''}`}
          >
            상담 기록
          </NavLink>
        </div>
      )}
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
