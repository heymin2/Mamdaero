import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderWithBackButtonProps {
  title: string;
  subtitle: string | string[];
  showBackButton: boolean;
}

const MyCouneolBar: React.FC<HeaderWithBackButtonProps> = ({
  title,
  subtitle,
  showBackButton = true,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col my-6 mx-16 justify-end">
      <div className="flex justify-between items-center ml-5 mr-5">
        {showBackButton && (
          <button
            className="text-gray-600 hover:text-gray-800 mr-4"
            onClick={() => navigate('/mycounsel/counselor/record')}
          >
            상담자 목록보기
          </button>
        )}
        <div className="flex flex-col text-right  flex-grow">
          <div className="text-4xl font-bold ms-8 flex-shrink-0">
            <span className="text-blue-500">{title}</span> {subtitle}
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray-300 mt-2"></div>
    </div>
  );
};

export default MyCouneolBar;
