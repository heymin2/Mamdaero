import React from 'react';
import Button from '@/components/button/SquareButton';

const SignUpCounselorCompleteCard: React.FC = () => {
  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body text-center items-center">
        <h2 className="card-title">가입이 완료되었습니다!</h2>
        <div className="card-actions justify-center mt-6">
          <Button
            label="홈으로 가기"
            user="counselor"
            size="md"
            onClick={() => (window.location.href = '/')} // 메인 페이지로 리다이렉트
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpCounselorCompleteCard;
