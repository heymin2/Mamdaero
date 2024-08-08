import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import Button from '@/components/button/CertificationButton';

const SignUpClientInput: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
    birth: '',
    tel: '',
    role: 'client',
    gender: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [emailConfirmation, setEmailConfirmation] = useState<string | null>(null);
  const [nicknameConfirmation, setNicknameConfirmation] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkEmailDuplicate = async (email: string): Promise<boolean> => {
    const response = await axiosInstance({
      method: 'post',
      url: 'p/member/email-check',
      data: { email },
    });
    return response.data;
  };

  const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
    const response = await axiosInstance({
      method: 'post',
      url: 'p/member/nickname-check',
      data: { nickname },
    });
    return response.data;
  };

  const emailMutation = useMutation({
    mutationFn: checkEmailDuplicate,
    onSuccess: email => {
      if (email) {
        setEmailConfirmation('사용 가능한 이메일입니다.');
      } else {
        setEmailConfirmation('이미 사용 중인 이메일입니다.');
      }
      setTimeout(() => setEmailConfirmation(null), 3000);
    },
    onError: error => {
      setEmailConfirmation(`이메일 중복 확인 중 오류가 발생했습니다. ${error}`);
      setTimeout(() => setEmailConfirmation(null), 3000);
    },
  });

  const nicknameMutation = useMutation({
    mutationFn: checkNicknameDuplicate,
    onSuccess: nickname => {
      if (nickname) {
        setNicknameConfirmation('사용 가능한 닉네임입니다.');
      } else {
        setNicknameConfirmation('이미 사용 중인 닉네임입니다.');
      }
      setTimeout(() => setNicknameConfirmation(null), 3000);
    },
    onError: error => {
      setNicknameConfirmation(`닉네임 중복 확인 중 오류가 발생했습니다. ${error}`);
      setTimeout(() => setNicknameConfirmation(null), 3000);
    },
  });

  const handleEmailCheck = (e: React.MouseEvent) => {
    e.preventDefault();
    emailMutation.mutate(formData.email);
  };

  const handleNicknameCheck = (e: React.MouseEvent) => {
    e.preventDefault();
    nicknameMutation.mutate(formData.nickname);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderChange = (gender: 'M' | 'F') => {
    setFormData({
      ...formData,
      gender,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setError(null);

    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.nickname ||
      !formData.tel ||
      !formData.gender
    ) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      return;
    }

    if (formData.birth && !/^\d{8}$/.test(formData.birth)) {
      setError('생년월일은 8자리 숫자로 입력해주세요.');
      return;
    }

    if (!/^010\d{8}$/.test(formData.tel)) {
      setError('전화번호는 01012345678 형식으로 입력해주세요.');
      return;
    }

    console.log('Form submitted:', formData);
    navigate('/signup/client/complete');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-lg bg-gray-50 rounded-lg overflow-hidden m-4 p-12 shadow-lg"
    >
      <div className="mb-6">
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
            <Button label={'중복확인'} onClick={handleEmailCheck} user="client" />
          </div>
          {emailConfirmation && (
            <div className="text-green-700 text-xs mt-2">{emailConfirmation}</div>
          )}
        </div>
        <div className="relative mb-4">
          <div className="flex items-center">
            <label
              className="w-1/5 block text-gray-700 text-base font-bold mb-2 mr-4"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="flex-1 p-3 border rounded-md text-gray-700 text-base mr-2"
            />
          </div>
        </div>
        <div className="relative mb-4">
          <div className="flex items-center">
            <label
              className="w-1/5 text-gray-700 text-base font-bold mb-2 mr-4 flex flex-col"
              htmlFor="confirmPassword"
            >
              <span>비밀번호</span>
              <span>확인</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="flex-1 p-3 border rounded-md text-gray-700 text-base"
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
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
              htmlFor="nickname"
            >
              닉네임
            </label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
              className="flex-1 p-3 border rounded-md text-gray-700 text-base mr-2"
            />
            <Button label={'중복확인'} onClick={handleNicknameCheck} user="client" />
          </div>
          {nicknameConfirmation && (
            <div className="text-green-700 text-xs mt-2">{nicknameConfirmation}</div>
          )}
        </div>
        <div className="relative mb-4">
          <div className="flex items-center">
            <label
              className="w-1/5 text-gray-700 text-base font-bold mb-2 mr-4 flex flex-col"
              htmlFor="birth"
            >
              <span className="text-gray-400">(선택)</span> <span>생년월일</span>
            </label>
            <input
              type="text"
              name="birth"
              value={formData.birth}
              onChange={handleInputChange}
              className="flex-1 p-3 border rounded-md text-gray-700 text-base"
              placeholder="YYYYMMDD"
            />
          </div>
        </div>
        <div className="relative mb-4">
          <div className="flex items-center">
            <label
              className="w-1/5 block text-gray-700 text-base font-bold mb-2 mr-4"
              htmlFor="tel"
            >
              전화번호
            </label>
            <input
              type="tel"
              name="tel"
              value={formData.tel}
              onChange={handleInputChange}
              className="flex-1 p-3 border rounded-md text-gray-700 text-base"
              placeholder="01012345678"
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center">
          <label className="w-1/5 block text-gray-700 text-base font-bold mb-2 mr-4">성별</label>
          <div className="flex justify-between flex-1">
            <button
              type="button"
              className={`flex-1 p-3 mx-1 rounded-md font-bold ${
                formData.gender === 'M' ? 'bg-orange-200' : 'bg-gray-200'
              }`}
              onClick={() => handleGenderChange('M')}
            >
              남
            </button>
            <button
              type="button"
              className={`flex-1 p-3 mx-1 rounded-md font-bold ${
                formData.gender === 'F' ? 'bg-orange-200' : 'bg-gray-200'
              }`}
              onClick={() => handleGenderChange('F')}
            >
              여
            </button>
          </div>
        </div>
      </div>
      {error && (
        <div className="w-full bg-red-200 text-xs text-red-700 p-2 rounded mb-4">{error}</div>
      )}
      <button
        type="submit"
        className="w-full p-3 bg-orange-200 rounded-md text-gray-800 font-semibold"
      >
        회원가입
      </button>
    </form>
  );
};

export default SignUpClientInput;
