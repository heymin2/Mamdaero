import React from 'react';
import { FiEdit } from 'react-icons/fi';
import SquareButton from '@/components/button/SquareButton';

const myPageKey = 'min-w-32 inline-block font-bold';
const myPageValue = 'font-bold';
const ClientMyPage = () => {
  return (
    <div>
      <header className="flex gap-7">
        <h1 className="text-black text-5xl font-bold">마이페이지</h1>
        <FiEdit className="w-7 h-7" />
      </header>
      <div className="divider"></div>
      <div>
        <ul className="flex flex-col align-middle">
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
                onClick={() => document.getElementById('changePwd').showModal()}
                size="mdlg"
                user="client"
              ></SquareButton>
            </span>
            {/* modal 창 */}
            <dialog className="modal" id="changePwd">
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
                      onClick={onclick}
                      size="md"
                      user="client"
                    ></SquareButton>
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
      </div>
    </div>
  );
};

export default ClientMyPage;
