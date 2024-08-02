import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import SquareButton from '@/components/button/SquareButton';
import RoundedButton from '@/components/button/RoundedButton';
import counselor from '@/pages/mypage/props/counselor';
// variants
const myPageKey = 'min-w-32 inline-block font-bold text-md';
const myPageValue = 'mx-auto font-bold text-md break-keep whitespace-nowrap';
const myPageInput =
  'mx-auto indent-1 font-bold break-keep whitespace-nowrap border border-blue-500 rounded-lg';
const CouselorMyPage: React.FC = () => {
  const [users, setUsers] = useState<counselor[]>([
    {
      id: '111-1111',
      name: '박민준',
      email: 'ppmm98@yu.ac.kr',
      phone: '010-1234-1234',
      birthdate: '1998.07.20',
      gender: '남',
      password: 1234,
    },
  ]);
  const [currentUser, setCurrentUser] = useState<counselor>(users[0]);
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
        <h1 className="text-black text-xl font-bold">마이페이지(상담자용)</h1>
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
                <label className={myPageKey}>자격 정보 :</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="id"
                    className={myPageInput}
                    value={currentUser.id}
                    onChange={handleChange}
                  />
                ) : (
                  <span className={myPageValue}>{currentUser.id}</span>
                )}
              </div>
              <div className="divider"></div>
            </li>
            <li>
              <div className="flex">
                <label className={myPageKey}>이메일 :</label>
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
                <label className={myPageKey}>전화번호 :</label>
                {isEditing ? (
                  <input
                    type="tel"
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
                <span className={myPageKey}>생년월일 :</span>
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
                  <RoundedButton label="저장" onClick={handleSave} size="md" user="counselor" />
                  <RoundedButton label="취소" onClick={handleCancel} size="md" user="counselor" />
                </div>
              ) : null}
            </li>
          </form>
        </ul>
        <section className="flex-grow-[2] flex flex-col justify-evenly items-center">
          <span className="w-1/2">
            <RoundedButton
              label="비밀번호 변경하기"
              onClick={openModal}
              size="lg"
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
          <Link to={'edit'} className="w-1/2">
            <RoundedButton label="조회 정보 수정" onClick={() => {}} size="lg" user="counselor" />
          </Link>
          <Link to={'product'} className="w-1/2">
            <RoundedButton label="내 상품 관리" onClick={() => {}} size="lg" user="counselor" />
          </Link>
          <Link to={'time'} className="w-1/2">
            <RoundedButton label="상담 일정 관리" onClick={() => {}} size="lg" user="counselor" />
          </Link>
          <Link to={'exclude'} className="w-1/2">
            <RoundedButton
              label="근무 예외 시간 관리"
              onClick={() => {}}
              size="lg"
              user="counselor"
            />
          </Link>
        </section>
      </main>
    </>
  );
};

export default CouselorMyPage;
