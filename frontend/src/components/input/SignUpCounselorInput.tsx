import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpCounselorInput: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    license: '',
    email: '',
    verificationCode: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    navigate('/signup/counselor/info', { state: { formData } });
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="license"
          placeholder="자격번호"
          value={formData.license}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-2"
        />
        <div className="flex justify-between items-center mb-2">
          <input
            type="text"
            name="verificationCode"
            placeholder="인증번호"
            value={formData.verificationCode}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <button className="ml-2 p-2 bg-blue-200 rounded">인증확인</button>
        </div>
      </div>
      <button onClick={handleNext} className="w-full p-2 bg-gray-200 rounded">
        다음
      </button>
    </div>
  );
};

export default SignUpCounselorInput;
