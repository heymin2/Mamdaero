import Button from '@/components/button/Button.tsx';
import GoogleLoginButton from '@/components/button/GoogleLoginButton';
import KakaoLoginButton from '@/components/button/KakaoLoginButton';
import { Link } from 'react-router-dom';

const Login = () => {};
const LoginForm = () => {
  return (
    <div className="max-w-sm w-full bg-gray-50">
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
      <div className="pt-6">
        <Button label="로그인" onClick={Login} size="full" color="orange" textSize="xl"></Button>
      </div>
      <div className="flex pt-4 justify-evenly items-center">
        <GoogleLoginButton />
        <KakaoLoginButton />
        <Link to="/signup/choose">
          <Button onClick={Login} label="회원가입" size="lg" color="gray"></Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
