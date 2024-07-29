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
    detail: '',
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
    formDataToSubmit.append('detail', formState.detail);
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
    <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-center mb-8">
        <h2 className="text-3xl font-bold text-blue-500">상담사 가입 페이지</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-6 mb-4">
          <div className="flex-grow space-y-2">
            <div className="flex space-x-4">
              <div className="w-1/3">
                <label className="block text-gray-700">이름</label>
                <input
                  type="text"
                  name="name"
                  value={formData?.name || ''}
                  readOnly
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="w-1/3">
                <label className="block text-gray-700">자격 번호</label>
                <input
                  type="text"
                  name="license"
                  value={formData?.license || ''}
                  readOnly
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="w-1/3">
                <label className="block text-gray-700">이메일</label>
                <input
                  type="email"
                  name="email"
                  value={formData?.email || ''}
                  readOnly
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">비밀번호</label>
                <input
                  type="password"
                  name="password"
                  value={formState.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">비밀번호 확인</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formState.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">센터 주소</label>
              <input
                type="text"
                name="address"
                value={formState.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700 mb-2">이미지</label>
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded">
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
            <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />
          </div>
        </div>
        <div>
          <label className="block text-gray-700">한줄소개</label>
          <textarea
            name="intro"
            value={formState.intro}
            onChange={handleInputChange}
            maxLength={100}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">상세소개</label>
          <textarea
            name="detail"
            value={formState.detail}
            onChange={handleInputChange}
            maxLength={5000}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="p-2 bg-blue-200 rounded">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpCounselorInfo;
