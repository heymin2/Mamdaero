import React from 'react';

interface HeaderWithBackButtonProps {
  title: string;
  subtitle: string | string[];
}

const NavTest: React.FC<HeaderWithBackButtonProps> = ({ title, subtitle }) => {
  const subtitleLines = Array.isArray(subtitle) ? subtitle : [subtitle];
  return (
    <div className="w-full max-w-6xl px-4 mb-12">
      <div className="flex justify-end items-right ml-5 mr-5">
        <div className="flex items-center">
          <div className="text-right text-gray-500 ">
            {subtitleLines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
          <div className="text-4xl font-bold ms-8">
            <span className="text-orange-500">{title}</span> 자가심리검진
          </div>
        </div>
      </div>
      <div className="border-t-2 border-gray-300 mt-2"></div>
    </div>
  );
};

export default NavTest;
