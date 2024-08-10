import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/button/Button';
import depressed from '@/assets/depressed.png';
import unrest from '@/assets/unrest.png';
import stress from '@/assets/stress.png';
import ptsd from '@/assets/ptsd.png';
import bipolar from '@/assets/bipolar.png';
import axiosInstance from '@/api/axiosInstance';

interface SelfTestCardProps {
  mental: 'depressed' | 'unrest' | 'stress' | 'ptsd' | 'bipolar';
}

interface SelfTestItem {
  id: number;
  selftestName: string;
  selftestInfo: string;
}

interface MentalData {
  [key: string]: {
    title: string;
    image: string;
    description?: string;
  };
}

const initialMentalData: MentalData = {
  depressed: { title: '우울', image: depressed },
  unrest: { title: '불안', image: unrest },
  stress: { title: '스트레스', image: stress },
  ptsd: { title: 'PTSD', image: ptsd },
  bipolar: { title: '조울증', image: bipolar },
};

const fetchSelfTestList = async (): Promise<SelfTestItem[]> => {
  const response = await axiosInstance.get('/p/selftest');
  return response.data;
};

const SelfTestCard: React.FC<SelfTestCardProps> = ({ mental }) => {
  const navigate = useNavigate();

  const {
    data: selfTestList,
    isError,
    error,
  } = useQuery<SelfTestItem[], Error>({
    queryKey: ['selfTests'],
    queryFn: fetchSelfTestList,
  });

  // useMemo: selfTestList가 변경될때만 mentalData를 재계산
  const mentalData = React.useMemo(() => {
    if (!selfTestList) return initialMentalData;

    const updatedMentalData = { ...initialMentalData };
    selfTestList.forEach(item => {
      if (updatedMentalData[item.selftestName]) {
        const descriptionMatch = item.selftestInfo.match(
          /(.*?척도(?:\s+\S+)?(?:\([^)]+\))?)\s*(?:-|$)/
        );
        const description = descriptionMatch ? descriptionMatch[1].trim() : '';
        updatedMentalData[item.selftestName].description = description;
      }
    });
    return updatedMentalData;
  }, [selfTestList]);

  const handleButtonClick = () => {
    navigate(`/selftest/${mental}`);
  };

  if (isError) {
    console.error('API 요청 실패:', error);
    // 에러 처리 UI를 여기에 추가할 수 있습니다.
  }

  const { title, image, description } = mentalData[mental];

  return (
    <div className="card bg-white w-72 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl">{title}</h2>
        <figure className="px-10 ">
          <div className="flex items-end justify-center h-40 w-full">
            <img src={image} alt={title} className="rounded-xl max-h-full object-contain" />
          </div>
        </figure>
        {description && <p>{description}</p>}
        <div className="card-actions">
          <Button
            onClick={handleButtonClick}
            label="검진하기"
            size="sm"
            color="orange"
            textSize="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default SelfTestCard;
