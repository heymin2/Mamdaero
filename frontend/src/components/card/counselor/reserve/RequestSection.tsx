// src/components/counselor/reserve/RequestSection.tsx

import React from 'react';

interface RequestSectionProps {
  requestText: string;
  setRequestText: (text: string) => void;
}

const RequestSection: React.FC<RequestSectionProps> = ({ requestText, setRequestText }) => {
  return (
    <div>
      <div className="flex items-end border-b-4 border-b-orange-400 mb-4 space-x-5">
        <div className="text-xl font-bold">(선택) 요청 사항</div>
      </div>
      <textarea
        className="textarea textarea-bordered w-full h-24 rounded-2xl"
        placeholder="상담사에게 요청하실 사항이 있다면 적어주세요."
        value={requestText}
        onChange={e => setRequestText(e.target.value)}
      />
    </div>
  );
};

export default RequestSection;
