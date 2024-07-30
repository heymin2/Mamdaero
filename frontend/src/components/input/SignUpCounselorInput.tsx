import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SquareButton from '@/components/button/SquareButton.tsx';
import Button from '@/components/button/RoundedButton';

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
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-gray-700">
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
        <div className="flex justify-between items-center mb-2 space-x-3">
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded mb-2"
          />
          <Button label={'인증요청'} onClick={() => {}} size="md" user="counselor" />
        </div>
        <div className="flex justify-between items-center mb-2 space-x-3">
          <input
            type="text" // 인증번호 text로 받으면 되겠지..?
            name="verificationCode"
            placeholder="인증번호"
            value={formData.verificationCode}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <Button label={'인증확인'} onClick={() => {}} size="md" user="counselor" />
        </div>
      </div>
      <SquareButton onClick={handleNext} size="full" user={'counselor'} label={'다음'} />
    </div>
  );
};

export default SignUpCounselorInput;
