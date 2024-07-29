// /mnt/data/src_latest/components/ProgressBar.tsx

import React from 'react';

interface ProgressBarProps {
  currentStep: 'input' | 'info' | 'complete';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { label: '상담사 인증', key: 'input' },
    { label: '상담사 정보 입력', key: 'info' },
    { label: '가입 완료', key: 'complete' },
  ];

  return (
    <div className="flex justify-center items-center mb-8">
      {steps.map((step, index) => (
        <div key={step.key} className="flex items-center">
          <div
            className={`text-center ${currentStep === step.key ? 'text-blue-500' : 'text-gray-300'} font-h6-regular`}
          >
            {step.label}
          </div>
          {index < steps.length - 1 && (
            <div
              className="mx-2 w-8 h-[2px] bg-gray-300 flex-grow"
              style={{ backgroundColor: currentStep === step.key ? 'blue' : 'gray' }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
