import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import DefaultProfile from '@/assets/DefaultProfile.jpg';
import SquareButton from '@/components/button/SquareButton';
import RoundedButton from '@/components/button/RoundedButton';
import { FaCheck } from 'react-icons/fa';

const bookedSlots: { date: string; time: string }[] = [
  { date: '2024-08-03', time: '14:00' },
  { date: '2024-08-05', time: '10:00' },
  { date: '2024-08-10', time: '16:00' },
  { date: '2024-08-15', time: '11:00' },
  { date: '2024-08-20', time: '13:00' },
];

const situations = [
  '결혼/육아',
  '대인관계',
  '직장',
  '이별/이혼',
  '가족',
  '자아/성격',
  '정신건강',
  '취업/진로',
  '신체건강',
  '성추행',
  '중독/집착',
  '금전/사업',
  '학업/고시',
  '외모',
  '연애',
  'LGBT',
];

const symptoms = [
  '우울',
  '불안',
  '스트레스',
  '조울증',
  '화병',
  '섭식',
  '공황',
  '불면',
  '트라우마',
  '강박',
  '콤플렉스',
  '자존감',
  '자살',
  '충동/폭력',
  '조현병',
  '신체화',
];

const diagnoses = ['우울', '불안', '스트레스', 'PTSD', '조울증'];

interface EventClickArg {
  event: {
    startStr: string;
  };
}

