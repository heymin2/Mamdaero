// import { useNavigate } from 'react-router-dom';
// const CounselorManageExclude = () => {
//   const navigate = useNavigate();
//   const backToList = () => {
//     navigate('/counselor');
//   };
//   return (
//     <div>
//       <header className="flex gap-7">
//         <h1 className="text-black text-5xl font-bold">근무 예외 시간 관리</h1>
//       </header>
//       <div className="divider"></div>
//     </div>
//   );
// };
// export default CounselorManageExclude;
import React from 'react';

const CounselorManageExclude = (): JSX.Element => {
  return (
    <div className="relative w-[1440px] h-[1024px] bg-orange-50">
      <div className="flex flex-col w-[180px] h-[1024px] items-center gap-[7px] px-0 py-[17px] absolute top-0 left-0 bg-white">
        <div className="flex flex-col items-center gap-3.5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative self-stretch w-full h-[46px]">
            <img
              className="absolute w-[104px] h-[61px] top-0 left-[38px] object-cover"
              alt="Image"
              src="image-3.png"
            />
          </div>
          <div className="relative self-stretch w-full h-[54px]">
            <div className="absolute w-[138px] h-[29px] top-[5px] left-[21px] font-h5-regular font-[number:var(--h5-regular-font-weight)] text-x text-[length:var(--h5-regular-font-size)] text-center tracking-[var(--h5-regular-letter-spacing)] leading-[var(--h5-regular-line-height)] [font-style:var(--h5-regular-font-style)]">
              상담사 조회
            </div>
          </div>
          <div className="relative self-stretch w-full h-[54px]">
            <div className="absolute w-[138px] h-[29px] top-[5px] left-[21px] font-h5-regular font-[number:var(--h5-regular-font-weight)] text-x text-[length:var(--h5-regular-font-size)] text-center tracking-[var(--h5-regular-letter-spacing)] leading-[var(--h5-regular-line-height)] [font-style:var(--h5-regular-font-style)]">
              익명 방명록
            </div>
          </div>
          <div className="relative self-stretch w-full h-[54px]">
            <div className="absolute w-[104px] h-[29px] top-3 left-[38px] font-h5-regular text-[length:var(--h5-regular-font-size)] text-center font-[number:var(--h5-regular-font-weight)] text-x tracking-[var(--h5-regular-letter-spacing)] leading-[var(--h5-regular-line-height)] [font-style:var(--h5-regular-font-style)]">
              커뮤니티
            </div>
          </div>
          <div className="relative self-stretch w-full h-[54px]">
            <div className="absolute w-[164px] h-[29px] top-[11px] left-2 font-h5-regular text-[length:var(--h5-regular-font-size)] text-center font-[number:var(--h5-regular-font-weight)] text-x tracking-[var(--h5-regular-letter-spacing)] leading-[var(--h5-regular-line-height)] [font-style:var(--h5-regular-font-style)]">
              상담 슈퍼비전
            </div>
          </div>
        </div>
        <div className="relative w-[180px] h-[138px]">
          <div className="absolute w-[180px] h-[54px] top-0 left-0">
            <div className="absolute h-[29px] top-2.5 left-[45px] font-h5-regular text-[length:var(--h5-regular-font-size)] text-center font-[number:var(--h5-regular-font-weight)] text-x tracking-[var(--h5-regular-letter-spacing)] leading-[var(--h5-regular-line-height)] [font-style:var(--h5-regular-font-style)]">
              나의 상담
            </div>
            <img
              className="absolute w-6 h-3 top-[21px] left-[127px]"
              alt="Weui arrow outlined"
              src="weui-arrow-outlined.svg"
            />
          </div>
          <div className="absolute w-[180px] h-[35px] top-[61px] left-0">
            <div className="absolute h-[23px] top-[5px] left-[60px] font-h6-regular text-[length:var(--h6-regular-font-size)] text-center font-[number:var(--h6-regular-font-weight)] text-x tracking-[var(--h6-regular-letter-spacing)] leading-[var(--h6-regular-line-height)] [font-style:var(--h6-regular-font-style)]">
              상담 내역
            </div>
          </div>
          <div className="absolute w-[180px] h-[35px] top-[103px] left-0">
            <div className="absolute h-[23px] top-[5px] left-[60px] font-h6-regular text-[length:var(--h6-regular-font-size)] text-center font-[number:var(--h6-regular-font-weight)] text-x tracking-[var(--h6-regular-letter-spacing)] leading-[var(--h6-regular-line-height)] [font-style:var(--h6-regular-font-style)]">
              상담 기록
            </div>
          </div>
        </div>
        <div className="flex w-[180px] h-[55px] items-center justify-center gap-[5px] absolute top-[969px] left-0">
          <div className="relative w-[63px] font-text text-[length:var(--text-font-size)] text-center font-[number:var(--text-font-weight)] text-x tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
            공지사항
          </div>
          <img
            className="relative w-[26.73px] h-[22.94px]"
            alt="Icon profile icon"
            src="icon-profile-icon.png"
          />
        </div>
      </div>
      <div className="flex flex-col w-[1079px] items-start gap-[11px] absolute top-[72px] left-[247px]">
        <div className="flex w-[1024px] items-end justify-between relative flex-[0_0_auto]">
          <div className="relative w-[388px] h-[73px] mt-[-1.00px] [font-family:'AppleSDGothicNeoEB00-Regular',Helvetica] font-normal text-x text-[50px] text-center tracking-[0] leading-[normal]">
            내 상품 관리
          </div>
        </div>
        <img
          className="relative w-[1079px] h-px mb-[-0.50px] object-cover"
          alt="Vector"
          src="vector-12.svg"
        />
      </div>
      <div className="flex flex-col w-[631px] h-[453px] items-center justify-center gap-[30px] px-[19px] py-[23px] absolute top-[198px] left-[294px] bg-nav-hover rounded-xl">
        <div className="flex flex-col w-[611px] items-start justify-center gap-1 relative flex-[0_0_auto] mt-[-1.50px] ml-[-9.00px] mr-[-9.00px]">
          <div className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] font-h4-regular font-[number:var(--h4-regular-font-weight)] text-x text-[length:var(--h4-regular-font-size)] text-center tracking-[var(--h4-regular-letter-spacing)] leading-[var(--h4-regular-line-height)] [font-style:var(--h4-regular-font-style)]">
              상담 이름
            </div>
          </div>
          <div className="flex h-[63px] items-center justify-center gap-2.5 px-[13px] py-[22px] relative self-stretch w-full">
            <img
              className="absolute w-[611px] h-[63px] top-0 left-0"
              alt="Frame"
              src="frame-45.svg"
            />
            <div className="relative w-[586px] h-[41px] mt-[-12.00px] mb-[-10.00px] ml-[-0.50px] mr-[-0.50px] font-h5-regular font-[number:var(--h5-regular-font-weight)] text-x text-[length:var(--h5-regular-font-size)] tracking-[var(--h5-regular-letter-spacing)] leading-[var(--h5-regular-line-height)] [font-style:var(--h5-regular-font-style)]">
              HTP 검사
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[611px] items-start justify-center gap-1 relative flex-[0_0_auto] ml-[-9.00px] mr-[-9.00px]">
          <div className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] font-h4-regular font-[number:var(--h4-regular-font-weight)] text-x text-[length:var(--h4-regular-font-size)] text-center tracking-[var(--h4-regular-letter-spacing)] leading-[var(--h4-regular-line-height)] [font-style:var(--h4-regular-font-style)]">
              상담 가격
            </div>
          </div>
          <div className="flex h-[63px] items-center gap-2.5 px-[13px] py-[22px] relative self-stretch w-full">
            <img className="absolute w-[611px] h-[63px] top-0 left-0" alt="Frame" src="image.svg" />
            <div className="relative w-[78px] h-[41px] mt-[-12.00px] mb-[-10.00px] font-h5-regular text-[length:var(--h5-regular-font-size)] font-[number:var(--h5-regular-font-weight)] text-x tracking-[var(--h5-regular-letter-spacing)] leading-[var(--h5-regular-line-height)] [font-style:var(--h5-regular-font-style)]">
              40,000
            </div>
            <div className="relative w-[15px] h-[41px] mt-[-12.00px] mb-[-10.00px] font-h5-regular text-[length:var(--h5-regular-font-size)] font-[number:var(--h5-regular-font-weight)] text-x tracking-[var(--h5-regular-letter-spacing)] leading-[var(--h5-regular-line-height)] [font-style:var(--h5-regular-font-style)]">
              원
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[611px] items-start justify-center gap-1 relative flex-[0_0_auto] mb-[-1.50px] ml-[-9.00px] mr-[-9.00px]">
          <div className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] font-h4-regular font-[number:var(--h4-regular-font-weight)] text-x text-[length:var(--h4-regular-font-size)] text-center tracking-[var(--h4-regular-letter-spacing)] leading-[var(--h4-regular-line-height)] [font-style:var(--h4-regular-font-style)]">
              상담 설명
            </div>
          </div>
          <div className="flex h-[110px] items-start justify-center gap-2.5 px-[13px] py-[22px] relative self-stretch w-full">
            <img
              className="w-[611px] h-[110px] left-0 absolute top-0"
              alt="Frame"
              src="frame-45-2.svg"
            />
            <p className="relative w-[586px] h-[53px] mt-[-1.00px] ml-[-0.50px] mr-[-0.50px] font-h5-regular text-[length:var(--h5-regular-font-size)] font-[number:var(--h5-regular-font-weight)] text-x tracking-[var(--h5-regular-letter-spacing)] leading-[var(--h5-regular-line-height)] [font-style:var(--h5-regular-font-style)]">
              집, 나무, 사람 그림 심리 검사입니다.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[327px] h-[386px] items-center gap-[15px] px-[13px] py-[11px] absolute top-[237px] left-[979px] bg-[#ffffff] rounded-xl border border-solid border-[#000000]">
        <div className="relative self-stretch h-[55px] mt-[-1.00px] font-h4-regular text-[length:var(--h4-regular-font-size)] text-center font-[number:var(--h4-regular-font-weight)] text-x tracking-[var(--h4-regular-letter-spacing)] leading-[var(--h4-regular-line-height)] [font-style:var(--h4-regular-font-style)]">
          내 상품 모음
        </div>
        <div className="flex h-[63px] items-center gap-2.5 px-[31px] py-[11px] relative self-stretch w-full">
          <img
            className="w-[296px] h-[63px] left-[5px] absolute top-0"
            alt="Frame"
            src="frame-45-3.svg"
          />
          <div className="relative w-[94px] h-[41px] mt-[-1.00px] font-h5-regular font-[number:var(--h5-regular-font-weight)] text-x text-[length:var(--h5-regular-font-size)] tracking-[var(--h5-regular-letter-spacing)] leading-[var(--h5-regular-line-height)] [font-style:var(--h5-regular-font-style)]">
            HTP 검사
          </div>
          <div className="relative w-[110px] h-[41px] mt-[-1.00px] font-text text-[length:var(--text-font-size)] text-right font-[number:var(--text-font-weight)] text-x tracking-[var(--text-letter-spacing)] leading-[var(--text-line-height)] [font-style:var(--text-font-style)]">
            삭제
          </div>
        </div>
      </div>
      <div className="inline-flex items-center absolute top-[693px] left-[528px]">
        <img className="relative w-[45px] h-[45px]" alt="Vector" src="vector.svg" />
        <div className="flex w-[119px] items-center justify-center gap-2.5 relative">
          <div className="relative w-[148px] mt-[-1.00px] ml-[-14.50px] mr-[-14.50px] font-h4-regular text-[length:var(--h4-regular-font-size)] text-center font-[number:var(--h4-regular-font-weight)] text-x tracking-[var(--h4-regular-letter-spacing)] leading-[var(--h4-regular-line-height)] [font-style:var(--h4-regular-font-style)]">
            상품 추가
          </div>
        </div>
      </div>
      <div className="flex w-[250px] h-[66px] items-center justify-center gap-2.5 px-[23px] py-[3px] absolute top-[663px] left-[1020px] bg-orange-200 rounded-2xl">
        <div className="relative w-fit [font-family:'AppleSDGothicNeoEB00-Regular',Helvetica] text-[25px] text-center font-normal text-x tracking-[0] leading-[normal]">
          적용하기
        </div>
      </div>
    </div>
  );
};
export default CounselorManageExclude;
