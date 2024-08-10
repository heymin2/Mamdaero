import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import Button from '@/components/button/Button';
import TestBar from '@/components/navigation/TestBar';
import { FaCheck } from 'react-icons/fa';

interface Option {
  id: number;
  selftestQuestionOptionDetail: string;
  selftestQuestionOptionScore: number;
}

interface Question {
  id: number;
  selftestQuestionDetail: string;
  options: Option[];
}

type SelfTest = Question[];

interface SelfTestInfo {
  id: number;
  selftestName: string;
  selftestInfo: string;
}

const fetchSelfTest = async (): Promise<SelfTest> => {
  const response = await axiosInstance.get('/p/selftest/1');
  return response.data;
};

const fetchSelfTestInfo = async (): Promise<SelfTestInfo[]> => {
  const response = await axiosInstance.get('/p/selftest');
  return response.data;
};

const DepressedPage: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    data: selfTest,
    isLoading: isLoadingTest,
    isError: isErrorTest,
  } = useQuery<SelfTest>({
    queryKey: ['depressedTest'],
    queryFn: fetchSelfTest,
  });

  const {
    data: selfTestInfo,
    isLoading: isLoadingInfo,
    isError: isErrorInfo,
  } = useQuery<SelfTestInfo[]>({
    queryKey: ['selfTestInfo'],
    queryFn: fetchSelfTestInfo,
  });

  const handleAnswerChange = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleSubmit = () => {
    if (!selfTest) return;

    if (Object.keys(answers).length !== selfTest.length) {
      setAlertMessage('모든 문항에 답변해 주세요.');
      return;
    }

    const totalScore = Object.values(answers).reduce((acc, score) => acc + score, 0);
    navigate('/selftest/depressed/result', { state: { totalScore } });
  };

  if (isLoadingTest || isLoadingInfo) return <div>Loading...</div>;
  if (isErrorTest || isErrorInfo) return <div>Error loading test</div>;
  if (!selfTest || selfTest.length === 0 || !selfTestInfo) return null;

  const depressedInfo = selfTestInfo.find(info => info.selftestName === 'depressed');

  return (
    <div>
      <TestBar
        title="우울"
        subtitle="기분이 늘 울적하고 매사에 의욕이 없나요?"
        showBackButton={true}
      />
      <div className="flex text-sm space-x-5 m-12 justify-center">
        <FaCheck />
        <div>{depressedInfo ? depressedInfo.selftestInfo : ''}</div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-full max-w-4xl px-4">
          <table className="table w-full rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="bg-orange-300 text-orange-300-content text-base rounded-tl-lg text-center align-middle">
                  번호
                </th>
                <th className="bg-orange-300 text-orange-300-content text-base text-center align-middle">
                  질문
                </th>
                {selfTest[0].options.map(option => (
                  <th
                    key={option.id}
                    className="bg-orange-300 text-orange-300-content text-center text-base"
                  >
                    {option.selftestQuestionOptionDetail}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selfTest.map((question, qIndex) => (
                <tr
                  key={question.id}
                  className={`${qIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} text-center align-middle`}
                >
                  <td className="font-bold text-base rounded-l">{qIndex + 1}</td>
                  <td className="text-base text-left">{question.selftestQuestionDetail}</td>
                  {question.options.map(option => (
                    <td key={option.id} className="text-center">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.selftestQuestionOptionScore}
                        onChange={() =>
                          handleAnswerChange(question.id, option.selftestQuestionOptionScore)
                        }
                        className="radio radio-primary"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {alertMessage && (
        <div role="alert" className="alert alert-warning mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{alertMessage}</span>
        </div>
      )}
      <div className="flex justify-center w-full mt-8">
        <Button onClick={handleSubmit} label="결과보기" color="orange" />
      </div>
    </div>
  );
};

export default DepressedPage;
