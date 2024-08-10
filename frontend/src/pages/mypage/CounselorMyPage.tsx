import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import Button from '@/components/button/Button';
import PasswordChangeModal from '@/components/modal/PasswordChangeModal';
import defaultImage from '@/assets/DefaultProfile.jpg';

interface Counselor {
  id: string;
  name: string;
  email: string;
  tel: string;
  birth: string;
  gender: string;
  password: string;
  address: string;
  intro: string;
  introDetail: string;
  img: string;
}

const CouselorMyPage: React.FC = () => {
  const [counselor, setCounselor] = useState<Counselor>({
    id: '111-1111',
    name: '박민준',
    email: 'ppmm98@yu.ac.kr',
    tel: '01012341234',
    birth: '1998-07-20',
    gender: '남',
    password: '1234',
    address: '서울특별시 강남구 테헤란로 123',
    intro: '10년 경력의 전문 상담사입니다.',
    introDetail: '심리학 박사 학위를 가지고 있으며, 다양한 심리 문제에 대한 상담 경험이 있습니다.',
    img: defaultImage,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const level = counselor.id.charAt(0);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  // 전화번호 유효성
  const validateTel = (tel: string): boolean => {
    const regex = /^010-\d{4}-\d{4}$/;
    return regex.test(tel);
  };

  const formatTelvalidateTelNumber = (value: string) => {
    const telNumber = value.replace(/[^\d]/g, '');
    const telNumberLength = telNumber.length;
    if (telNumberLength <= 3) return telNumber;
    if (telNumberLength <= 7) return `${telNumber.slice(0, 3)}-${telNumber.slice(3)}`;
    return `${telNumber.slice(0, 3)}-${telNumber.slice(3, 7)}-${telNumber.slice(7, 11)}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'tel') {
      const formattedNumber = formatTelvalidateTelNumber(value);
      setCounselor(prev => ({ ...prev, [name]: formattedNumber }));
      if (!validateTel(formattedNumber)) {
        setErrors(prev => ({ ...prev, tel: '올바른 전화번호 형식이 아닙니다 (010-1234-5678).' }));
      } else {
        setErrors(prev => ({ ...prev, tel: '' }));
      }
    } else {
      setCounselor(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCounselor(prev => ({ ...prev, img: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setCounselor(prev => ({ ...prev, img: defaultImage }));
  };

  const handleSave = () => {
    if (Object.values(errors).some(error => error !== '')) {
      alert('입력 정보를 확인해주세요.');
      return;
    }
    console.log(counselor);
    setIsEditing(false);
  };

  const handleGenderChange = (selectedGender: string) => {
    setCounselor(prev => ({ ...prev, gender: selectedGender }));
  };

  return (
    <>
      <header className="sticky bg-blue-50 top-0 z-10 border-b-2 mb-5">
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
                color="blue"
              />
            ) : null}
            <div className="flex flex-col text-right text-gray-500 flex-grow">
              <div>상담사님의 정보를 관리해주세요!</div>
            </div>
            <div className="text-4xl font-bold ms-8 flex-shrink-0">
              <span className="text-blue-500">상담사 </span>마이페이지
            </div>
          </div>
        </div>
      </header>
      <main className="flex justify-around">
        <div className="flex flex-col items-center w-full md:w-1/3 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6 text-center">
              <img
                src={counselor.img}
                alt="프로필 사진"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              {isEditing && (
                <div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profileImage"
                  />
                  <label htmlFor="profileImage" className="btn btn-blue btn-sm mr-2">
                    사진 변경
                  </label>
                  <button onClick={handleImageDelete} className="btn btn-red btn-sm">
                    삭제
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2">한 줄 소개</label>
              {isEditing ? (
                <div className="relative">
                  <textarea
                    name="intro"
                    value={counselor.intro}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    maxLength={30}
                  />
                  <span className="absolute right-2 bottom-2 text-xs text-gray-500">
                    {counselor.intro.length}/30
                  </span>
                </div>
              ) : (
                <p>{counselor.intro}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-md font-bold mb-2">상담소 주소</label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={counselor.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  maxLength={128}
                />
              ) : (
                <p>{counselor.address}</p>
              )}
            </div>
          </div>
          {!isEditing && (
            <div className="flex flex-col mt-8 justify-center gap-4">
              <Link to={'product'}>
                <Button
                  label="내 상품 관리"
                  onClick={() => {}}
                  size="lg"
                  textSize="md"
                  color="blue"
                  shape="rounded"
                />
              </Link>
              <Link to={'time'}>
                <Button
                  label="상담 일정 관리"
                  onClick={() => {}}
                  size="lg"
                  textSize="md"
                  color="blue"
                  shape="rounded"
                />
              </Link>
              <Link to={'exclude'}>
                <Button
                  label="근무 예외 시간 관리"
                  onClick={() => {}}
                  size="lg"
                  textSize="md"
                  color="blue"
                  shape="rounded"
                />
              </Link>
            </div>
          )}
          {isEditing && (
            <div className="flex flex-col items-center mt-8 space-y-4">
              <PasswordChangeModal password={counselor.password} />
              <div className="flex justify-center space-x-5">
                <Button label="저장" onClick={handleSave} shape="rounded" color="blue" />
                <Button label="취소" onClick={handleCancel} shape="rounded" color="gray" />
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-2/3 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <ul className="flex flex-col h-full">
              <form onSubmit={e => e.preventDefault()}>
                {[
                  { name: '이름', type: 'text', key: 'name', maxLength: 20 },
                  { name: '자격번호', type: 'text', key: 'id', readOnly: true },
                  { name: '이메일', type: 'email', key: 'email', readOnly: true },
                  { name: '전화번호', type: 'tel', key: 'tel', maxLength: 13 },
                  { name: '생년월일', type: 'date', key: 'birth' },
                  { name: '성별', type: 'gender', key: 'gender' },
                  { name: '등급', type: 'text', key: 'level', readOnly: true, value: `${level}급` },
                ].map(field => (
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
                              onClick={() => handleGenderChange('남')}
                              color={counselor.gender === '남' ? 'blue' : 'gray'}
                              shape="rounded"
                            />
                            <Button
                              label="여"
                              onClick={() => handleGenderChange('여')}
                              color={counselor.gender === '여' ? 'blue' : 'gray'}
                              shape="rounded"
                            />
                          </div>
                        ) : field.readOnly ? (
                          <span className="mx-auto font-bold text-md break-keep whitespace-nowrap">
                            {field.value ?? counselor[field.key as keyof Counselor]}
                          </span>
                        ) : (
                          <div className="flex flex-col w-full max-w-xs">
                            <input
                              type={field.type}
                              name={field.key}
                              className="input input-bordered w-full"
                              value={counselor[field.key as keyof Counselor]}
                              onChange={handleChange}
                              readOnly={field.readOnly}
                              maxLength={field.maxLength}
                            />
                            {errors[field.key] && (
                              <span className="text-red-500 text-sm mt-1">{errors[field.key]}</span>
                            )}
                          </div>
                        )
                      ) : (
                        <span className="mx-auto font-bold text-md break-keep whitespace-nowrap">
                          {field.value ?? counselor[field.key as keyof Counselor]}
                        </span>
                      )}
                    </div>
                    <div className="divider"></div>
                  </li>
                ))}
              </form>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="block text-gray-700 font-bold text-md mb-2">상세 소개</label>
            {isEditing ? (
              <div className="relative">
                <textarea
                  name="introDetail"
                  value={counselor.introDetail}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows={6}
                  maxLength={2000}
                />
                <span className="absolute right-2 bottom-2 text-xs text-gray-500">
                  {counselor.introDetail.length}/2000
                </span>
              </div>
            ) : (
              <p>{counselor.introDetail}</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default CouselorMyPage;
