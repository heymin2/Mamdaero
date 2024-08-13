import React, { useState } from 'react';
import SimpleTestBar from '@/components/navigation/SimpleTestBar';
import Button from '@/components/button/Button';
import { BiSolidHome, BiSolidTree } from 'react-icons/bi';
import { BsPersonRaisedHand } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import HTPTestModal from '@/components/modal/HTPTestModal';
const HTPTestPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <header className="flex justify-between">
        <div className="m-10">
          <Button
            label={
              <span className="flex items-center ms-4">
                <IoIosArrowBack />
                <div className="ms-2 mt-0.5">검사 목록 보기</div>
              </span>
            }
            onClick={() => navigate('/simpletest')}
            size="목록보기"
            color="orange"
            shape="rounded"
            textSize="sm"
          />
        </div>
        <SimpleTestBar testName="HTP" />
      </header>

      <main className="mx-auto font-bold min-h-[70%] text-gray-700 space-y-7 flex flex-col justify-evenly items-center">
        <section className="border bg-orange-100 rounded-md p-5">
          <p>준비물(검사도구): A4용지 3장, HB연필, 지우개</p>
          <p>1. 한 장의 종이에 하나씩 모두 3장의 그림을 그려야 합니다.</p>
          <p>2. 먼저, 종이를 가로로 두고 집을 그려주세요.</p>
          <p>3. 그리고, 종이를 세로로 두고 나무를 그려주세요.</p>
          <p>4. 마지막으로 세로로 사람의 전신을 그려주세요.</p>
          <p>
            5. <u>결과보기</u> 를 클릭해서 결과를 확인합니다.
          </p>
        </section>
        <section>
          <div className="flex justify-center">
            <BiSolidHome size="30%" />
            <BiSolidTree size="30%" />
            <BsPersonRaisedHand size="30%" />
          </div>
          <div className="flex justify-center items-center mt-3">
            <Button
              label="결과보기"
              textSize="xl"
              size="lg"
              shape="rounded"
              color="orange"
              onClick={() => setIsOpen(true)}
            />
          </div>
          <HTPTestModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </section>
      </main>
    </>
  );
};

export default HTPTestPage;
