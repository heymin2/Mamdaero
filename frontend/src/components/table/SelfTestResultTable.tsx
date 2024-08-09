import React, { useState, useMemo } from 'react';
import Button from '@/components/button/Button';
import { FiChevronDown } from 'react-icons/fi';
import TestDetailModal from '@/components/modal/TestDetailModal';

interface SelfTestResult {
  selftestName: string;
  date: string;
  totalScore: number;
  testId: number;
}

interface SelfTestResultTableProps {
  clientName: string;
}

const TEST_TYPES = [
  { name: '우울증', id: 1 },
  { name: '불안', id: 2 },
  { name: '스트레스', id: 3 },
  { name: 'PTSD', id: 4 },
  { name: '조울증', id: 5 },
];

const SelfTestResultTable: React.FC<SelfTestResultTableProps> = ({ clientName }) => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestResult, setSelectedTestResult] = useState<SelfTestResult | null>(null);

  // 가상 데이터
  const selfTestResults: SelfTestResult[] = [
    { selftestName: '우울증', date: '2024-07-15', totalScore: 18, testId: 1 },
    { selftestName: '불안', date: '2024-07-16', totalScore: 22, testId: 2 },
    { selftestName: 'PTSD', date: '2024-07-17', totalScore: 15, testId: 4 },
    { selftestName: '스트레스', date: '2024-07-18', totalScore: 28, testId: 3 },
    { selftestName: '우울증', date: '2024-08-15', totalScore: 16, testId: 1 },
    { selftestName: '불안', date: '2024-08-16', totalScore: 20, testId: 2 },
    { selftestName: 'PTSD', date: '2024-08-17', totalScore: 13, testId: 4 },
    { selftestName: '스트레스', date: '2024-08-18', totalScore: 25, testId: 3 },
    { selftestName: '조울증', date: '2024-08-19', totalScore: 30, testId: 5 },
  ];

  // 날짜를 기준으로 내림차순 정렬 및 필터링
  const filteredAndSortedResults = useMemo(() => {
    let results = [...selfTestResults];
    if (selectedTest) {
      results = results.filter(result => result.selftestName === selectedTest);
    }
    return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selfTestResults, selectedTest]);

  const handleTestSelect = (testName: string | null) => {
    setSelectedTest(testName);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openModal = (testResult: SelfTestResult) => {
    setSelectedTestResult(testResult);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTestResult(null);
  };

  if (selfTestResults.length === 0) {
    return <div className="text-center py-4">검사 결과가 없습니다.</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <table className="table w-full text-center">
        <thead>
          <tr>
            <th></th>
            <th className="relative">
              <button
                onClick={toggleDropdown}
                className="font-bold flex items-center justify-center w-full"
              >
                <span>검사종류</span>
                <FiChevronDown
                  className={`transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                />
                {selectedTest && <span>({selectedTest})</span>}
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 left-1/2 transform -translate-x-1/2">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      onClick={() => handleTestSelect(null)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    >
                      전체 보기
                    </button>
                    {TEST_TYPES.map(test => (
                      <button
                        key={test.id}
                        onClick={() => handleTestSelect(test.name)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      >
                        {test.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </th>
            <th>날짜</th>
            <th>점수</th>
            <th>결과 상세보기</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedResults.map((selfTestResult, index) => (
            <tr key={index}>
              <td>{filteredAndSortedResults.length - index}</td>
              <td>{selfTestResult.selftestName}</td>
              <td>{selfTestResult.date}</td>
              <td>{selfTestResult.totalScore}</td>
              <td>
                <Button
                  label="상세 보기"
                  onClick={() => openModal(selfTestResult)}
                  size="sm"
                  color="blue"
                  textSize="xs"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TestDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        clientName={clientName}
        testResult={selectedTestResult}
      />
    </div>
  );
};

export default SelfTestResultTable;
