// src/components/counselor/reserve/ConsentSection.tsx

import React from 'react';
import { FaCheck } from 'react-icons/fa';

const diagnoses = ['우울', '불안', '스트레스', 'PTSD', '조울증'];

interface ConsentSectionProps {
  diaryConsent: boolean | null;
  setDiaryConsent: (consent: boolean) => void;
  selfDiagnosisConsent: boolean | null;
  setSelfDiagnosisConsent: (consent: boolean) => void;
  selectedDiagnoses: string[];
  setSelectedDiagnoses: React.Dispatch<React.SetStateAction<string[]>>;
}

const ConsentSection: React.FC<ConsentSectionProps> = ({
  diaryConsent,
  setDiaryConsent,
  selfDiagnosisConsent,
  setSelfDiagnosisConsent,
  selectedDiagnoses,
  setSelectedDiagnoses,
}) => {
  const handleToggleSelection = (diagnosis: string) => {
    setSelectedDiagnoses(prev =>
      prev.includes(diagnosis) ? prev.filter(d => d !== diagnosis) : [...prev, diagnosis]
    );
  };

  return (
    <>
      <div>
        <div className="flex items-end border-b-4 border-b-orange-400 mb-4 space-x-5">
          <div className="text-xl font-bold">일기 공개</div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex text-xs">
            <FaCheck />
            <div className="ml-3">상담사에게 공개하기로한 일기가 상담사에게 공유됩니다.</div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="text-sm font-bold">상담사에게 일기 공개를 하시겠습니까?</div>
            <button
              className={`btn ${
                diaryConsent === false ? 'btn-primary' : 'btn-outline btn-primary bg-white'
              } rounded-full`}
              onClick={() => setDiaryConsent(false)}
            >
              비동의
            </button>
            <button
              className={`btn ${
                diaryConsent === true ? 'btn-primary' : 'btn-outline btn-primary bg-white'
              } rounded-full`}
              onClick={() => setDiaryConsent(true)}
            >
              동의
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-end border-b-4 border-b-orange-400 mb-4 space-x-5">
          <div className="text-xl font-bold">자가진단 검사 제출</div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex text-xs">
            <FaCheck />
            <div className="ml-3">
              자가진단 검사를 제출하시면 가장 최근의 검진 결과가 상담사에게 공유됩니다.
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="text-sm font-bold">자가진단 검사를 제출하시겠습니까?</div>
            <button
              className={`btn ${
                selfDiagnosisConsent === false ? 'btn-primary' : 'btn-outline btn-primary bg-white'
              } rounded-full`}
              onClick={() => setSelfDiagnosisConsent(false)}
            >
              비동의
            </button>
            <button
              className={`btn ${
                selfDiagnosisConsent === true ? 'btn-primary' : 'btn-outline btn-primary bg-white'
              } rounded-full`}
              onClick={() => setSelfDiagnosisConsent(true)}
            >
              동의
            </button>
          </div>
          {selfDiagnosisConsent && (
            <div>
              <div className="text-sm">* 중복 선택이 가능합니다.</div>
              <div className="flex justify-around gap-3 rounded bg-orange-50">
                {diagnoses.map(diagnosis => (
                  <label
                    key={diagnosis}
                    className="flex font-bold items-center space-x-2 p-2 rounded-full text-sm"
                  >
                    <span>{diagnosis}</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={selectedDiagnoses.includes(diagnosis)}
                      onChange={() => handleToggleSelection(diagnosis)}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConsentSection;
