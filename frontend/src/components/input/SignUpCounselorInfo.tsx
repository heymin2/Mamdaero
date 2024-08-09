import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUpCounselorInfo: React.FC = () => {
  const location = useLocation();
  const { formData } = location.state || {};

  const [formState, setFormState] = useState({
    password: '',
    confirmPassword: '',
    address: '',
    intro: '',
    intro_detail: '',
    gender: '',
    image: null as File | null,
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormState({ ...formState, image: e.target.files[0] });
    }
  };

  const handleGenderChange = (gender: string) => {
    setFormState({ ...formState, gender });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formState.password || !formState.confirmPassword || !formState.gender) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      return;
    }

    const dataToSubmit = {
      name: formData?.name || '',
      license: formData?.license || '',
      email: formData?.email || '',
      gender: formState.gender,
      level: formData?.license ? formData.license.charAt(0) : '',
      password: formState.password,
    };

    navigate('/signup/counselor/complete');
  };

  return (
    <div className="w-full max-w-3xl bg-white p-16 rounded-lg shadow-md text-gray-700">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex">
          <div className="flex-grow space-y-4 w-1/2 mr-5">
            <div className="space-y-4">
              <div className="flex space-x-5">
                <p className="w-1/3 font-bold">이름</p>
                <p>{formData.counselorName}</p>
              </div>
              <div className="flex space-x-5">
                <p className="w-1/3 font-bold">자격번호</p>
                <p>{formData.license}</p>
              </div>
              <div className="flex space-x-5">
                <p className="w-1/3 font-bold">이메일</p>
                <p>{formData.email}</p>
              </div>
            </div>
            <div className="flex space-x-5 items-center">
              <label className="w-1/3 block font-bold">비밀번호</label>
              <input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleInputChange}
                className="w-3/4 p-2 border rounded"
              />
            </div>
            <div className="flex space-x-5 items-center">
              <label className="w-1/3 block font-bold">비밀번호 확인</label>
              <input
                type="password"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleInputChange}
                className="w-3/4 p-2 border rounded"
              />
            </div>
            <div className="flex space-x-5 items-center">
              <label className="w-1/3 block font-bold">성별</label>
              <div className="flex justify-between w-3/4">
                <button
                  type="button"
                  className={`flex-1 p-3 mx-1 rounded-md font-bold ${
                    formState.gender === 'M' ? 'bg-blue-200' : 'bg-gray-200'
                  }`}
                  onClick={() => handleGenderChange('M')}
                >
                  남
                </button>
                <button
                  type="button"
                  className={`flex-1 p-3 mx-1 rounded-md font-bold ${
                    formState.gender === 'F' ? 'bg-blue-200' : 'bg-gray-200'
                  }`}
                  onClick={() => handleGenderChange('F')}
                >
                  여
                </button>
              </div>
            </div>
          </div>
          <div className="w-2/5 items-center justify-center">
            <label className="block font-bold mb-2">
              <span className="text-gray-400">(선택)</span> 이미지
            </label>
            <div className="flex items-center justify-center">
              <div className="w-full bg-gray-200 flex items-center justify-center rounded h-52">
                {formState.image ? (
                  <img
                    src={URL.createObjectURL(formState.image)}
                    alt="Selected"
                    className="w-full h-52 object-cover rounded"
                  />
                ) : (
                  <span>이미지</span>
                )}
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered file-input-xs mt-2 w-full"
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center">
            <label className="w-1/5 flex flex-col font-bold">
              <span className="text-gray-400">(선택)</span>
              <span>센터 주소</span>
            </label>
            <input
              type="text"
              name="address"
              value={formState.address}
              onChange={handleInputChange}
              className="flex-1 p-2 border rounded"
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/5 flex flex-col font-bold">
              <span className="text-gray-400">(선택)</span>
              <span>한줄소개</span>
            </label>
            <textarea
              name="intro"
              value={formState.intro}
              onChange={handleInputChange}
              maxLength={100}
              className="flex-1 p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold">
            <span className="text-gray-400">(선택)</span> 상세소개
          </label>
          <textarea
            name="intro_detail"
            value={formState.intro_detail}
            onChange={handleInputChange}
            maxLength={5000}
            className="w-full p-2 border rounded"
          />
        </div>
        {error && (
          <div className="w-full bg-red-200 text-xs text-red-700 p-2 rounded mb-4">{error}</div>
        )}
        <div className="flex justify-end font-bold">
          <button type="submit" className="p-2 bg-blue-200 rounded w-full">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpCounselorInfo;