interface EventContentArg {
  event: {
    title: string;
  };
}

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
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const name = '박민준';
  const backToList = () => {
    navigate('/counselor');
  };

  useEffect(() => {
    if (selectedDate) {
      const bookedTimesForDate = bookedSlots
        .filter(slot => slot.date === selectedDate)
        .map(slot => slot.time);

      const allTimes = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

      setAvailableTimes(allTimes.filter(time => !bookedTimesForDate.includes(time)));
      setSelectedTime(null);
    }
  }, [selectedDate]);

  const handleEventClick = (info: EventClickArg) => {
    setSelectedDate(info.event.startStr);
  };

  const renderEventContent = (eventInfo: EventContentArg) => (
    <div className="flex justify-center items-center h-full">
      <button className="btn btn-xs btn-primary text-xs p-1">{eventInfo.event.title}</button>
    </div>
  );

  const handleToggleSelection = (
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    selectedArray: string[]
  ) => {
    setSelected(prev =>
      prev.includes(selected) ? prev.filter(s => s !== selected) : [...prev, selected]
    );
  };

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
      selectedProduct,
    });
    alert('예약이 완료되었습니다.');
    navigate('/mycounsel');
  };

  const toggleProduct = (product: string) => {
    setExpandedProduct(expandedProduct === product ? null : product);
    setSelectedProduct(product);
  };

  const getEventDates = () => {
    const events = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // start from tomorrow
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 27); // 4 weeks from now

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      events.push({
        title: '예약하기',
        start: new Date(d),
        allDay: true,
        // display: 'background',
      });
    }

    return events;
  };

  return (
    <div className="my-3 mx-24">
      <div className="mb-3">
        <RoundedButton
          label={
            <span className="flex items-center ms-2">
              <IoIosArrowBack />
              <div className="ms-2 mt-0.5">상담사 목록 보기</div>
            </span>
          }
          onClick={backToList}
          size="상담사목록보기"
          user="client"
        ></RoundedButton>
      </div>
      <div className="grid grid-cols-7 gap-11">
        <div className="col-span-5 flex flex-col space-y-8 ">
          <div className="flex text-3xl font-bold space-x-3 my-4">
            <span className="text-orange-500">상담</span>
            <span>예약하기</span>
          </div>
          {/* 캘린더 날짜 선택 */}
          <div>
            <div className="flex items-end border-b-4 border-b-orange-400 mb-4 space-x-5">
              <div className="text-xl  font-bold">날짜 선택</div>
              <div className="text-sm">예약 가능 날짜 중에 선택해주세요.</div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={getEventDates()}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
                headerToolbar={{
                  left: 'prev',
                  center: 'title',
                  right: 'next',
                }}
                eventColor="#fff7ed" // 이벤트 컬러 변경
                titleFormat={{ year: 'numeric', month: 'numeric' }}
                height="auto"
                contentHeight="auto"
              />
            </div>
            {selectedDate && (
              <div className="mt-2 text-sm text-orange-500">
                선택된 날짜: {new Date(selectedDate).toLocaleDateString()}
              </div>
            )}
          </div>
          {/* 시간 선택 하기 */}
          {selectedDate && (
            <div>
              <div className="flex items-end font-bold border-b-4 border-b-orange-400 mb-4">
                <div className="text-xl">시간 선택</div>
              </div>
              <div className="grid grid-cols-6 gap-3">
                {availableTimes.map(time => (
                  <button
                    key={time}
                    className={`btn ${selectedTime === time ? 'btn-primary' : 'btn-outline btn-primary'} rounded-full`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* 나의 상황 선택 하기 */}
          {selectedTime && (
            <div>
              <div className="flex items-end border-b-4 border-b-orange-400 mb-4 space-x-5">
                <div className="text-xl  font-bold">상황 선택</div>
                <div className="text-sm">중복 선택이 가능합니다.</div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {situations.map(situation => (
                  <button
                    key={situation}
                    className={`btn ${selectedSituations.includes(situation) ? 'btn-secondary' : 'btn-outline btn-secondary'} rounded-full`}
                    onClick={() =>
                      handleToggleSelection(situation, setSelectedSituations, selectedSituations)
                    }
                  >
                    {situation}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* 나의 증상 선택 하기 */}
          {selectedSituations.length > 0 && (
            <div>
              <div className="flex items-end border-b-4 border-b-orange-400 mb-4 space-x-5">
                <div className="text-xl  font-bold">증상 선택</div>
                <div className="text-sm">중복 선택이 가능합니다.</div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {symptoms.map(symptom => (
                  <button
                    key={symptom}
                    className={`btn ${selectedSymptoms.includes(symptom) ? 'btn-accent' : 'btn-outline btn-accent'} rounded-full`}
                    onClick={() =>
                      handleToggleSelection(symptom, setSelectedSymptoms, selectedSymptoms)
                    }
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* 요청사항, 일기 공개여부, 자가진단 작성하기 */}
          {selectedSymptoms.length > 0 && (
            <>
              <div>
                <div className="flex items-end border-b-4 border-b-orange-400 mb-4 space-x-5">
                  <div className="text-xl  font-bold">일기 공개</div>
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="flex text-xs">
                    <FaCheck />
                    <div className="ml-3">
                      상담사에게 공개하기로한 일기가 상담사에게 공유됩니다.
                    </div>
                  </div>
                  <div className="flex items-center space-x-5">
                    <div className="text-sm font-bold">상담사에게 일기 공개를 하시겠습니까?</div>
                    <button
                      className={`btn ${diaryConsent === false ? 'btn-primary' : 'btn-outline btn-primary'} rounded-full`}
                      onClick={() => setDiaryConsent(false)}
                    >
                      비동의
                    </button>
                    <button
                      className={`btn ${diaryConsent === true ? 'btn-primary' : 'btn-outline btn-primary'} rounded-full`}
                      onClick={() => setDiaryConsent(true)}
                    >
                      동의
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-end border-b-4 border-b-orange-400 mb-4 space-x-5">
                  <div className="text-xl  font-bold">자가진단 검사 제출</div>
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="flex text-xs">
                    <FaCheck />
                    <div className="ml-3">
                      자가진단 검사를 제출하시면 가장 최근의 검진 결과가 상담사에게 공유됩니다.
                    </div>
                  </div>
                  <div className="flex items-center space-x-5">
                    <div className="text-sm font-bold">자가진단 검사를 제출하시겠습니까?</div>
                    <button
                      className={`btn ${selfDiagnosisConsent === false ? 'btn-primary' : 'btn-outline btn-primary'} rounded-full`}
                      onClick={() => setSelfDiagnosisConsent(false)}
                    >
                      비동의
                    </button>
                    <button
                      className={`btn ${selfDiagnosisConsent === true ? 'btn-primary' : 'btn-outline btn-primary'} rounded-full`}
                      onClick={() => setSelfDiagnosisConsent(true)}
                    >
                      동의
                    </button>
                  </div>
                  {selfDiagnosisConsent && (
                    <div>
                      <div className="text-sm">중복 선택이 가능합니다.</div>
                      <div className="flex justify-around gap-3 rounded bg-orange-50">
                        {diagnoses.map(diagnosis => (
                          <label
                            key={diagnosis}
                            className="flex font-bold items-center space-x-2 p-2 rounded-full text-sm"
                          >
                            <span>{diagnosis}</span>
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary"
                              checked={selectedDiagnoses.includes(diagnosis)}
                              onChange={() =>
                                handleToggleSelection(
                                  diagnosis,
                                  setSelectedDiagnoses,
                                  selectedDiagnoses
                                )
                              }
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-end border-b-4 border-b-orange-400 mb-4 space-x-5">
                  <div className="text-xl  font-bold">요청 사항</div>
                </div>
                <textarea
                  className="textarea textarea-bordered w-full h-24 rounded-2xl"
                  placeholder="상담사에게 요청하실 사항이 있다면 적어주세요."
                  value={requestText}
                  onChange={e => setRequestText(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
        {/* 오른쪽 sticky바 */}
        <div className="col-span-2 mx-2">
          <div className="sticky top-20 overflow-auto">
            <img src={DefaultProfile} className="w-full h-64 object-cover rounded-lg" alt="" />
            <div className="flex my-4 justify-start">
              <div className="flex items-end">
                <div className="text-2xl font-bold">{name}</div>
                <div className="text-base font-bold ml-2">상담사</div>
              </div>
            </div>
            <div>
              <div className="text-xl font-bold border-b-4 border-primary pb-2 mb-4">상품선택</div>
              {[
                {
                  name: '상담이름1',
                  price: '₩50,000',
                  description:
                    '스트레스 해소의 길 상담은 개인의 스트레스 요인을 분석하고 효과적인 대처 방법을 제공하여 일상 생활에서의 스트레스 관리를 돕는 심리 상담 서비스입니다.',
                },
                {
                  name: '상담이름2',
                  price: '₩40,000',
                  description:
                    '우울증 극복을 위한 상담은 우울증의 원인을 분석하고 효과적인 치료 방법을 제공하여 우울증을 극복할 수 있도록 돕는 심리 상담 서비스입니다.',
                },
              ].map(product => (
                <div
                  key={product.name}
                  className="mb-3 collapse collapse-plus bg-orange-100 shadow-sm rounded-lg "
                >
                  <input
                    type="checkbox"
                    className="peer"
                    checked={expandedProduct === product.name}
                    onChange={() =>
                      setExpandedProduct(expandedProduct === product.name ? null : product.name)
                    }
                  />
                  <div className="collapse-title text-base font-medium">
                    <span className="font-bold">{product.name}</span> - {product.price}
                  </div>
                  <div className="collapse-content">
                    <p className="mb-4">{product.description}</p>
                    <div className="flex justify-center">
                      <SquareButton
                        label="예약하기"
                        onClick={handleReservation}
                        size="md"
                        user="client"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorReservePage;
