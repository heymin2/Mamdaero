import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import useAuthStore from '@/stores/authStore';

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logout, email } = useAuthStore();

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    logout();
    navigate('/login');
  };

  const handleMyPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const memberId = email?.split('@')[0] || 'unknown';
    navigate(`/mypage/${memberId}`);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="focus:outline-none rounded-full relative z-10">
        <CgProfile size={24} />
      </button>
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-24 bg-white rounded-md shadow-xl z-20 border border-gray-200">
          <button
            onClick={handleMyPage}
            className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            마이페이지
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
