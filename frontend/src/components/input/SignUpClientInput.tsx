import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpClientInput: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<'M' | 'F' | 'none'>('none');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
    birth: '',
    tel: '',
    role: 'client',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderChange = (gender: 'M' | 'F' | 'none') => {
    setSelectedGender(gender);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      return;
    }

    if (!/^\d{8}$/.test(formData.birth)) {
      setError('생년월일은 8자리 숫자로 입력해주세요.');
      return;
    }

    if (!/^010\d{8}$/.test(formData.tel)) {
      setError('전화번호는 01012345678 형식으로 입력해주세요.');
      return;
    }

    setError(null);
    const dataToSubmit = {
      ...formData,
      gender: selectedGender === 'none' ? null : selectedGender,
    };
    console.log('Form submitted:', dataToSubmit);
    alert('회원가입이 완료되었습니다!');
    navigate('/');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-[472px] h-[555px] bg-gray-50 rounded-[10px] overflow-hidden m-4"
    >
      {error && (
        <div className="absolute w-[363px] top-2 left-[54px] bg-red-200 text-xs text-red-700 p-2 rounded">
          {error}
        </div>
      )}
      <div className="absolute w-[363px] h-[108px] top-[79px] left-[54px] bg-[#ffffff] rounded-[5px] overflow-hidden border border-solid border-gray-300">
        <div className="absolute w-[363px] h-9 top-0 left-0 border-b [border-bottom-style:solid] border-gray-300">
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleInputChange}
            className="absolute top-1.5 left-3 text-gray-400"
          />
          <div className="absolute w-[67px] h-[22px] top-[7px] left-[290px]">
            <div className="w-[65px] h-[22px] relative bg-tailwindorange-200 rounded-[10px]">
              <div className="top-[3px] left-[9px]  text-[#000000] text-xs absolute font-normal text-center tracking-[0] leading-[normal]">
                중복 확인
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-[363px] h-9 top-9 left-0 border-b [border-bottom-style:solid] border-gray-300">
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleInputChange}
            className="absolute top-1.5 left-3 text-gray-400"
          />
        </div>
        <div className="absolute w-[363px] h-9 top-[72px] left-0">
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="absolute top-1.5 left-3 text-gray-400"
          />
        </div>
      </div>
      <div className="absolute w-[363px] h-[180px] top-[214px] left-[54px] bg-[#ffffff] rounded-[5px] overflow-hidden border border-solid border-gray-300">
        <div className="absolute w-[363px] h-9 top-0 left-0 border-b [border-bottom-style:solid] border-gray-300">
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleInputChange}
            className="absolute top-1.5 left-3 text-gray-400"
          />
        </div>
        <div className="absolute w-[363px] h-9 top-9 left-0 border-b [border-bottom-style:solid] border-gray-300">
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={formData.nickname}
            onChange={handleInputChange}
            className="absolute top-1.5 left-3 text-gray-400"
          />
          <div className="absolute w-[67px] h-[22px] top-[7px] left-[290px]">
            <div className="w-[65px] h-[22px] relative bg-tailwindorange-200 rounded-[10px]">
              <div className="top-[3px] left-[9px] text-[#000000] text-xs absolute font-normal text-center">
                중복 확인
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-[363px] h-9 top-[72px] left-0 border-b [border-bottom-style:solid] border-gray-300">
          <input
            type="text"
            name="birth"
            placeholder="[선택] 생년월일 8자리"
            value={formData.birth}
            onChange={handleInputChange}
            className="absolute top-1.5 left-3 text-gray-400"
          />
        </div>
        <div className="absolute w-[363px] h-9 top-[108px] left-0 border-b [border-bottom-style:solid] border-gray-300">
          <input
            type="tel"
            name="tel"
            placeholder="전화번호"
            value={formData.tel}
            onChange={handleInputChange}
            className="absolute top-1.5 left-3 text-gray-400"
          />
        </div>
        <div className="absolute w-[360px] h-[35px] top-36 left-0">
          <div
            className={`absolute w-[120px] h-[35px] top-0 left-0 flex items-center justify-center cursor-pointer ${
              selectedGender === 'M' ? 'bg-orange-200' : 'bg-gray-200'
            }`}
            onClick={() => handleGenderChange('M')}
          >
            <div className="text-gray-400 text-center">남</div>
          </div>
          <div
            className={`absolute w-[120px] h-[35px] top-0 left-60 flex items-center justify-center cursor-pointer ${
              selectedGender === 'none' ? 'bg-orange-200' : 'bg-gray-200'
            }`}
            onClick={() => handleGenderChange('none')}
          >
            <div className="text-gray-400 text-center">선택 안함</div>
          </div>
          <div
            className={`absolute w-[120px] h-[35px] top-0 left-[120px] flex items-center justify-center cursor-pointer ${
              selectedGender === 'F' ? 'bg-orange-200' : 'bg-gray-200'
            }`}
            onClick={() => handleGenderChange('F')}
          >
            <div className="text-gray-400 text-center">여</div>
          </div>
        </div>
      </div>
      <div className="absolute w-[365px] h-16 top-[418px] left-[54px]">
        <button
          type="submit"
          className="w-[363px] h-16 bg-orange-200 relative rounded-[10px] flex items-center justify-center"
        >
          <span className="font-h4-regular text-gray-400 text-center">회원가입</span>
        </button>
      </div>
    </form>
  );
};

export default SignUpClientInput;
