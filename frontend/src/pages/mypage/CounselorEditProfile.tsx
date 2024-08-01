import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import defaultImage from '@/assets/DefaultProfile.jpg';
import RoundedButton from '@/components/button/RoundedButton';
import Editor from '@/components/Editor';

const CounselorEditProfile = () => {
  const navigate = useNavigate();
  // style variants
  const profileLabel = 'ml-5 text-3xl font-bold ';
  const profileLabelSpan = 'ml-10 text-base font-normal ';
  const profileContent =
    'text-start pt-3 pl-3 w-full min-h-32 bg-white border border-blue-300 rounded-xl ';
  const fixCss = 'absolute bottom-4 right-4 w-7 h-7';

  // methods
  const changePhoto = () => {
    console.log('사진 변경');
  };
  const deletePhoto = () => {
    console.log('사진 삭제');
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
  const [certificate, setCertificate] = useState('');
  const [address, setAddress] = useState('');
  const [detail, setDetail] = useState('');

  return (
    <>
      <header className="flex justify-between py-10">
        <h1 className="text-black text-5xl font-bold">상담사 프로필 수정</h1>
        <RoundedButton label=" 뒤로가기" size="lg" onClick={backToList} user="counselor" />
      </header>
      <div className="divider"></div>
      <main className="flex gap-10 justify-around">
        {/* 상담사 프로필 내용 */}
        <section className="flex-grow-[6.5] flex flex-col gap-10 p-10 bg-blue-50 border border-blue-200 rounded-xl">
          <>
            <h1 className={profileLabel}>
              한 줄 소개<span className={profileLabelSpan}>30자 이내</span>
            </h1>
            <div className="relative flex-1">
              <textarea
                className={profileContent}
                value={introduction}
                onChange={e => setIntroduction(e.target.value)}
              />
              <FiX className={fixCss} onClick={() => clearContent(setIntroduction)} />
            </div>
          </>
          <>
            <h1 className={profileLabel}>자격증</h1>
            <div className="relative flex-1">
              <textarea
                className={profileContent}
                value={certificate}
                onChange={e => setCertificate(e.target.value)}
              />
              <FiX className={fixCss} onClick={() => clearContent(setCertificate)} />
            </div>
          </>
          <>
            <h1 className={profileLabel}>주소</h1>
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
        </section>
        {/* 상담사 사진 */}
        <section className="flex-grow-[1.5] py-10 align-center bg-white h-fit rounded-badge border">
          <img src={defaultImage} alt="사진" className="mx-auto" />
          <div className="flex justify-evenly pt-3">
            <RoundedButton label="사진 변경" user="counselor" onClick={changePhoto} size="md" />
            <RoundedButton label="삭제" user="counselor" onClick={deletePhoto} size="md" />
          </div>
        </section>
      </main>
    </>
  );
};
export default CounselorEditProfile;
