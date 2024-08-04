// src/components/counselor/reserve/SituationSelection.tsx

import React from 'react';

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

interface SituationSelectionProps {
  selectedSituations: string[];
  setSelectedSituations: React.Dispatch<React.SetStateAction<string[]>>;
}

const SituationSelection: React.FC<SituationSelectionProps> = ({
  selectedSituations,
  setSelectedSituations,
}) => {
  const handleToggleSelection = (situation: string) => {
    setSelectedSituations(prev =>
      prev.includes(situation) ? prev.filter(s => s !== situation) : [...prev, situation]
    );
  };

  return (
    <div>
      <div className="flex items-end border-b-4 border-b-orange-400 mb-4 space-x-5">
        <div className="text-xl font-bold">상황 선택</div>
        <div className="text-sm">중복 선택이 가능합니다.</div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {situations.map(situation => (
          <button
            key={situation}
            className={`btn ${
              selectedSituations.includes(situation)
                ? 'btn-secondary'
                : 'btn-outline btn-secondary bg-white'
            } rounded-full`}
            onClick={() => handleToggleSelection(situation)}
          >
            {situation}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SituationSelection;
