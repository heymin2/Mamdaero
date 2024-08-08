package com.mamdaero.domain.reservation.controller;

import com.mamdaero.domain.notification.service.notifyCancelReservationService;
import com.mamdaero.domain.reservation.dto.request.CreateReservationRequest;
import com.mamdaero.domain.reservation.dto.response.ReservationListResponse;
import com.mamdaero.domain.reservation.service.ReservationService;
import com.mamdaero.global.dto.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Controller
public class ReservationController {
    private final ReservationService reservationService;
    private final notifyCancelReservationService notifyCancelReservationService;

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
        notifyCancelReservationService.notifyCancelReservationSave(reservationId);
        return ResponseEntity.ok().build();
    }

    /**
     * 예약 목록 조회
     */
    @GetMapping("/cm/reservation")
    public ResponseEntity<Pagination<ReservationListResponse>> findMyReservation(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok(reservationService.getReservationList(page, size));
    }

    /**
     * 상담 완료 목록 조회
     */
    @GetMapping("/cm/consult")
    public ResponseEntity<Pagination<ReservationListResponse>> findMyConsult(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok(reservationService.getConsult(page, size));
    }

    @DeleteMapping("/m/consult/{consultId}")
    public ResponseEntity<?> deleteConsult(@PathVariable(name = "consultId") Long consultId) {
        reservationService.deleteConsult(consultId);
        return ResponseEntity.ok().build();
    }
}
