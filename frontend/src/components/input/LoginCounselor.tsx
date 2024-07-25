import SquareButton from '@/components/button/SquareButton.tsx';
const Login = () => {};
const LoginForm = () => {
  return (
    <div className="p-8 max-w-sm w-full bg-gray-100 rounded-lg shadow-lg">
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
        <SquareButton label="로그인" onClick={Login} size="full" user="counselor"></SquareButton>
        <SquareButton
          label="상담사 회원가입"
          onClick={Login}
          size="full"
          user="common"
        ></SquareButton>
      </div>
    </div>
  );
};

export default LoginForm;
