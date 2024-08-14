import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import Button from '@/components/button/Button';
import FindPasswordVerifyForm from '@/pages/findpassword/FindPasswordVerifyForm';

interface AuthFormData {
  name: string;
  email: string;
  auth_token: string;
}

const resetPassword = async () => {
  const response = await axiosInstance({
    method: 'patch',
    url: 'p/member/password-reset',
  });
  return response.data;
};

const FindPasswordPage = () => {
  return (
    <div>
      <div className="text-center font-bold text-3xl mt-24 text-gray-600">비밀번호 찾기</div>
      <FindPasswordVerifyForm />
    </div>
  );
};

export default FindPasswordPage;
