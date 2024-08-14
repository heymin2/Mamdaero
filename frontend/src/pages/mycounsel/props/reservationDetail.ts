export interface Situation {
  situationName: string;
}

export interface Symptom {
  symptomName: string;
}

export interface Reservation {
  reservationId: number;
  counselorId: number;
  memberId: number;
  counselorName: string;
  memberName: string;
  itemName: string;
  itemFee: number;
  requirement: string;
  isDiaryShared: boolean;
  isTestShared: boolean;
  date: string;
  time: number;
  status: string;
  canceledAt: string | null;
  canceler: string | null;
  situations: Situation[];
  symptoms: Symptom[];
}
