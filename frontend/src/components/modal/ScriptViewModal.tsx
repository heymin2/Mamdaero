import React, { useState } from 'react';
import ModalWrapper from '@/components/modal/ModalWrapper';

interface ScriptViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  date: string;
  time: string;
  script: string;
}

const ScriptViewModal: React.FC<ScriptViewModalProps> = ({
  isOpen,
  onClose,
  clientName,
  date,
  time,
  script,
}) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[80vh] overflow-y-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">상담 스크립트</h2>
        </div>
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
          <h3 className="font-bold mb-2">스크립트 내용</h3>
          <pre className="whitespace-pre-wrap p-2 border rounded bg-gray-100">{script}</pre>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ScriptViewModal;
