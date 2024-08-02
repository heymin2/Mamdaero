import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '@/pages/main/MainPage';
import SignUpChoose from '@/pages/signup/SignUpChoose';
import SignUpClient from '@/pages/signup/SignUpClient';
import SignUpCounselor from '@/pages/signup/SignUpCounselor';
import SignUpCounselorInfo from '@/components/input/SignUpCounselorInfo';
import SelfTestListPage from '@/pages/selftest/SelfTestListPage';
import UnrestPage from '@/pages/selftest/UnrestPage';
import UnrestResultPage from '@/pages/selftest/UnrestResultPage';
import StressPage from '@/pages/selftest/StressPage';
import StressResultPage from '@/pages/selftest/StressResultPage';
import DepressedPage from '@/pages/selftest/DepressedPage';
import DepressedResultPage from '@/pages/selftest/DepressedResultPage';
import PTSDPage from '@/pages/selftest/PTSDPage';
import PTSDResultPage from '@/pages/selftest/PTSDResultPage';
import BipolarPage from '@/pages/selftest/BipolarPage';
import BipolarResultPage from '@/pages/selftest/BipolarResultPage';
import CounselorListPage from '@/pages/counselor/CounselorListPage';
import CounselorDetailPage from '@/pages/counselor/CounselorDetailPage';
import CommunityListPage from '@/pages/community/CommunityListPage';
import CommunityDetailPage from '@/pages/community/CommunityDetailPage';
import CommunityWritePostPage from '@/pages/community/CommunityWritePostPage';
import SupervisionListPage from '@/pages/supervision/SupervisionListPage';
import SupervisionDetailPage from '@/pages/supervision/SupervisionDetailPage';
import SupervisionWritePostPage from '@/pages/supervision/SupervisionWritePostPage';
import ClientMyPage from '@/pages/mypage/ClientMyPage';
import CounselorMyPage from '@/pages/mypage/CounselorMyPage';
import CounselorEditProfile from '@/pages/mypage/CounselorEditProfile';
import CounselorManageProduct from '@/pages/mypage/CounselorManageProduct';
import CounselorManageTime from '@/pages/mypage/CounselorManageTime';
import CounselorManageExclude from '@/pages/mypage/CounselorManageExclude';
import EmotionDiaryPage from '@/pages/emotiondiary/EmotionDiaryPage';

const Router = () => (
  <Routes>
    {/* Main Routes  */}
    <Route path="/" element={<MainPage />} />
    {/* SignUp Routes */}
    <Route path="/signup/choose" element={<SignUpChoose />} />
    <Route path="/signup/client" element={<SignUpClient />} />
    <Route path="/signup/counselor/*" element={<SignUpCounselor />} />
    {/* Counselor Routes */}
    <Route path="/counselor" element={<CounselorListPage />} />
    <Route path="/counselor/:counselorId" element={<CounselorDetailPage />} />
    {/* Self Test Routes */}
    <Route path="/selftest" element={<SelfTestListPage />} />
    <Route path="/selftest/unrest" element={<UnrestPage />} />
    <Route path="/selftest/unrest/result" element={<UnrestResultPage />} />
    <Route path="/selftest/stress" element={<StressPage />} />
    <Route path="/selftest/stress/result" element={<StressResultPage />} />
    <Route path="/selftest/depressed" element={<DepressedPage />} />
    <Route path="/selftest/depressed/result" element={<DepressedResultPage />} />
    <Route path="/selftest/ptsd" element={<PTSDPage />} />
    <Route path="/selftest/ptsd/result" element={<PTSDResultPage />} />
    <Route path="/selftest/bipolar" element={<BipolarPage />} />
    <Route path="/selftest/bipolar/result" element={<BipolarResultPage />} />
    {/* Community Routes */}
    <Route path="/community" element={<CommunityListPage />} />
    <Route path="/community/:communityId" element={<CommunityDetailPage />} />
    <Route path="/community/write/post" element={<CommunityWritePostPage />} />
    {/* Supervision Routes */}
    <Route path="/supervision" element={<SupervisionListPage />} />
    <Route path="/supervision/:supervisionId" element={<SupervisionDetailPage />} />
    <Route path="/supervision/write/post" element={<SupervisionWritePostPage />} />
    {/* MyPage Routes */}
    <Route path="/mypage/client" element={<ClientMyPage />} />
    <Route path="/mypage/counselor" element={<CounselorMyPage />} />
    <Route path="/mypage/counselor/edit" element={<CounselorEditProfile />} />
    <Route path="/mypage/counselor/product" element={<CounselorManageProduct />} />
    <Route path="/mypage/counselor/time" element={<CounselorManageTime />} />
    <Route path="/mypage/counselor/exclude" element={<CounselorManageExclude />} />
    {/* EmotionDiary Routes */}
    <Route path="/emotiondiary" element={<EmotionDiaryPage />} />
  </Routes>
);

export default Router;
