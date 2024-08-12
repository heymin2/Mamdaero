import React from 'react';
import SimpleTestBar from '@/components/navigation/SimpleTestBar';
import Button from '@/components/button/Button';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const BernardTestPage = () => {
  const navigate = useNavigate();
  const backToList = () => {
    navigate('/simpletest');
  };
  return (
    <div>
      <SimpleTestBar testName="베르나르 베르베르" />
      <Button
        label={
          <span className="flex items-center ms-4">
            <IoIosArrowBack />
            <div className="ms-2 mt-0.5">검사 목록 보기</div>
          </span>
        }
        onClick={backToList}
        size="목록보기"
        color="orange"
        shape="rounded"
        textSize="sm"
      />
    </div>
  );
};

export default BernardTestPage;
