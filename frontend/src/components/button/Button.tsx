import React from 'react';

// ButtonProps 인터페이스 정의
interface ButtonProps {
  label: React.ReactNode;
  onClick: () => void;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'full'
    | '목록보기'
    | '예약하기'
    | '회원가입'
    | '검색'
    | '수정';
  shape?: 'rounded' | 'square';
  color?: 'blue' | 'orange' | 'gray' | 'red';
  textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses: Record<
  'xs' | 'sm' | 'md' | 'lg' | 'full' | '목록보기' | '예약하기' | '회원가입' | '검색' | '수정',
  string
> = {
  xs: 'w-16 h-5',
  sm: 'w-20 h-7',
  md: 'w-24 h-9',
  lg: 'w-40 h-10',
  full: 'w-full h-10',
  목록보기: 'w-36 h-8',
  예약하기: 'w-full h-12',
  회원가입: 'w-40 h-12',
  검색: 'w-16 h-9',
  수정: 'w-10 h-7',
};

const shapeClasses: Record<'rounded' | 'square', string> = {
  rounded: 'rounded-full',
  square: 'rounded-md',
};

const colorClasses: Record<'blue' | 'orange' | 'gray' | 'red', string> = {
  blue: 'bg-blue-200 hover:bg-blue-300 transition',
  orange: 'bg-orange-200 hover:bg-orange-300 transition',
  gray: 'bg-gray-200 hover:bg-gray-300 transition',
  red: 'bg-red-200 hover:bg-red-300 transition',
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
