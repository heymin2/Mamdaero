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

interface TimeSlot {
  id: number;
  time: number;
}

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
  const [availableTimes, setAvailableTimes] = useState<TimeSlot[]>([]);
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
