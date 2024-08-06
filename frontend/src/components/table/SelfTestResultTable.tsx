import React, { useState } from 'react';
import Button from '@/components/button/Button';
import ReportWriteModal from '@/components/modal/ReportWriteModal';
import ReportViewModal from '@/components/modal/ReportViewModal';
import ScriptSummaryModal from '@/components/modal/ScriptSummaryModal';
import ScriptViewModal from '@/components/modal/ScriptViewModal';

interface SelfTestResult {
  selftestName: string;
  date: string;
  totalScore: number;
}

interface SelfTestResultTableProps {
  clientName: string;
}

const SelfTestResultTable: React.FC<SelfTestResultTableProps> = ({ clientName }) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  // 가상 데이터
  const selfTestResults: SelfTestResult[] = [
    { selftestName: '우울증', date: '2024-07-15', totalScore: 18 },
    { selftestName: '불안', date: '2024-07-16', totalScore: 22 },
    { selftestName: 'PTSD', date: '2024-07-17', totalScore: 15 },
    { selftestName: '스트레스', date: '2024-07-18', totalScore: 28 },
    { selftestName: '우울증', date: '2024-08-15', totalScore: 16 },
    { selftestName: '불안', date: '2024-08-16', totalScore: 20 },
    { selftestName: 'PTSD', date: '2024-08-17', totalScore: 13 },
    { selftestName: '스트레스', date: '2024-08-18', totalScore: 25 },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="table w-full text-center">
        <thead>
          <tr>
            <th></th>
            <th>내담자</th>
            <th>검사종류</th>
            <th>날짜</th>
            <th>점수</th>
            <th>결과 상세보기</th>
          </tr>
        </thead>
        <tbody>
          {selfTestResults.map((selfTestResult, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{clientName}</td>
              <td>{selfTestResult.selftestName}</td>
              <td>{selfTestResult.date}</td>
              <td>{selfTestResult.totalScore}</td>
              <td>
                <Button label="상세 보기" onClick={() => {}} size="sm" color="blue" textSize="xs" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*상세보기모달...  */}
    </div>
  );
};

export default SelfTestResultTable;
