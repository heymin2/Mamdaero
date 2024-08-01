import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import SquareButton from '@/components/button/SquareButton';
import RoundedButton from '@/components/button/RoundedButton';

const myPageKey = 'min-w-32 inline-block font-bold';
const myPageValue = 'font-bold';
const CouselorMyPage: React.FC = () => {
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
    <div>
      <header className="flex gap-7">
        <h1 className="text-black text-5xl font-bold">마이페이지(상담자용)</h1>
        <FiEdit className="w-7 h-7" />
      </header>
      <div className="divider"></div>
      <div className="flex justify-between">
        <ul className="flex flex-col align-middle w-full pr-10">
          <li>
            <span className={myPageKey}>이름 :</span>
            <span className={myPageValue}>박민준</span>
            <div className="divider"></div>
          </li>
          <li>
            <span className={myPageKey}>닉네임 :</span>
            <span className={myPageValue}>mjback</span>
            <div className="divider"></div>
          </li>
          <li>
            <span className={myPageKey}>이메일 :</span>
            <span className={myPageValue}>ppmm@ssafy.com</span>
            <div className="divider"></div>
          </li>
          <li>
            <span className={myPageKey}>비밀번호 : </span>
            <span className={myPageValue}>
              <SquareButton
                label="비밀번호 변경하기"
                onClick={openModal}
                size="mdlg"
                user="counselor"
              />
            </span>
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
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                    <SquareButton
                      label="비밀번호 변경"
                      onClick={changePwd}
                      size="md"
                      user="client"
                    />
                  </form>
                </div>
              </div>
              <label className="modal-backdrop" htmlFor="changePwd">
                Close
              </label>
            </dialog>
            <div className="divider"></div>
          </li>
          <li>
            <span className={myPageKey}>전화번호 :</span>
            <span className={myPageValue}>010-2345-1421</span>
            <div className="divider"></div>
          </li>
          <li>
            <span className={myPageKey}>생년월일 :</span>
            <span className={myPageValue}>1998.07.20</span>
            <div className="divider"></div>
          </li>
          <li>
            <span className={myPageKey}>성별 :</span>
            <span className={myPageValue}>남</span>
            <div className="divider"></div>
          </li>
        </ul>
        <section className="flex flex-col justify-evenly items-center ">
          <Link to={'edit'}>
            <RoundedButton
              label="상담사 프로필 수정"
              onClick={() => {}}
              size="상담사목록보기"
              user="counselor"
            />
          </Link>
          <Link to={'product'}>
            <RoundedButton
              label="내 상품 관리"
              onClick={() => {}}
              size="상담사목록보기"
              user="counselor"
            />
          </Link>
          <Link to={'time'}>
            <RoundedButton
              label="상담 일정 관리"
              onClick={() => {}}
              size="상담사목록보기"
              user="counselor"
            />
          </Link>
          <Link to={'exclude'}>
            <RoundedButton
              label="근무 예외 시간 관리"
              onClick={() => {}}
              size="상담사목록보기"
              user="counselor"
            />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default CouselorMyPage;
