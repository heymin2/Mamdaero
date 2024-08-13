import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button/Button';
import TestBar from '@/components/navigation/TestBar';
import { FaCheck } from 'react-icons/fa';
import useSelfTests from '@/hooks/useSelfTests';

const DepressedPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    selfTest,
    selfTestList,
    isLoadingTest,
    isErrorTest,
    isLoadingList,
    isErrorList,
    answers,
    handleAnswerChange,
    handleSubmit,
    isSubmitting,
    isAuthenticated,
  } = useSelfTests(1);

  if (isLoadingTest || isLoadingList) return <div>Loading...</div>;
  if (isErrorTest || isErrorList) return <div>Error loading test</div>;
  if (!selfTest || selfTest.length === 0 || !selfTestList) return null;

  const depressedInfo = selfTestList.find(info => info.selftestName === 'depressed');

  const onSubmit = () => {
    const result = handleSubmit();
    if (result && !result.error) {
      navigate('/selftest/depressed/result', {
        state: {
          totalScore: result.totalScore,
          checkList: isAuthenticated ? undefined : result.checkList,
        },
      });
    } else if (result && result.error) {
      alert(result.error);
    }
  };

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
                  {question.options.map((option, optionIndex) => (
                    <td key={option.id} className="text-center">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={answers[question.id] === optionIndex}
                        onChange={() => handleAnswerChange(question.id, optionIndex)}
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
      <div className="flex justify-center w-full mt-8">
        <Button
          onClick={onSubmit}
          label={isSubmitting ? '제출 중...' : '결과보기'}
          color="orange"
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default DepressedPage;
