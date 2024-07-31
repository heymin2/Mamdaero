import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/SquareButton';

interface Question {
  selftest_questionid: number;
  selftest_question_detail: string;
  options: number[];
}

const UnrestPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/unrest.json')
      .then(response => response.json())
      .then(data => setQuestions(data.questions))
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
    navigate('/selftest/unrest/result', { state: { totalScore } });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full py-16">
      <div className="w-full max-w-6xl px-4 mb-12">
        <div className="flex justify-between items-center ml-5 mr-5">
          <div className="flex space-x-5 items-center">
            <div className="font-bold text-4xl text-orange-500">불안 자가 심리 검진</div>
            <div>맘대로 자가검진을 통해 내 마음건강을 측정해보세요!</div>
          </div>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => window.history.back()}
          >
            뒤로가기
          </button>
        </div>
        <div className="border-t-2 border-gray-300 mt-2"></div>
      </div>
      {questions.map(question => (
        <div key={question.selftest_questionid} className="mb-4 w-full max-w-md px-4">
          <p>{question.selftest_question_detail}</p>
          <div className="flex space-x-4">
            {question.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={`question-${question.selftest_questionid}`}
                  value={option}
                  onChange={() => handleAnswerChange(question.selftest_questionid, option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <Button onClick={handleSubmit} label="다음가기" size="sm" user="client" />
      {alertMessage && (
        <div role="alert" className="alert alert-warning">
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
    </div>
  );
};

export default UnrestPage;
