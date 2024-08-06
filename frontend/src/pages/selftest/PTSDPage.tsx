import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/Button';
import TestBar from '@/components/navigation/TestBar';
import { FaCheck } from 'react-icons/fa';

interface Question {
  selftest_questionid: number;
  selftest_question_detail: string;
  options: number[];
}

interface SelfTest {
  selftest_id: number;
  selftest_name: string;
  selftest_info: string;
  questions: Question[];
}

const answerLabels = [
  '전혀 그렇지 않다',
  '조금 그렇다',
  '중간이다',
  '조금 많이 그렇다',
  '아주 많이 그렇다',
];

const PTSDPage: React.FC = () => {
  const [selfTest, setSelfTest] = useState<SelfTest | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/selftests.json')
      .then(response => response.json())
      .then(data => {
        const unrestTest = data.selftests.find((test: SelfTest) => test.selftest_name === 'ptsd');
        setSelfTest(unrestTest);
        setQuestions(unrestTest.questions);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleAnswerChange = (questionId: number, score: number) => {
    setAnswers({ ...answers, [questionId]: score });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      setAlertMessage('모든 문항에 답변해 주세요.');
      return;
    }
    const totalScore = Object.values(answers).reduce((acc, score) => acc + score, 0);
    // 답변 데이터를 구조화하여 출력
    const detailedAnswers = Object.entries(answers).map(([questionId, score]) => {
      return {
        selftest_id: selfTest?.selftest_id,
        question_id: Number(questionId),
        answer: score,
      };
    });

    console.log('Detailed Answers:', detailedAnswers);
    navigate('/selftest/ptsd/result', { state: { totalScore } });
  };

  return (
    <div>
      {/* 제목 */}
      <TestBar
        title="PTSD"
        subtitle="그 사건 후 지속적인 스트레스와 불안감을 느끼고 계신가요?"
        showBackButton={true}
      />
      {/* 검사테이블 */}
      <div className="flex text-sm space-x-5 m-12 justify-center">
        <FaCheck />
        <div>{selfTest ? selfTest.selftest_info : '정보를 불러오는 중...'}</div>
      </div>
      <div className="flex justify-center w-full">
        <div className="w-full max-w-4xl px-4 ">
          <table className="table w-full rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="bg-orange-300 text-orange-300-content text-base rounded-tl-lg text-center align-middle">
                  번호
                </th>
                <th className="bg-orange-300 text-orange-300-content text-base text-center align-middle">
                  질문
                </th>
                {answerLabels.map((label, index) => (
                  <th
                    key={index}
                    className={`bg-orange-300 text-orange-300-content text-center text-base ${
                      index === answerLabels.length - 1 ? 'rounded-tr-lg' : ''
                    }`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.map((question, qIndex) => (
                <tr
                  key={question.selftest_questionid}
                  className={`${
                    qIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } text-center align-middle`}
                >
                  <td className="font-bold text-base rounded-l">{qIndex + 1}</td>
                  <td className="text-base text-left">{question.selftest_question_detail}</td>
                  {question.options.map((option, index) => (
                    <td
                      key={index}
                      className={`text-center ${index === question.options.length - 1 ? 'rounded-r' : ''}`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.selftest_questionid}`}
                        value={option}
                        onChange={() => handleAnswerChange(question.selftest_questionid, option)}
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
      {/* 경고창 */}
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
      {/* 다음버튼 */}
      <div className="flex justify-center w-full mt-8">
        <Button onClick={handleSubmit} label="결과보기" color="orange" />
      </div>
    </div>
  );
};

export default PTSDPage;
