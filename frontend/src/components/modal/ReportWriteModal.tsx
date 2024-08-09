import React, { useState } from 'react';
import Button from '@/components/button/Button';
import ModalWrapper from '@/components/modal/ModalWrapper';
import { options } from '@fullcalendar/core/preact.js';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  date: string;
  time: string;
}

const ReportWriteModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  clientName,
  date,
  time,
}) => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [opinion, setOpinion] = useState('');

  const handleSubmit = () => {
    console.log({
      clientName,
      date: `${date} ${time}`,
      counselorName: '박민준',
      duration: '1시간',
      method: '개인상담',
      title,
      detail,
      opinion,
    });
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} size="md">
      <div className="overflow-y-auto p-4">
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
            <tr>
              <td className="font-bold">상담방법</td>
              <td colSpan={3}>개인상담</td>
            </tr>
          </tbody>
        </table>
        <div className="mb-4">
          <label className="block font-bold mb-2">보고서 제목</label>
          <input
            className="w-full h-32 p-2 border rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">상담 내용</label>
          <textarea
            className="w-full h-32 p-2 border rounded"
            value={detail}
            onChange={e => setDetail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">소견</label>
          <textarea
            className="w-full h-32 p-2 border rounded"
            value={opinion}
            onChange={e => setOpinion(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button
            label="작성완료"
            onClick={handleSubmit}
            size="md"
            shape="rounded"
            color="blue"
            textSize="sm"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ReportWriteModal;
