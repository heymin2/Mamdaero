import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import SquareButton from '@/components/button/SquareButton';
import client from '@/pages/mypage/props/client';
// variants
const myPageKey = 'min-w-24 inline-block font-bold text-lg';
const myPageValue = 'ml-[10%] font-bold text-md whitespace-nowrap break-keep';
const myPageInput =
  'mx-auto indent-1 font-bold break-keep whitespace-nowrap border border-blue-500 rounded-lg';
const ClientMyPage: React.FC = () => {
  const [users, setUsers] = useState<client[]>([
    {
      id: '1',
      name: '이 상',
      email: 'ppmm98@yu.ac.kr',
      phone: '010-1234-1234',
      birthdate: '1910.09.23',
      gender: '남',
      nickname: '날 개',
      password: 1234,
    },
  ]);
  const [currentUser, setCurrentUser] = useState<client>(users[0]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  //handler
  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleSave = (): void => {
    setUsers(prevUsers => prevUsers.map(user => (user.id === currentUser.id ? currentUser : user)));
    setIsEditing(false);
    alert('프로필이 성공적으로 업데이트되었습니다.');
  };

  const handleCancel = (): void => {
    setCurrentUser(users.find(user => user.id === currentUser.id) || users[0]);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCurrentUser(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
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
      <header className="flex gap-5">
        <h1 className="text-black text-xl font-bold">마이페이지</h1>
        {!isEditing ? <FiEdit className="w-5 h-5" onClick={handleEdit} /> : null}
      </header>
      <div className="divider"></div>
      <main className="flex justify-around">
        <ul className="flex flex-col flex-grow-[3] h-full">
          <form>
            <li>
              <div className="flex">
                <label className={myPageKey}>이름 :</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    className={myPageInput}
                    value={currentUser.name}
                    onChange={handleChange}
                  />
                ) : (
                  <span className={myPageValue}>{currentUser.name}</span>
                )}
              </div>
              <div className="divider"></div>
            </li>
            <li>
              <div className="flex">
                <label className={myPageKey}>닉네임 :</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    className={myPageInput}
                    value={currentUser.nickname}
                    onChange={handleChange}
                  />
                ) : (
                  <span className={myPageValue}>{currentUser.nickname}</span>
                )}
              </div>
              <div className="divider"></div>
            </li>
            <li>
              <div className="flex">
                <label className={myPageKey}>email :</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    className={myPageInput}
                    value={currentUser.email}
                    onChange={handleChange}
                  />
                ) : (
                  <span className={myPageValue}>{currentUser.email}</span>
                )}
              </div>
              <div className="divider"></div>
            </li>
            <li>
              <div className="flex">
                <label className={myPageKey}>생일 :</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="birthdate"
                    className={myPageInput}
                    value={currentUser.birthdate}
                    onChange={handleChange}
                  />
                ) : (
                  <span className={myPageValue}>{currentUser.birthdate}</span>
                )}
              </div>
              <div className="divider"></div>
            </li>
            <li>
              <div className="flex">
                <label className={myPageKey}>전화번호 :</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    className={myPageInput}
                    value={currentUser.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <span className={myPageValue}>{currentUser.phone}</span>
                )}
              </div>
              <div className="divider"></div>
            </li>
            <li>
              <div className="flex">
                <label className={myPageKey}>성별 :</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="gender"
                    className={myPageInput}
                    value={currentUser.gender}
                    onChange={handleChange}
                  />
                ) : (
                  <span className={myPageValue}>{currentUser.gender}</span>
                )}
              </div>
              <div className="divider"></div>
            </li>
            <li>
              {isEditing ? (
                <div className="flex justify-center gap-5">
                  <SquareButton label="저장" onClick={handleSave} size="md" user="client" />
                  <SquareButton label="취소" onClick={handleCancel} size="md" user="client" />
                </div>
              ) : null}
            </li>
          </form>
        </ul>
        <div className={myPageValue}>
          <SquareButton label="비밀번호 변경하기" onClick={openModal} size="mdlg" user="client" />
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
                <SquareButton label="비밀번호 변경" onClick={changePwd} size="md" user="client" />
              </form>
            </div>
          </div>
          {/* 모달 창의 외부를 누를 시 꺼지는 폼 */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <div className="divider"></div>
      </main>
    </>
  );
};

export default ClientMyPage;
