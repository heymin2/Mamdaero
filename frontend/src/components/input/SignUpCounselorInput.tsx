import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SquareButton from '@/components/button/SquareButton.tsx';
import Button from '@/components/button/RoundedButton';

const SignUpCounselorInput: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    license: '',
    email: '',
    verificationCode: '', // 인증번호 추가
  });
  const [error, setError] = useState<string | null>(null);
  const [emailConfirmation, setEmailConfirmation] = useState<string | null>(null);
  const [verificationConfirmation, setVerificationConfirmation] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (!formData.name || !formData.license || !formData.email || !formData.verificationCode) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    navigate('/signup/counselor/info', { state: { formData } });
  };

  const handleEmailVerification = () => {
    setEmailConfirmation('인증번호를 보냈습니다.');
    setTimeout(() => setEmailConfirmation(null), 3000); // 3초 후에 메시지 숨기기
  };

  const handleVerificationCode = () => {
    setVerificationConfirmation('인증확인됐습니다.');
    setTimeout(() => setVerificationConfirmation(null), 3000); // 3초 후에 메시지 숨기기
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-gray-700">
      <div className="mb-4">
        <div className="relative mb-4">
          <div className="flex items-center">
            <label
              className="w-1/5 block text-gray-700 text-base font-bold mb-2 mr-4"
              htmlFor="name"
            >
              이름
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="flex-1 p-3 border rounded-md text-gray-700 text-base mr-2"
            />
          </div>
        </div>
        <div className="relative mb-4">
          <div className="flex items-center">
            <label
              className="w-1/5 block text-gray-700 text-base font-bold mb-2 mr-4"
              htmlFor="license"
            >
              자격번호
            </label>
            <input
              type="text"
              name="license"
              value={formData.license}
              onChange={handleInputChange}
              className="flex-1 p-3 border rounded-md text-gray-700 text-base mr-2"
            />
          </div>
        </div>
        <div className="relative mb-4">
          <div className="flex items-center">
            <label
              className="w-1/5 block text-gray-700 text-base font-bold mb-2 mr-4"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="flex-1 p-3 border rounded-md text-gray-700 text-base mr-2"
            />
            <Button
              label={'인증요청'}
              onClick={handleEmailVerification}
              size="md"
              user="counselor"
            />
          </div>
          {emailConfirmation && (
            <div className="text-green-700 text-sm mt-2">{emailConfirmation}</div>
          )}
        </div>
        <div className="relative mb-4">
          <div className="flex items-center">
            <label
              className="w-1/5 block text-gray-700 text-base font-bold mb-2 mr-4"
              htmlFor="verificationCode"
            >
              인증번호
            </label>
            <input
              type="text"
              name="verificationCode"
              value={formData.verificationCode}
              onChange={handleInputChange}
              className="flex-1 p-3 border rounded-md text-gray-700 text-base mr-2"
            />
            <Button
              label={'인증확인'}
              onClick={handleVerificationCode}
              size="md"
              user="counselor"
            />
          </div>
          {verificationConfirmation && (
            <div className="text-green-700 text-sm mt-2">{verificationConfirmation}</div>
          )}
        </div>
      </div>
      <SquareButton onClick={handleNext} size="full" user={'counselor'} label={'다음'} />
      {error && (
        <div className="w-full bg-red-200 text-sm text-red-700 p-2 rounded mt-4">{error}</div>
      )}
    </div>
  );
};

export default SignUpCounselorInput;
