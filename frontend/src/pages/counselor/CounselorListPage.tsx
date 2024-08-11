import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';

import CounselorProfileCard from '@/components/card/CounselorProfileCard';
import AlignDropdown from '@/components/dropdown/AlignDropdown';
import { IoIosSearch } from 'react-icons/io';

interface Counselor {
  id: string;
  name: string;
  intro: string;
  averageScore: number;
  reviewCount: number;
}

const fetchCounselor = async (): Promise<Counselor[]> => {
  const response = await axiosInstance({
    method: 'get',
    url: 'p/counselor',
  });
  return response.data.content;
};

const CounselorListPage: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState('이름 순');
  const [selectedOption2, setSelectedOption2] = useState('성별 무관');
  const [selectedOption3, setSelectedOption3] = useState('모든 급수');

  const options1 = ['이름 순', '리뷰 많은 순', '평점 높은 순'];
  const options2 = ['성별 무관', '남자 상담사', '여자 상담사'];
  const options3 = ['모든 급수', '1급 상담사', '2급 상담사'];

  const {
    data: counselors,
    isLoading,
    isError,
  } = useQuery<Counselor[]>({
    queryKey: ['counselors'],
    queryFn: fetchCounselor,
  });
  console.log(fetchCounselor());
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;
  return (
    <div>
      <div className="flex flex-col xl:flex-row justify-between my-5">
        <div>
          <div className="font-bold text-xl sm:text-2xl md:text-3xl text-orange-500">
            맘대로 상담사 조회
          </div>
          <div className="my-2 text-sm sm:text-base md:text-lg">
            나에게 딱 맞는 상담사를 만나보세요.
          </div>
        </div>
        <div className="flex items-center">
          <AlignDropdown
            selectedOption={selectedOption1}
            options={options1}
            onOptionClick={setSelectedOption1}
          />
          <AlignDropdown
            selectedOption={selectedOption2}
            options={options2}
            onOptionClick={setSelectedOption2}
          />
          <AlignDropdown
            selectedOption={selectedOption3}
            options={options3}
            onOptionClick={setSelectedOption3}
          />
          <label className="input input-bordered flex items-center ms-5">
            <input type="text" className="w-60" placeholder="상담사를 검색하세요." />
            <IoIosSearch />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {counselors &&
          counselors.map(counselor => (
            <CounselorProfileCard
              key={counselor.id}
              counselorId={counselor.id}
              counselorName={counselor.name}
              counselorIntro={counselor.intro}
              reviewAvgScore={counselor.averageScore}
              reviewCount={counselor.reviewCount}
            />
          ))}
      </div>
    </div>
  );
};

export default CounselorListPage;
