// src/components/counselor/reserve/SymptomSelection.tsx

import React from 'react';

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

interface SymptomSelectionProps {
  selectedSymptoms: string[];
  setSelectedSymptoms: React.Dispatch<React.SetStateAction<string[]>>;
}

const SymptomSelection: React.FC<SymptomSelectionProps> = ({
  selectedSymptoms,
  setSelectedSymptoms,
}) => {
  const handleToggleSelection = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  return (
    <div>
      <div className="flex items-end border-b-4 border-b-orange-400 mb-4 space-x-5">
        <div className="text-xl font-bold">증상 선택</div>
        <div className="text-sm">중복 선택이 가능합니다.</div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {symptoms.map(symptom => (
          <button
            key={symptom}
            className={`btn ${
              selectedSymptoms.includes(symptom) ? 'btn-accent' : 'btn-outline btn-accent bg-white'
            } rounded-full`}
            onClick={() => handleToggleSelection(symptom)}
          >
            {symptom}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SymptomSelection;
