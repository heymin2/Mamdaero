import React from 'react';
import ModalWrapper from '@/components/modal/ModalWrapper';

interface ScriptSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  date: string;
  time: string;
  script: string;
}

const ScriptSummaryModal: React.FC<ScriptSummaryModalProps> = ({
  isOpen,
  onClose,
  clientName,
  date,
  time,
  script,
}) => {
  // 요약 어쩌지... 로직 요기쯤 들어가려나 임시로 10자만 가져와서 요약이라고 치자
  const summarizeScript = (script: string) => {
    // 임시로 스크립트의 첫 10자를 요약으로 사용합니다.
    return script.slice(0, 40) + '...';
  };

  const summary = summarizeScript(script);

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[80vh] overflow-y-auto p-4 z-50">
        <h2 className="text-2xl font-bold mb-4">스크립트 요약</h2>
        <table className="w-full mb-4">
          <tbody>
            <tr>
              <td className="font-bold">날짜</td>
              <td>{`${date} ${time}`}</td>
              <td className="font-bold">내담자명</td>
              <td>{clientName}</td>
            </tr>
          </tbody>
        </table>
        <div className="mb-4">
          <h3 className="font-bold mb-2">요약 내용</h3>
          <p className="p-2 border rounded bg-gray-100">{summary}</p>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ScriptSummaryModal;
