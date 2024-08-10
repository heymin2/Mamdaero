import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import { useMutation } from '@tanstack/react-query';

import Button from '@/components/button/Button.tsx';
import GoogleLoginButton from '@/components/button/GoogleLoginButton';
import KakaoLoginButton from '@/components/button/KakaoLoginButton';

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
  console.log(response);
  return response;
};

const LoginClient = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: loginUserInfo,
    onSuccess: data => {
      console.log('login successful', data);
      navigate('/client/main');
    },
    onError: error => {
      console.log('Login failed', error);
    },
  });

  const handleLogin = () => {
    loginMutation.mutate({ email, password });
  };

  const signUpLink = () => {
    navigate('/signup/choose');
  };

  return (
    <div className="max-w-sm w-full bg-gray-50">
      <label className=" w-full max-w-xs">
        <div className="label">
          <span className="label-text">아이디</span>
        </div>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="이메일 형식으로 입력해 주세요."
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className=" w-full max-w-xs">
        <div className="label">
          <span className="label-text">비밀번호</span>
        </div>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요."
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      {loginMutation.isError && (
        <p className="text-red-500 text-sm mb-4">
          로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.
        </p>
      )}
      <div className="pt-6">
        <Button
          label="로그인"
          onClick={handleLogin}
          size="full"
          color="orange"
          textSize="xl"
        ></Button>
      </div>
      <div className="flex pt-4 justify-evenly items-center">
        <GoogleLoginButton />
        <KakaoLoginButton />
        <Button onClick={signUpLink} label="회원가입" size="lg" color="gray"></Button>
      </div>
    </div>
  );
};

export default LoginClient;
