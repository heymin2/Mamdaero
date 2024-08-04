import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import defaultImage from '@/assets/DefaultProfile.jpg';
import Button from '@/components/button/Button';
import Editor from '@/components/Editor';

const CounselorEditInformationPage = () => {
  const navigate = useNavigate();
  // style variants
  const profileLabel = 'ml-2 text-md font-bold ';
  const profileLabelSpan = 'ml-2 text-sm font-normal ';
  const profileContent = 'text-start pt-3 pl-3 w-full bg-white border border-blue-300 rounded-xl ';
  const fixCss = 'absolute bottom-1 right-1 w-5 h-5';

  // methods
  const handleChangePhoto = () => {
    console.log('사진 변경');
  };
  const handleDeletePhoto = () => {
    console.log('사진 삭제');
  };
  //handler
  const handleSaveProfile = () => {
    console.log('저장하기');
  };
  // 공통 유틸리티 함수로 clearContent 정의
  const clearContent = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    console.log('내용 비우기');
    setter(''); // 상태를 빈 문자열로 설정하여 텍스트 비우기
  };
  const backToList = () => {
    navigate('/mypage/counselor');
  };
  // 내부 state들
  const [introduction, setIntroduction] = useState('');
  const [address, setAddress] = useState('');
  const [detail, setDetail] = useState('');

  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="text-black text-xl font-bold">상담사 조회 정보 수정 페이지</h1>
        <Button label=" 뒤로가기" shape="rounded" onClick={backToList} color="blue" />
      </header>
      <div className="divider"></div>
      <main className="flex gap-10 justify-around">
        {/* 상담사 프로필 내용 */}
        <section className="flex-grow-[6.5] flex flex-col gap-3 p-10 bg-blue-50 border border-blue-200 rounded-xl">
          <>
            <h1 className={profileLabel}>
              한 줄 소개<span className={profileLabelSpan}>30자 이내</span>
            </h1>
            <div className="relative flex-1">
              <input
                className={profileContent}
                value={introduction}
                onChange={e => setIntroduction(e.target.value)}
              />
              <FiX className={fixCss} onClick={() => clearContent(setIntroduction)} />
            </div>
          </>
          <>
            <h1 className={profileLabel}>상담소 주소</h1>
            <div className="relative flex-1">
              <textarea
                className={profileContent}
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <FiX className={fixCss} onClick={() => clearContent(setAddress)} />
            </div>
          </>
          <>
            <h1 className={profileLabel}>
              상세 소개<span className={profileLabelSpan}>2000자 이내</span>
            </h1>
            <div className="relative flex-1">
              <textarea
                className={profileContent}
                value={detail}
                onChange={e => setDetail(e.target.value)}
              />
              <FiX className={fixCss} onClick={() => clearContent(setDetail)} />
            </div>
          </>
          <>
            <Button
              label="저장하기"
              size="full"
              color="blue"
              onClick={handleSaveProfile}
              textSize="xl"
            />
          </>
        </section>
        {/* 상담사 사진 */}
        <section className="flex-grow-[1.5] py-10 align-center bg-white h-fit rounded-badge border">
          <img src={defaultImage} alt="사진" className="mx-auto" />
          <div className="flex justify-evenly pt-3">
            <Button label="사진 변경" color="blue" shape="rounded" onClick={handleChangePhoto} />
            <Button label="삭제" color="blue" shape="rounded" onClick={handleDeletePhoto} />
          </div>
        </section>
      </main>
    </>
  );
};
export default CounselorEditInformationPage;
