package com.mamdaero.domain.chatlog.service;

import com.mamdaero.domain.chatlog.entity.Chatlog;
import com.mamdaero.domain.chatlog.repository.ChatlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatlogService {

    private final ChatlogRepository chatlogRepository;

    public List<Chatlog> findAllByReservationId(Long reservationId) {
        return chatlogRepository.findByReservationId(reservationId);
    }

    public Chatlog save(Long reservationId, Long memberId, String message) {
        Chatlog chatLog = Chatlog.builder()
                .reservationId(reservationId)
                .memberId(memberId)
                .message(message)
                .createdAt(LocalDateTime.now())
                .build();

        return chatlogRepository.save(chatLog);
    }
}
