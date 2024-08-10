import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@/stores/authStore';

import Button from '@/components/button/Button.tsx';
interface LoginInfo {
  email: string;
  password: string;
}

const loginUserInfo = async (loginUserInfo: LoginInfo) => {
  const response = axiosInstance({
    method: 'post',
    url: 'p/member/login',
    data: loginUserInfo,
  });
  return response;
};

const LoginCounselor = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore(state => state.login);

  const loginMutation = useMutation({
    mutationFn: loginUserInfo,
    onSuccess: data => {
      const { accessToken, role } = data.data.result;
      login(accessToken, role, email);
      navigate('/');
    },
    onError: error => {
      alert(error);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const signUpLink = () => {
    navigate('/signup/choose');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full bg-gray-50">
      <label className=" w-full max-w-xs">
        <div className="label">
          <span className="label-text">아이디</span>
        </div>
        <input
          type="text"
          placeholder="이메일 형식으로 입력해 주세요."
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className=" w-full max-w-xs">
        <div className="label">
          <span className="label-text">비밀번호</span>
        </div>
        <input
          type="text"
          placeholder="비밀번호를 입력해 주세요."
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <div className="pt-6 flex flex-col items-center space-y-4">
        <Button label="로그인" type="submit" size="full" color="orange" textSize="xl"></Button>
        <Button type="button" onClick={signUpLink} label="회원가입" size="lg" color="gray"></Button>
      </div>
    </form>
  );
};

export default LoginCounselor;
