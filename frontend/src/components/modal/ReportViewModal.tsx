import React from 'react';
import ModalWrapper from '@/components/modal/ModalWrapper';

interface ReportViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  date: string;
  time: string;
  title: string;
  detail: string;
  opinion: string;
}

const ReportViewModal: React.FC<ReportViewModalProps> = ({
  isOpen,
  onClose,
  clientName,
  date,
  time,
  title,
  detail,
  opinion,
}) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="max-h-[80vh] overflow-y-auto p-4">
        <h2 className="text-2xl font-bold mb-4">상담 일지</h2>
        <table className="w-full mb-4">
          <tbody>
            <tr>
              <td className="font-bold">날짜</td>
              <td>{`${date} ${time}`}</td>
              <td className="font-bold">내담자명</td>
              <td>{clientName}</td>
            </tr>
            <tr>
              <td className="font-bold">상담사명</td>
              <td>박민준</td>
              <td className="font-bold">상담시간</td>
              <td>1시간</td>
            </tr>
          </tbody>
        </table>
        <div className="mb-4">
          <h3 className="font-bold mb-2">보고서 제목</h3>
          <p className="p-2 border rounded">{title}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold mb-2">상담 내용</h3>
          <p className="p-2 border rounded">{detail}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold mb-2">소견</h3>
          <p className="p-2 border rounded">{opinion}</p>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ReportViewModal;
