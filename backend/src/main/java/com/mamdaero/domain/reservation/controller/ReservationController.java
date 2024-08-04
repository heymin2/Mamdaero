package com.mamdaero.domain.reservation.controller;

import com.mamdaero.domain.reservation.dto.request.CreateReservationRequest;
import com.mamdaero.domain.reservation.dto.response.ReservationListResponse;
import com.mamdaero.domain.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @DeleteMapping("/cm/reservation/{reservationId}")
    public ResponseEntity<?> cancelReservation(@PathVariable(name = "reservationId") Long reservationId) {
        reservationService.cancelReservation(reservationId);
        return ResponseEntity.ok().build();
    }

    /**
     * 예약 목록 조회
     */
    @GetMapping("/cm/reservation")
    public ResponseEntity<List<ReservationListResponse>> findMyReservation() {
        return ResponseEntity.ok(reservationService.getReservationList());
    }


}
