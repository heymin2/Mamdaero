import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import SquareButton from '@/components/button/SquareButton';
import RoundedButton from '@/components/button/RoundedButton';

const myPageKey = 'min-w-32 inline-block font-bold text-3xl';
const myPageValue = 'mx-auto text-center font-bold text-3xl';
const CouselorMyPage: React.FC = () => {
  // variants
  const name = '박민준';
  const nickName = '삼월사월오월';
  const email = 'ppmm98@yu.ac.kr';
  const phoneNumber = '01012341234';
  const birthday = '1998.07.20';
  const gender = '남';

  const openModal = () => {
    const modal = document.getElementById('changePwdModal');
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };
  const changePwd = () => {
    console.log('비밀번호 변경');
  };
  return (
    <>
      <header className="flex gap-7 py-10">
        <h1 className="text-black text-5xl font-bold">마이페이지(상담자용)</h1>
        <FiEdit className="w-7 h-7" />
      </header>
      <div className="divider"></div>
      <main className="flex justify-around">
        <ul className="flex flex-col flex-grow-[3] align-middle h-full justify-evenly">
          <li>
            <div className="flex">
              <span className={myPageKey}>이름 :</span>
              <span className={myPageValue}>{name}</span>
            </div>
            <div className="divider"></div>
          </li>
          <li>
            <div className="flex">
              <span className={myPageKey}>닉네임 :</span>
              <span className={myPageValue}>{nickName}</span>
            </div>
            <div className="divider"></div>
          </li>
          <li>
            <div className="flex">
              <span className={myPageKey}>이메일 :</span>
              <span className={myPageValue}>{email}</span>
            </div>
            <div className="divider"></div>
          </li>
          <li>
            <div className="flex">
              <span className={myPageKey}>비밀번호 : </span>
              <span className={myPageValue}>
                <SquareButton
                  label="비밀번호 변경하기"
                  onClick={openModal}
                  size="mdlg"
                  user="counselor"
                />
              </span>
            </div>
            {/* modal 창 */}
            <dialog className="modal" id="changePwdModal">
              <div className="modal-box">
                <form className="flex flex-wrap pt-20 pb-5 px-10">
                  <label htmlFor="currentPwd" className="w-1/3">
                    현재 비밀번호
                  </label>
                  <input type="text" id="currentPwd" className="border w-1/2" />
                  <label htmlFor="newPwd" className="w-1/3">
                    새 비밀번호
                  </label>
                  <input type="text" id="newPwd" className="border w-1/2" />
                  <label htmlFor="reNewPwd" className="w-1/3">
                    새 비밀번호 확인
                  </label>
                  <input type="text" id="reNewPwd" className="border w-1/2" />
                </form>
                <div className="modal-action justify-center">
                  {/* 모달 창 끄는 form */}
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  {/* 비밀번호 변경 form */}
                  <form method="dialog">
                    <SquareButton
                      label="비밀번호 변경"
                      onClick={changePwd}
                      size="md"
                      user="counselor"
                    />
                  </form>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            <div className="divider"></div>
          </li>
          <li>
            <div className="flex">
              <span className={myPageKey}>전화번호 :</span>
              <span className={myPageValue}>{phoneNumber}</span>
            </div>
            <div className="divider"></div>
          </li>
          <li>
            <div className="flex">
              <span className={myPageKey}>생년월일 :</span>
              <span className={myPageValue}>{birthday}</span>
            </div>
            <div className="divider"></div>
          </li>
          <li>
            <div className="flex">
              <span className={myPageKey}>성별 :</span>
              <span className={myPageValue}>{gender}</span>
            </div>
            <div className="divider"></div>
          </li>
        </ul>
        <section className="flex-grow-[2] flex flex-col justify-evenly items-center">
          <Link to={'edit'} className="w-1/2">
            <RoundedButton
              label="상담사 프로필 수정"
              onClick={() => {}}
              size="full"
              user="counselor"
            />
          </Link>
          <Link to={'product'} className="w-1/2">
            <RoundedButton label="내 상품 관리" onClick={() => {}} size="full" user="counselor" />
          </Link>
          <Link to={'time'} className="w-1/2">
            <RoundedButton label="상담 일정 관리" onClick={() => {}} size="full" user="counselor" />
          </Link>
          <Link to={'exclude'} className="w-1/2">
            <RoundedButton
              label="근무 예외 시간 관리"
              onClick={() => {}}
              size="full"
              user="counselor"
            />
          </Link>
        </section>
      </main>
    </>
  );
};

export default CouselorMyPage;
