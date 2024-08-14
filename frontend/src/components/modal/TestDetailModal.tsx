import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import ModalWrapper from '@/components/modal/ModalWrapper';

interface TestDetailResponse {
  memberSelfTestId: number;
  selftestName: string;
  selftestTotalScore: number;
  selftestResponseResDtos: {
    selftestQuestionResponseId: number;
    memberSelftestId: number;
    selftestQuestion: string;
    selftestMemberQuestionScore: number;
  }[];
}

interface TestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: string;
  testId: number;
}

const fetchTestDetail = async (clientId: string, testId: number): Promise<TestDetailResponse> => {
  const response = await axiosInstance.get(`c/selftest/result/${clientId}/${testId}`);
  return response.data;
};

const TestDetailModal: React.FC<TestDetailModalProps> = ({ isOpen, onClose, clientId, testId }) => {
  const { data, isLoading, isError } = useQuery<TestDetailResponse, Error>({
    queryKey: ['testDetail', clientId, testId],
    queryFn: () => fetchTestDetail(clientId, testId),
    enabled: isOpen,
  });

  if (!isOpen) return null;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading test details</div>;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} size="md">
      <div className="max-h-[80vh] overflow-y-auto p-4 z-50">
        <h2 className="text-xl font-bold mb-4">{data?.selftestName} 검사 결과</h2>
        <p>총점: {data?.selftestTotalScore}</p>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>질문</th>
              <th>점수</th>
            </tr>
          </thead>
          <tbody>
            {data?.selftestResponseResDtos.map(item => (
              <tr key={item.selftestQuestionResponseId}>
                <td>{item.selftestQuestion}</td>
                <td>{item.selftestMemberQuestionScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={onClose}>
          닫기
        </button>
      </div>
    </ModalWrapper>
  );
};

export default TestDetailModal;
