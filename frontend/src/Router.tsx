import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/ProtectedRoute';
import MainPage from '@/pages/main/MainPage';
import MainPageClient from '@/pages/main/MainPageClient';
import MainPageCounselor from '@/pages/main/MainPageCounselor';
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
import CounselorReservePage from '@/pages/counselor/CounselorReservePage';
import CommunityListPage from '@/pages/community/CommunityListPage';
import CommunityDetailPage from '@/pages/community/CommunityDetailPage';
import CommunityWritePostPage from '@/pages/community/CommunityWritePostPage';
import SupervisionListPage from '@/pages/supervision/SupervisionListPage';
import SupervisionDetailPage from '@/pages/supervision/SupervisionDetailPage';
import SupervisionWritePostPage from '@/pages/supervision/SupervisionWritePostPage';
import SupervisionEditPostPage from '@/pages/supervision/SupervisionEditPostPage';
import ClientMyPage from '@/pages/mypage/ClientMyPage';
import CounselorMyPage from '@/pages/mypage/CounselorMyPage';
import CounselorManageProductPage from '@/pages/mypage/CounselorManageProductPage';
import CounselorManageTimePage from '@/pages/mypage/CounselorManageTimePage';
import CounselorManageExcludePage from '@/pages/mypage/CounselorManageExcludePage';
import EmotionDiaryPage from '@/pages/emotiondiary/EmotionDiaryPage';
import CounselHistory from '@/pages/mycounsel/counselor/CounselHistory';
import CounselRecordList from '@/pages/mycounsel/counselor/CounselRecordList';
import CounselRecordDetail from '@/pages/mycounsel/counselor/CounselRecordDetail';
import ClientHistory from '@/pages/mycounsel/client/ClientHistory';
import ClientFaceChat from '@/pages/mycounsel/client/ClientFaceChat';
import CounselorFaceChat from '@/pages/mycounsel/counselor/CounselorFaceChat';
import PostitPage from '@/pages/postit/PostitPage';
import UnauthoriziedPage from '@/pages/UnauthoriziedPage';

import useAuthStore from '@/stores/authStore';

const Router = () => {
  const { isCounselor, isClient, isAuthenticated } = useAuthStore();
  const getHomePageElement = () => {
    if (isAuthenticated && isCounselor()) {
      return <MainPageCounselor />;
    } else if (isAuthenticated && isClient()) {
      return <MainPageClient />;
    }
    return <MainPage />;
  };
  return (
    <Routes>
      {/* Main Routes  */}
      <Route path="/" element={getHomePageElement()} />
      {/* <Route path="/" element={<MainPage />} /> */}
      {/* <Route path="/client/main" element={<MainPageClient />} /> */}
      {/* <Route path="/counselor/main" element={<MainPageCounselor />} /> */}
      {/* SignUp Routes */}
      <Route path="/signup/choose" element={<SignUpChoose />} />
      <Route path="/signup/client/*" element={<SignUpClient />} />
      <Route path="/signup/counselor/*" element={<SignUpCounselor />} />

      {/* Counselor Routes */}
      <Route path="/counselor" element={<CounselorListPage />} />
      <Route path="/counselor/:counselorId" element={<CounselorDetailPage />} />
      <Route path="/counselor/:counselorId/reservation" element={<CounselorReservePage />} />

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
      <Route element={<ProtectedRoute allowedRoles={['상담사']} />}>
        <Route path="/supervision" element={<SupervisionListPage />} />
        <Route path="/supervision/:supervisionId" element={<SupervisionDetailPage />} />
        <Route path="/supervision/write/post" element={<SupervisionWritePostPage />} />
        <Route path="/supervision/edit/:supervisionId" element={<SupervisionEditPostPage />} />
      </Route>

      {/* MyPage Routes */}
      <Route path="/mypage/client" element={<ClientMyPage />} />
      <Route path="/mypage/counselor" element={<CounselorMyPage />} />
      <Route path="/mypage/counselor/product" element={<CounselorManageProductPage />} />
      <Route path="/mypage/counselor/time" element={<CounselorManageTimePage />} />
      <Route path="/mypage/counselor/exclude" element={<CounselorManageExcludePage />} />

      {/* EmotionDiary Routes */}
      <Route path="/emotiondiary" element={<EmotionDiaryPage />} />

      {/* MyCounsel Routes */}
      {/* MyCounsel Routes */}
      <Route path="/mycounsel/counselor/history/" element={<CounselHistory />} />
      <Route
        path="/mycounsel/counselor/history/facechat/:counsultId/:memberId"
        element={<CounselorFaceChat />}
      />
      <Route path="/mycounsel/counselor/record" element={<CounselRecordList />} />
      <Route path="/mycounsel/counselor/record/:clientId/*" element={<CounselRecordDetail />} />
      <Route path="/mycounsel/client/history" element={<ClientHistory />} />
      <Route
        path="/mycounsel/client/history/facechat/:counsultId/:memberId"
        element={<ClientFaceChat />}
      />

      {/* Postit Routes */}
      <Route path="/postit" element={<PostitPage />} />

      {/* Unauthorizied */}
      <Route path="/unauthorized" element={<UnauthoriziedPage />} />
    </Routes>
  );
};

export default Router;
