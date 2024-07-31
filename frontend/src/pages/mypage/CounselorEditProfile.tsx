import React from 'react';
import { FiX } from 'react-icons/fi';
import defaultImage from '@/assets/DefaultProfile.jpg';
import RoundedButton from '@/components/button/RoundedButton';
const profileLabel = 'text-3xl font-bold ml-5';
const profileLabelSpan = 'text-base font-normal ml-10';
const profileContent = 'bg-white min-h-32 border border-blue-300 relative';
const fixCss = 'absolute bottom-0 right-0 w-7 h-7';
const CounselorEditProfile = () => {
  return (
    <div>
      <header className="flex gap-7">
        <h1 className="text-black text-5xl font-bold">상담사 프로필 수정</h1>
      </header>
      <div className="divider"></div>
      <div className="flex gap-9 ">
        {/* 상담사 프로필 내용 */}
        <div className="bg-blue-50 h-screen flex flex-col p-10 border border-blue-200 gap-10 rounded-xl">
          <div>
            <h1 className={profileLabel}>
              한 줄 소개<span className={profileLabelSpan}>30자 이내</span>
            </h1>
            <div className={profileContent}>
              자신을 비춰보며 따뜻하게 어루만져 줄 수 있는 시간을 만들어드리고 싶은 상담사
              백소림입니다.
              <FiX className={fixCss} />
            </div>
          </div>
          <div>
            <h1 className={profileLabel}>자격증</h1>
            <div className={profileContent}>
              상담심리사 3급
              <FiX className={fixCss} />
            </div>
          </div>
          <div>
            <h1 className={profileLabel}>주소</h1>
            <div className={profileContent}>
              주소입력해버리기
              <FiX className={fixCss} />
            </div>
          </div>
          <div>
            <h1 className={profileLabel}>
              상세소개<span className={profileLabelSpan}>2000자 이내</span>
            </h1>
            <div className={profileContent}>
              여기는 에디터 쓰면 좋겠다아
              <FiX className={fixCss} />
            </div>
          </div>
        </div>
        {/* 상담사 사진 */}
        <div className="bg-white h-fit p-10 rounded-badge border">
          <img src={defaultImage} alt="사진" />
          <div className="flex justify-evenly pt-3">
            <RoundedButton label="사진 변경" user="counselor" onClick={onclick} size="xs" />
            <RoundedButton label="삭제" user="counselor" onClick={onclick} size="xs" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CounselorEditProfile;
