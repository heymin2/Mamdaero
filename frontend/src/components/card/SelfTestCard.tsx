import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/SquareButton';
import depressed from '@/assets/depressed.png';
import unrest from '@/assets/unrest.png';
import stress from '@/assets/stress.png';
import ptsd from '@/assets/ptsd.png';
import bipolar from '@/assets/bipolar.png';

interface SelfTestCardProps {
  mental: 'depressed' | 'unrest' | 'stress' | 'ptsd' | 'bipolar';
}

const mentalData = {
  depressed: {
    title: '우울',
    image: depressed,
    description: '일상생활에서 느끼는 우울의 정도를 측정해 보세요.',
  },
  unrest: {
    title: '불안',
    image: unrest,
    description: '일상생활에서 느끼는 불안의 정도를 측정해 보세요.',
  },
  stress: {
    title: '스트레스',
    image: stress,
    description: '일상생활에서 느끼는 스트레스의 정도를 측정해 보세요.',
  },
  ptsd: {
    title: 'PTSD',
    image: ptsd,
    description: '일상생활에서 느끼는 PTSD의 정도를 측정해 보세요.',
  },
  bipolar: {
    title: '조울증',
    image: bipolar,
    description: '일상생활에서 느끼는 조울증의 정도를 측정해 보세요.',
  },
};

const SelfTestCard: React.FC<SelfTestCardProps> = ({ mental }) => {
  const { title, image, description } = mentalData[mental];
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/selftest/${mental}`);
  };
  return (
    <div className="card bg-white w-72 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl">{title}</h2>
        <figure className="px-10 ">
          <div className="flex items-end justify-center h-48 w-full">
            <img src={image} alt="왕자" className="rounded-xl max-h-full object-contain" />
          </div>
        </figure>
        <p>{description}</p>
        <div className="card-actions">
          <Button onClick={handleButtonClick} label="검진하기" size="sm" user="client" />
        </div>
      </div>
    </div>
  );
};

export default SelfTestCard;
