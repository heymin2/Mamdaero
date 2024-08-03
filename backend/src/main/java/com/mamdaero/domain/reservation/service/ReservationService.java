package com.mamdaero.domain.reservation.service;

import com.mamdaero.domain.counselor_item.entity.CounselorItem;
import com.mamdaero.domain.counselor_item.exception.CounselorItemNotFoundException;
import com.mamdaero.domain.counselor_item.repository.CounselorItemRepository;
import com.mamdaero.domain.reservation.dto.request.CreateReservationRequest;
import com.mamdaero.domain.reservation.entity.Reservation;
import com.mamdaero.domain.reservation.entity.ReservationSituation;
import com.mamdaero.domain.reservation.entity.ReservationSymptom;
import com.mamdaero.domain.reservation.exception.CanNotMakeReservationException;
import com.mamdaero.domain.reservation.repository.ReservationRepository;
import com.mamdaero.domain.work_schedule.entity.WorkTime;
import com.mamdaero.domain.work_schedule.exception.WorkTimeNotfoundException;
import com.mamdaero.domain.work_schedule.repository.WorkTimeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@RequiredArgsConstructor
@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final CounselorItemRepository counselorItemRepository;
    private final WorkTimeRepository workTimeRepository;

    @Transactional
    public void createReservation(CreateReservationRequest request) {

        // 존재하는 상담상품인지 확인;
        if (!counselorItemRepository.existsById(request.getCounselorItemId())) {
            throw new CounselorItemNotFoundException();
        }

        CounselorItem counselorItem = counselorItemRepository.findById(request.getCounselorItemId()).get();

        // 존재하는 근무시간인지 확인
        if (!workTimeRepository.existsById(request.getWorkTimeId())) {
            throw new WorkTimeNotfoundException();
        }


        WorkTime workTime = workTimeRepository.findById(request.getWorkTimeId()).get();

        // 이미 예약된 시간이거나 근무시간이 아니라면 예약할 수 없다.
        if (workTime.getIsReserved() || !workTime.getIsWorkTime()) {
            throw new CanNotMakeReservationException();
        }

        workTime.reserve();

        Reservation reservation = Reservation.builder()
                .memberId(1L) // TODO : 진짜 멤버아이디로 바꾸기
                .counselorItemId(request.getCounselorItemId())
                .workTimeId(request.getWorkTimeId())
                .requirement(request.getRequirement())
                .isDiaryShared(request.getIsDiaryShared())
                .itemName(counselorItem.getName())
                .itemFee(counselorItem.getFee())
                .symptoms(new ArrayList<>())
                .situations(new ArrayList<>())
                .build();


        for (Long symptomId : request.getSymptomIds()) {
            ReservationSymptom symptom = new ReservationSymptom();
            symptom.setSymptomId(symptomId);
            reservation.addSymptom(symptom);
        }

        for (Long situationId : request.getSituationIds()) {
            ReservationSituation situation = new ReservationSituation();
            situation.setSituationId(situationId);
            reservation.addSituation(situation);
        }

        reservationRepository.save(reservation);
    }
}
