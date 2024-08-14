import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import Button from '@/components/button/Button';
import TestDetailModal from '@/components/modal/TestDetailModal';

interface SelfTestResult {
  memberSelfTestId: number;
  selftestName: string;
  selftestTotalScore: number;
  memberSelftestDate: string;
}

interface SelfTestResultResponse {
  content: SelfTestResult[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

interface SelfTestResultTableProps {
  clientId: string;
}

const fetchSelfTestResults = async (clientId: string): Promise<SelfTestResultResponse> => {
  const response = await axiosInstance.get(`c/selftest/result/${clientId}`);
  return response.data;
};

const SelfTestResultTable: React.FC<SelfTestResultTableProps> = ({ clientId }) => {
  const [selectedTest, setSelectedTest] = useState<SelfTestResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<SelfTestResultResponse, Error>({
    queryKey: ['selfTestResults', clientId],
    queryFn: () => fetchSelfTestResults(clientId),
  });

  const openModal = (test: SelfTestResult) => {
    setSelectedTest(test);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTest(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading self-test results</div>;

  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>검사 이름</th>
            <th>검사 일자</th>
            <th>총점</th>
            <th>상세 보기</th>
          </tr>
        </thead>
        <tbody>
          {data?.content.map(test => (
            <tr key={test.memberSelfTestId}>
              <td>{test.selftestName}</td>
              <td>{test.memberSelftestDate}</td>
              <td>{test.selftestTotalScore}</td>
              <td>
                <Button label="상세 보기" onClick={() => openModal(test)} size="sm" color="blue" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTest && (
        <TestDetailModal
          isOpen={isModalOpen}
          onClose={closeModal}
          clientId={clientId}
          testId={selectedTest.memberSelfTestId}
        />
      )}
    </div>
  );
};

export default SelfTestResultTable;
