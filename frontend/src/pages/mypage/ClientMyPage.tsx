import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import Button from '@/components/button/Button';
import PasswordChangeModal from '@/components/modal/PasswordChangeModal';
import Prince from '@/assets/hi_prince.png';

interface Client {
  member_id: string;
  name: string;
  email: string;
  tel: string;
  birth: string;
  gender: string;
  nickname: string;
  password: string;
}

const ClientMyPage: React.FC = () => {
  const [users, setUsers] = useState<Client[]>([
    {
      member_id: '1',
      name: '이 상',
      email: 'ppmm98@yu.ac.kr',
      tel: '010-1234-1234',
      birth: '1910-09-23',
      gender: '남',
      nickname: '날 개',
      password: '1234',
    },
  ]);

  const [currentUser, setCurrentUser] = useState<Client>(users[0]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [birthError, setBirthError] = useState<string | null>(null);
  const [telError, setTelError] = useState<string | null>(null);

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleSave = (): void => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user.member_id === currentUser.member_id ? currentUser : user))
    );
    setIsEditing(false);
    alert('프로필이 성공적으로 업데이트되었습니다.');
  };

  const handleCancle = (): void => {
    setCurrentUser(users.find(user => user.member_id === currentUser.member_id) || users[0]);
    setIsEditing(false);
  };

  const validateBirth = (birth: string): boolean => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!regex.test(birth)) return false;

    const [year, month, day] = birth.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };

  const validateTel = (tel: string): boolean => {
    const regex = /^010-\d{4}-\d{4}$/;
    return regex.test(tel);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    if (name === 'tel') {
      const formattedTel = value
        .replace(/[^0-9]/g, '')
        .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      setCurrentUser(prevData => ({
        ...prevData,
        [name]: formattedTel,
      }));

      if (!validateTel(formattedTel)) {
        setTelError('올바른 전화번호 형식이 아닙니다 (010-1234-5678).');
      } else {
        setTelError(null);
      }
    } else if (name === 'birth') {
      const formattedBirth = value.replace(/[^0-9-]/g, '').slice(0, 10);
      setCurrentUser(prevData => ({
        ...prevData,
        [name]: formattedBirth,
      }));

      if (!validateBirth(formattedBirth)) {
        setBirthError('올바른 날짜 형식이 아닙니다 (YYYY-MM-DD).');
      } else {
        setBirthError(null);
      }
    } else {
      setCurrentUser(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <header className="sticky bg-orange-50 top-0 z-10 border-b-2 mb-5">
        <div className="flex flex-col my-6 mx-16 justify-end">
          <div className="flex justify-between items-center">
            {!isEditing ? (
              <Button
                label={
                  <span className="flex items-center mx-6">
                    <FiEdit />
                    <div className="ms-2 mt-0.5">프로필 수정하기</div>
                  </span>
                }
                onClick={handleEdit}
                size="lg"
                textSize="sm"
                shape="rounded"
                color="orange"
              />
            ) : null}
            <div className="flex flex-col text-right text-gray-500 flex-grow">
              <div>사용자님의 정보를 관리해주세요!</div>
            </div>
            <div className="text-4xl font-bold ms-8 flex-shrink-0">
              <span className="text-orange-500">사용자 </span>마이페이지
            </div>
          </div>
        </div>
      </header>
      <main className="flex justify-around">
        <div className="w-full md:w-1/3 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-between">
            <div className="text-center space-y-10">
              <p className="text-2xl font-bold my-4">
                <span className="text-orange-500 text-4xl">{currentUser.name}</span>님!
                <br />
                오늘도 좋은 하루 되세요
              </p>
              <img src={Prince} alt="Chat Prince" className="w-4/5 mx-auto" />
            </div>

            {isEditing && (
              <div className="flex flex-col items-center mt-8 space-y-4">
                <PasswordChangeModal password={currentUser.password} />
                <div className="flex justify-center space-x-5">
                  <Button label="저장" onClick={handleSave} shape="rounded" color="orange" />
                  <Button label="취소" onClick={handleCancle} shape="rounded" color="gray" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-2/3 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <ul className="flex flex-col h-full">
              <form onSubmit={e => e.preventDefault()}>
                {[
                  { name: '이름', type: 'text', key: 'name', readOnly: true },
                  { name: '닉네임', type: 'text', key: 'nickname' },
                  { name: '이메일', type: 'email', key: 'email' },
                  { name: '전화번호', type: 'tel', key: 'tel' },
                  { name: '생년월일', type: 'date', key: 'birth' },
                  { name: '성별', type: 'gender', key: 'gender' },
                ].map((field, index) => (
                  <li key={field.key}>
                    <div className="flex items-center">
                      <label className="min-w-32 inline-block font-bold text-md">
                        {field.name} :
                      </label>
                      {isEditing ? (
                        field.type === 'gender' ? (
                          <div className="space-x-5">
                            <Button
                              label="남"
                              onClick={() => setCurrentUser(prev => ({ ...prev, gender: '남' }))}
                              color={currentUser.gender === '남' ? 'orange' : 'gray'}
                              shape="rounded"
                            />
                            <Button
                              label="여"
                              onClick={() => setCurrentUser(prev => ({ ...prev, gender: '여' }))}
                              color={currentUser.gender === '여' ? 'orange' : 'gray'}
                              shape="rounded"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col w-full max-w-xs">
                            <input
                              type={field.type}
                              name={field.key}
                              className="input input-bordered w-full"
                              value={currentUser[field.key as keyof Client]}
                              onChange={handleChange}
                              readOnly={field.readOnly}
                            />
                            {field.key === 'tel' && telError && (
                              <span className="text-red-500 text-sm mt-1">{telError}</span>
                            )}
                            {field.key === 'birth' && birthError && (
                              <span className="text-red-500 text-sm mt-1">{birthError}</span>
                            )}
                          </div>
                        )
                      ) : (
                        <span className="mx-auto font-bold text-md break-keep whitespace-nowrap">
                          {currentUser[field.key as keyof Client]}
                        </span>
                      )}
                    </div>
                    {index !== 5 && <div className="divider"></div>}
                  </li>
                ))}
              </form>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default ClientMyPage;
