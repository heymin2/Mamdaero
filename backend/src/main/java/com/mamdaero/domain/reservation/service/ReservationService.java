package com.mamdaero.domain.reservation.service;

import com.mamdaero.domain.reservation.dto.request.CreateReservationRequest;
import com.mamdaero.domain.reservation.entity.Reservation;
import com.mamdaero.domain.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;


    public void createReservation(CreateReservationRequest request) {
        Reservation reservation = Reservation.builder()
                .counselorItemId(request.getCounselorItemId())
                .workTimeId(request.getWorkTimeId())
                .requirement(request.getRequirement())
                .isDiaryShared(request.getIsDiaryShared())
                .build();

        reservationRepository.save(reservation);
    }
}
