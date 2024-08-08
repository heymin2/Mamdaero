import React from 'react';
import ModalWrapper from '@/components/modal/ModalWrapper';

interface TestResult {
  selftestName: string;
  date: string;
  totalScore: number;
  testId: number;
}

interface TestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  testResult: TestResult | null;
}

const TestDetailModal: React.FC<TestDetailModalProps> = ({
  isOpen,
  onClose,
  clientName,
  testResult,
}) => {
  if (!testResult) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} size="md">
      <div className="max-h-[80vh] overflow-y-auto p-4 z-50">
        <h2 className="text-xl font-bold mb-4">{testResult.selftestName} 검사 결과</h2>
        <p>내담자: {clientName}</p>
        <p>검사 일자: {testResult.date}</p>
        <p>총점: {testResult.totalScore}</p>
        <p>검사 ID: {testResult.testId}</p>
        <div className="mt-4">
          <p>작성중...</p>
          <p>여기에 API에서 받아온 상세 정보를 표시할 예정ㅏㅏㅣㅜㅏ</p>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default TestDetailModal;
