package com.mamdaero.domain.reservation.controller;

import com.mamdaero.domain.reservation.dto.request.CreateReservationRequest;
import com.mamdaero.domain.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequiredArgsConstructor
@Controller
public class ReservationController {
    private final ReservationService reservationService;

    /**
     * 예약하기
     */
    @PostMapping("/m/reservation")
    public ResponseEntity<?> createReservation(@RequestBody CreateReservationRequest request) {
        reservationService.createReservation(request);
        return ResponseEntity.ok().build();
    }

}
