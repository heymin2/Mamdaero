import Button from '@/components/button/Button.tsx';
import { Link } from 'react-router-dom';
const Login = () => {};

const LoginForm = () => {
  return (
    <div className="max-w-sm w-full bg-gray-100">
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
        <Button label="로그인" onClick={Login} size="full" color="blue" textSize="xl"></Button>
        <Link to="/signup/choose">
          <Button label="회원가입" onClick={Login} size="lg" color="gray" textSize="md"></Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
