import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReportInfoTable from '@/components/table/ReportInfoTable';
import SelfTestResultTable from '@/components/table/SelfTestResultTable';
import MyCounselBar from '@/components/navigation/MyCounselBar';
import useAuthStore from '@/stores/authStore';

const CounselRecordDetail: React.FC = () => {
  const { email } = useAuthStore();
  const { clientId } = useParams<{ clientId: string }>();
  const [activeTab, setActiveTab] = useState('보고서');

  // 클라이언트 정보를 가져오는 로직 (예: API 호출)
  const clientName = '클라이언트 이름'; // 실제로는 API에서 가져와야 합니다

  const memberId = email?.split('@')[0] || 'unknown';

  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단바 */}
      <div className="sticky bg-blue-50 top-0 z-10 mb-8">
        <MyCounselBar
          title1={clientName}
          title2="상담기록"
          subtitle="내담자의 기록을 확인하여 개인 맞춤형 상담 서비스를 제공하세요!"
          user="counselor"
          buttonLabel="내담자 목록 보기"
          buttonPath="/mycounsel/record"
        />
      </div>
      {/* 상담기록 탭목록 */}
      <div className="w-full flex flex-col items-center">
        <div role="tablist" className="w-4/5 tabs tabs-lifted">
          <input
            type="radio"
            name="records"
            role="tab"
            className="tab font-bold border-4 border-blue-300"
            aria-label="보고서"
            defaultChecked
            onChange={() => setActiveTab('보고서')}
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="h-[600px] overflow-y-auto">
              {/* {activeTab === '보고서' && <ReportInfoTable clientId={clientId || ''} />} */}
            </div>
          </div>

          <input
            type="radio"
            name="records"
            role="tab"
            className="tab font-bold border-4 border-blue-300"
            aria-label="자가진단검사결과"
            onChange={() => setActiveTab('자가진단검사결과')}
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="h-[600px] overflow-y-auto">
              {activeTab === '자가진단검사결과' && (
                <SelfTestResultTable clientId={clientId || ''} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselRecordDetail;
