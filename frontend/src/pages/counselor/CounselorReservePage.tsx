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
import axiosInstance from '@/api/axiosInstance';

interface ReservationData {
  workTimeId: number;
  situationIds: number[];
  symptomIds: number[];
  isDiaryShared: boolean;
  isTestShared: boolean;
  requirement: string;
}

const CounselorReservePage: React.FC = () => {
  const navigate = useNavigate();
  const { counselorId } = useParams<{ counselorId: string }>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<number[]>([]);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedSituations, setSelectedSituations] = useState<number[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<number[]>([]);
  const [isDiaryShared, setIsDiaryShared] = useState<boolean>(false);
  const [diaryConsent, setDiaryConsent] = useState<boolean | null>(null);
  const [isTestShared, setIsTestShared] = useState<boolean>(false);
  const [testConsent, setTestConsent] = useState<boolean | null>(null);
  const [requirement, setRequirement] = useState<string>('');
  const username = '박민준';

  const backToList = () => {
    navigate('/counselor');
  };

  useEffect(() => {
    if (selectedTime !== null) {
      console.log(`선택된 시간: ${selectedTime}:00`);
    }
  }, [selectedTime]);

  useEffect(() => {
    if (selectedSituations.length > 0) {
      console.log('선택된 상황들:', selectedSituations);
    }
  }, [selectedSituations]);

  useEffect(() => {
    if (selectedSymptoms.length > 0) {
      console.log('선택된 증상들:', selectedSymptoms);
    }
  }, [selectedSymptoms]);

  useEffect(() => {
    console.log('다이어리 공유 상태:', isDiaryShared);
  }, [isDiaryShared]);

  const handleReservation = async () => {
    if (
      !selectedDate ||
      selectedTime === null ||
      !selectedSituations.length ||
      !selectedSymptoms.length ||
      diaryConsent === null ||
      testConsent === null
    ) {
      alert('모든 항목을 입력 및 선택해주세요.');
      return;
    }

    const reservationData = {
      date: selectedDate,
      workTimeId: selectedTime,
      situations: selectedSituations,
      symptoms: selectedSymptoms,
      isDiaryShared,
      isTestShared,
      requirement,
    };

    try {
      const response = await axiosInstance({
        method: 'post',
        url: 'm/reservation',
        data: reservationData,
      });
      console.log('예약 성공:', response.data);
      alert('예약이 완료되었습니다.');
      navigate('/mycounsel/client/history');
    } catch (error) {
      console.error('예약 실패:', error);
      alert('예약 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const getReservationData = (): ReservationData | null => {
    if (
      !selectedDate ||
      selectedTime === null ||
      selectedSituations.length === 0 ||
      selectedSymptoms.length === 0
    ) {
      return null;
    }

    return {
      workTimeId: selectedTime,
      situationIds: selectedSituations,
      symptomIds: selectedSymptoms,
      isDiaryShared,
      isTestShared,
      requirement,
    };
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
          size="목록보기"
          color="orange"
          textSize="sm"
        />
      </div>
      <div className="grid grid-cols-4">
        <div className="col-span-3 flex flex-col space-y-10 p-4">
          <div className="flex text-3xl font-bold space-x-3 ">
            <span className="text-orange-500">상담</span>
            <span>예약하기</span>
          </div>
          <CalendarSection
            counselorId={parseInt(counselorId || '0', 10)}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setAvailableTimes={setAvailableTimes}
          />
          {selectedDate && (
            <TimeSelection
              availableTimes={availableTimes}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          )}
          {selectedTime !== null && (
            <SituationSelection
              selectedSituations={selectedSituations}
              setSelectedSituations={setSelectedSituations}
            />
          )}
          {selectedSituations.length > 0 && (
            <SymptomSelection
              selectedSymptoms={selectedSymptoms}
              setSelectedSymptoms={setSelectedSymptoms}
            />
          )}
          {selectedSymptoms.length > 0 && (
            <>
              <ConsentSection
                diaryConsent={diaryConsent}
                setDiaryConsent={setDiaryConsent}
                setIsDiaryShared={setIsDiaryShared}
                testConsent={testConsent}
                setTestConsent={setTestConsent}
                setIsTestShared={setIsTestShared}
              />
              <RequestSection requirement={requirement} setRequirement={setRequirement} />
            </>
          )}
        </div>
        <div className="col-span-1 mx-2">
          <div className="sticky top-20 overflow-auto">
            <CounselorSidebar
              username={username}
              counselorId={parseInt(counselorId || '0', 10)}
              getReservationData={getReservationData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorReservePage;
