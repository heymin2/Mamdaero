import React, { useState, useMemo } from 'react';
import Button from '@/components/button/Button';
import ReportWriteModal from '@/components/modal/ReportWriteModal';
import ReportViewModal from '@/components/modal/ReportViewModal';
import ScriptSummaryModal from '@/components/modal/ScriptSummaryModal';
import ScriptViewModal from '@/components/modal/ScriptViewModal';

interface Record {
  date: string;
  time: string;
  report?: { title: string; detail: string; opinion: string };
  script: string;
}

interface ReportInfoProps {
  records: Record[];
  clientName: string;
}

const ReportInfoTable: React.FC<ReportInfoProps> = ({ records, clientName }) => {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  // Sort records by date in descending order
  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [records]);

  const handleOpenWriteModal = (record: Record) => {
    setSelectedRecord(record);
    setIsWriteModalOpen(true);
  };

  const handleOpenViewModal = (record: Record) => {
    setSelectedRecord(record);
    setIsViewModalOpen(true);
  };

  const handleOpenScriptModal = (record: Record) => {
    setSelectedRecord(record);
    setIsScriptModalOpen(true);
  };

  const handleOpenSummaryModal = (record: Record) => {
    setSelectedRecord(record);
    setIsSummaryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsWriteModalOpen(false);
    setIsViewModalOpen(false);
    setIsScriptModalOpen(false);
    setIsSummaryModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full text-center">
        <thead>
          <tr>
            <th></th>
            <th>날짜</th>
            <th>시간</th>
            <th>스크립트</th>
            <th>보고서</th>
          </tr>
        </thead>
        <tbody>
          {sortedRecords.map((record, index) => (
            <tr key={sortedRecords.length - index}>
              <td>{sortedRecords.length - index}</td>
              <td>{record.date}</td>
              <td>{record.time}</td>
              <td className="space-x-3">
                <Button
                  label="전체 보기"
                  onClick={() => handleOpenScriptModal(record)}
                  size="sm"
                  color="blue"
                  textSize="xs"
                />
                <Button
                  label="요약 보기"
                  onClick={() => handleOpenSummaryModal(record)}
                  size="sm"
                  color="blue"
                  textSize="xs"
                />
              </td>
              <td>
                {record.report ? (
                  <Button
                    label="보고서 보기"
                    onClick={() => handleOpenViewModal(record)}
                    size="sm"
                    color="blue"
                    textSize="xs"
                  />
                ) : (
                  <Button
                    label="보고서 작성"
                    onClick={() => handleOpenWriteModal(record)}
                    size="sm"
                    color="orange"
                    textSize="xs"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRecord && (
        <>
          <ReportWriteModal
            isOpen={isWriteModalOpen}
            onClose={handleCloseModal}
            clientName={clientName}
            date={selectedRecord.date}
            time={selectedRecord.time}
          />
          {selectedRecord.report && (
            <ReportViewModal
              isOpen={isViewModalOpen}
              onClose={handleCloseModal}
              clientName={clientName}
              date={selectedRecord.date}
              time={selectedRecord.time}
              title={selectedRecord.report.title}
              detail={selectedRecord.report.detail}
              opinion={selectedRecord.report.opinion}
            />
          )}
          <ScriptViewModal
            isOpen={isScriptModalOpen}
            onClose={handleCloseModal}
            clientName={clientName}
            date={selectedRecord.date}
            time={selectedRecord.time}
            script={selectedRecord.script}
          />
          <ScriptSummaryModal
            isOpen={isSummaryModalOpen}
            onClose={handleCloseModal}
            clientName={clientName}
            date={selectedRecord.date}
            time={selectedRecord.time}
            script={selectedRecord.script}
          />
        </>
      )}
    </div>
  );
};

export default ReportInfoTable;
