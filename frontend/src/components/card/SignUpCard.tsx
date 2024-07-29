import React from 'react';
import { Link } from 'react-router-dom';
import SquareButton from '@/components/button/SquareButton.tsx';

interface SignUpCardProps {
  user: 'client' | 'counselor';
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

const SignUpCard: React.FC<SignUpCardProps> = ({
  user,
  icon,
  title,
  description,
  buttonText,
  link,
}) => {
  return (
    <div className="p-8 w-full max-w-sm bg-gray-100 rounded-lg shadow-lg flex flex-col items-center">
      <div className="mb-4">
        <div className="text-5xl">{icon}</div>
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      <Link to={link}>
        <SquareButton label={buttonText} onClick={() => {}} size="mdlg" user={user} />
      </Link>
    </div>
  );
};

export default SignUpCard;
