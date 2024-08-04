import React from 'react';

// ButtonProps 인터페이스 정의
interface ButtonProps {
  label: React.ReactNode;
  onClick: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full' | '상담사목록보기' | '예약하기' | '회원가입';
  shape?: 'rounded' | 'square';
  color?: 'blue' | 'orange' | 'gray';
  textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses: Record<
  'xs' | 'sm' | 'md' | 'lg' | 'full' | '상담사목록보기' | '예약하기' | '회원가입',
  string
> = {
  xs: 'w-16 h-5',
  sm: 'w-20 h-7',
  md: 'w-24 h-9',
  lg: 'w-40 h-10',
  full: 'w-full h-10',
  상담사목록보기: 'w-36 h-8',
  예약하기: 'w-full h-12',
  회원가입: 'w-40 h-12',
};

const shapeClasses: Record<'rounded' | 'square', string> = {
  rounded: 'rounded-full',
  square: 'rounded-md',
};

const colorClasses: Record<'blue' | 'orange' | 'gray', string> = {
  blue: 'bg-blue-200 hover:bg-blue-300 transition',
  orange: 'bg-orange-200 hover:bg-orange-300 transition',
  gray: 'bg-gray-200 hover:bg-gray-300 transition',
};

const textSizeClasses: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

// Button 컴포넌트 정의
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  size = 'md',
  shape = 'square',
  color = 'orange',
  textSize = 'md',
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} ${shapeClasses[shape]} ${colorClasses[color]} ${textSizeClasses[textSize]} font-bold`}
    >
      {label}
    </button>
  );
};

export default Button;
