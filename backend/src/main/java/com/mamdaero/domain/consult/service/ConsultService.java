package com.mamdaero.domain.consult.service;

import com.mamdaero.domain.consult.entity.Consult;
import com.mamdaero.domain.consult.repository.ConsultRepository;
import com.mamdaero.domain.reservation.exception.ReservationNotFoundException;
import com.mamdaero.domain.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ConsultService {
    private final ReservationRepository reservationRepository;
    private final ConsultRepository consultRepository;

    public void enterRoom(Long reservationId) {
        // 존재하는 예약인지 확인
        if (!reservationRepository.existsById(reservationId)) {
            throw new ReservationNotFoundException();
        }

        // 생성된 상담이 없다면 생성
        if (!consultRepository.existsById(reservationId)) {
            createConsult(reservationId);
        }

        // 상담방 입장 로직

    }


    private void createConsult(Long reservationId) {
        Consult consult = new Consult(reservationId);
        consultRepository.save(consult);
    }
}
