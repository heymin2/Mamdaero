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
    image: null as File | null,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('password', formState.password);
    formDataToSubmit.append('confirmPassword', formState.confirmPassword);
    formDataToSubmit.append('address', formState.address);
    formDataToSubmit.append('intro', formState.intro);
    formDataToSubmit.append('intro_detail', formState.intro_detail);
    formDataToSubmit.append('name', formData?.name || '');
    formDataToSubmit.append('license', formData?.license || '');
    formDataToSubmit.append('email', formData?.email || '');
    if (formState.image) {
      formDataToSubmit.append('image', formState.image);
    }

    console.log('Form submitted:', { ...formData, ...formState });
    alert('회원가입이 완료되었습니다!');
    navigate('/');
  };

  return (
    <div className="w-full max-w-3xl bg-white p-16 rounded-lg shadow-md  text-gray-700">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex mb-4">
          <div className="flex-grow space-y-4 w-1/2 mr-5">
            <div className="space-y-4">
              <div className="flex space-x-5 ">
                <p className="w-1/3 font-bold">이름</p>
                <p>{formData.name}</p>
              </div>
              <div className="flex space-x-5 ">
                <p className="w-1/3 font-bold">자격번호</p>
                <p>{formData.license}</p>
              </div>
              <div className="flex space-x-5 ">
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
            <div className="flex space-x-5 items-center ">
              <label className="w-1/3 block  font-bold">비밀번호 확인</label>
              <input
                type="password"
                name="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleInputChange}
                className="w-3/4 p-2 border rounded"
              />
            </div>
            <div className="flex space-x-5 items-center">
              <label className="w-1/3 block font-bold">센터 주소</label>
              <input
                type="text"
                name="address"
                value={formState.address}
                onChange={handleInputChange}
                className="w-3/4 p-2 border rounded"
              />
            </div>
          </div>
          <div className="w-2/5">
            <label className="block font-bold mb-2">이미지</label>
            <div className="w-full h-3/5 bg-gray-200 flex items-center justify-center rounded">
              {formState.image ? (
                <img
                  src={URL.createObjectURL(formState.image)}
                  alt="Selected"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <span>이미지</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered file-input-xs mt-2 "
            />
          </div>
        </div>

        <div>
          <label className="block font-bold">한줄소개</label>
          <textarea
            name="intro"
            value={formState.intro}
            onChange={handleInputChange}
            maxLength={100}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-bold">상세소개</label>
          <textarea
            name="intro_detail"
            value={formState.intro_detail}
            onChange={handleInputChange}
            maxLength={5000}
            className="w-full p-2 border rounded"
          />
        </div>
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
