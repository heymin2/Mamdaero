import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import Button from '@/components/button/Button';
import CalendarSection from '@/components/card/counselor/reserve/CalendarSection';
import TimeSelection from '@/components/card/counselor/reserve/TimeSelection';
import SituationSelection from '@/components/card/counselor/reserve/SituationSelection';
import SymptomSelection from '@/components/card/counselor/reserve/SymptomSelection';
import ConsentSection from '@/components/card/counselor/reserve/ConsentSection';
import RequestSection from '@/components/card/counselor/reserve/RequestSection';
import CounselorSidebar from '@/components/card/counselor/reserve/CounselorSidebar';

const CounselorReservePage: React.FC = () => {
  const navigate = useNavigate();
  const { counselorId } = useParams<{ counselorId: string }>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSituations, setSelectedSituations] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [diaryConsent, setDiaryConsent] = useState<boolean | null>(null);
  const [selfDiagnosisConsent, setSelfDiagnosisConsent] = useState<boolean | null>(null);
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>([]);
  const [requestText, setRequestText] = useState<string>('');
  const username = '박민준';

  const backToList = () => {
    navigate('/counselor');
  };

  useEffect(() => {
    if (selectedDate) {
      // 여기에 선택된 날짜에 따른 가능한 시간 계산 로직 추가
      const allTimes = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
      setAvailableTimes(allTimes);
      setSelectedTime(null);
    }
  }, [selectedDate]);

  const handleReservation = () => {
    if (
      !selectedDate ||
      !selectedTime ||
      !selectedSituations.length ||
      !selectedSymptoms.length ||
      diaryConsent === null ||
      selfDiagnosisConsent === null ||
      (selfDiagnosisConsent && !selectedDiagnoses.length)
    ) {
      alert('모든 항목을 입력 및 선택해주세요.');
      return;
    }
    console.log({
      date: selectedDate,
      time: selectedTime,
      situations: selectedSituations,
      symptoms: selectedSymptoms,
      diaryConsent,
      selfDiagnosisConsent,
      selectedDiagnoses,
      requestText,
    });
    alert('예약이 완료되었습니다.');
    navigate('/mycounsel');
  };

  return (
    <div className="my-3 mx-24">
      <div className="mb-3">
        <Button
          label={
            <span className="flex items-center ms-2">
              <IoIosArrowBack />
              <div className="ms-2 mt-0.5">상담사 목록 보기</div>
            </span>
          }
          onClick={backToList}
          size="상담사목록보기"
          color="orange"
          textSize="sm"
        />
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-3 flex flex-col space-y-8 p-4">
          <div className="flex text-3xl font-bold space-x-3 ">
            <span className="text-orange-500">상담</span>
            <span>예약하기</span>
          </div>
          {/* 캘린더 날짜 선택 */}
          <CalendarSection selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          {/* 시간선택 */}
          {selectedDate && (
            <TimeSelection
              availableTimes={availableTimes}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          )}
          {/* 상황 선택 */}
          {selectedTime && (
            <SituationSelection
              selectedSituations={selectedSituations}
              setSelectedSituations={setSelectedSituations}
            />
          )}
          {/* 증상선택 */}
          {selectedSituations.length > 0 && (
            <SymptomSelection
              selectedSymptoms={selectedSymptoms}
              setSelectedSymptoms={setSelectedSymptoms}
            />
          )}
          {/* 다이어리 및 자가검진 공개 선택 */}
          {selectedSymptoms.length > 0 && (
            <>
              <ConsentSection
                diaryConsent={diaryConsent}
                setDiaryConsent={setDiaryConsent}
                selfDiagnosisConsent={selfDiagnosisConsent}
                setSelfDiagnosisConsent={setSelfDiagnosisConsent}
                selectedDiagnoses={selectedDiagnoses}
                setSelectedDiagnoses={setSelectedDiagnoses}
              />
              <RequestSection requestText={requestText} setRequestText={setRequestText} />
            </>
          )}
        </div>
        {/* 사이드바 */}
        <div className="col-span-1 mx-2">
          <div className="sticky top-20 overflow-auto">
            <CounselorSidebar username={username} handleReservation={handleReservation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorReservePage;
