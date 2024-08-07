import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReportInfoTable from '@/components/table/ReportInfoTable';
import SelfTestResultTable from '@/components/table/SelfTestResultTable';
import Button from '@/components/button/Button';
import { IoIosArrowBack } from 'react-icons/io';
import MyCounselBar from '@/components/navigation/MyCounselBar';

const CounselRecordDetail: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('보고서');
  // 가상의 데이터
  const allCounselingRecords: Record<
    string,
    Array<{
      date: string;
      time: string;
      report?: { title: string; detail: string; opinion: string };
      script: string;
    }>
  > = {
    '4': [
      {
        date: '2024년 7월 10일',
        time: '14:00',
        report: {
          title: '보고서 제목 200자 집에 보내줘,,, 마이스윗홈..스윗홈..',
          detail: '보고서 내용 5000자... 예시.... 잠와...',
          opinion: '소견 조치 사항...숙면을 취하면 해결될듯... 살려줘🥕🥕',
        },
        script:
          '상담사: 오늘은 어떤 이야기를 나누고 싶으신가요?\n내담자: 최근에 잠을 잘 못 자고 있어요...\n상담사: 수면 문제에 대해 좀 더 자세히 말씀해 주시겠어요?...',
      },
      {
        date: '2024년 7월 17일',
        time: '14:00',
        script:
          '상담사: 지난 번 상담 이후 어떠셨나요?\n내담자: 조금 나아진 것 같아요...\n상담사: 어떤 점이 나아지셨는지 구체적으로 말씀해 주시겠어요?...',
      },
    ],
    '5': [
      {
        date: '2024년 7월 11일',
        time: '11:00',
        script:
          '상담사: 안녕하세요. 오늘은 어떤 점에 대해 이야기 나누고 싶으신가요?\n내담자: 최근에 직장에서 스트레스를 많이 받고 있어요...\n상담사: 직장에서의 스트레스에 대해 좀 더 자세히 말씀해 주시겠어요?...',
      },
      {
        date: '2024년 7월 16일',
        time: '13:00',
        report: {
          title: '보고서 제목 200자 이제 쓸말도 없다',
          detail: '보고서 내용아르나ㅣㅡ라ㅣ늘.',
          opinion: '소견 살려줘🥕🥕 토끼갑은 이불이 있는집으로 보내줘..',
        },
        script:
          '상담사: 지난 번 상담에서 직장 스트레스에 대해 이야기 나눴었는데, 그 이후 어떠셨나요?\n내담자: 조금은 나아졌지만, 아직도 어려움이 있어요...\n상담사: 어떤 점이 나아지고, 어떤 점이 여전히 어려운지 말씀해 주시겠어요?...',
      },
    ],
    '6': [
      {
        date: '2024년 7월 12일',
        time: '16:00',
        script:
          '상담사: 안녕하세요. 오늘은 어떤 이야기를 나누고 싶으신가요?\n내담자: 가족 관계에 대해 고민이 있어요...\n상담사: 가족 관계에 대해 어떤 점이 고민되시는지 말씀해 주시겠어요?...',
      },
    ],
  };

  const clientInfo: Record<string, { name: string }> = {
    '1': { name: '신혜민' },
    '2': { name: '허세령' },
    '3': { name: '박형준' },
    '4': { name: '손동희' },
    '5': { name: '이재빈' },
    '6': { name: '박주영' },
    '7': { name: '홍길동' },
  };

  const counselingRecords = clientId ? allCounselingRecords[clientId] || [] : [];
  const client = clientId ? clientInfo[clientId] || { name: '알 수 없음' } : { name: '알 수 없음' };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단바 */}
      <div className="sticky bg-blue-50 top-0 z-10 mb-8">
        <MyCounselBar
          title1={client.name}
          title2="상담기록"
          subtitle="내담자의 기록을 확인하여 개인 맞춤형 상담 서비스를 제공하세요!"
          user="counselor"
          buttonLabel="내담자 목록 보기"
          buttonPath="/mycounsel/counselor/record"
        />
      </div>
      {/* 상담기록 탭목록 */}
      <div className="w-full flex flex-col items-center">
        <div role="tablist" className="w-4/5 tabs tabs-lifted">
          <input
            type="radio"
            name="records"
            role="tab"
            className="tab"
            aria-label="보고서"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            {/* 스크롤이 생기니까... 화면이 들썩거려서 className="h-[600px] overflow-y-auto" 탭마다 적용했는데 나중에 수정할예정.. */}
            <div className="h-[600px] overflow-y-auto">
              <ReportInfoTable records={counselingRecords} clientName={client.name} />
            </div>
          </div>

          <input
            type="radio"
            name="records"
            role="tab"
            className="tab"
            aria-label="자가진단검사결과"
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <div className="h-[600px] overflow-y-auto">
              <SelfTestResultTable clientName={client.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselRecordDetail;
