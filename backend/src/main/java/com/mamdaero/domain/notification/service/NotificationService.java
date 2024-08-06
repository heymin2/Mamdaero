package com.mamdaero.domain.notification.service;

import com.mamdaero.domain.counselor_board.entity.CounselorBoard;
import com.mamdaero.domain.counselor_board.entity.CounselorBoardComment;
import com.mamdaero.domain.counselor_board.repository.CounselorBoardCommentRepository;
import com.mamdaero.domain.counselor_board.repository.CounselorBoardRepository;
import com.mamdaero.domain.counselor_item.entity.CounselorItem;
import com.mamdaero.domain.counselor_item.repository.CounselorItemRepository;
import com.mamdaero.domain.notification.controller.NotificationController;
import com.mamdaero.domain.notification.entity.EventSource;
import com.mamdaero.domain.notification.entity.Notification;
import com.mamdaero.domain.notification.repository.NotificationRepository;
import com.mamdaero.domain.reservation.entity.Reservation;
import com.mamdaero.domain.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final CounselorBoardRepository counselorBoardRepository;
    private final CounselorBoardCommentRepository counselorBoardCommentRepository;
    private final ReservationRepository reservationRepository;
    private final CounselorItemRepository counselorItemRepository;

    // 메시지 알림
    public SseEmitter subscribe() {
        Long memberId = 1L;

        // 현재 클라이언트를 위한 sseEmitter 생성
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        try {
            // 연결
            sseEmitter.send(SseEmitter.event().name("connect"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        // user 의 pk 값을 key 값으로 해서 sseEmitter 를 저장
        NotificationController.sseEmitters.put(memberId, sseEmitter);

        sseEmitter.onCompletion(() -> NotificationController.sseEmitters.remove(memberId));
        sseEmitter.onTimeout(() -> NotificationController.sseEmitters.remove(memberId));
        sseEmitter.onError((e) -> NotificationController.sseEmitters.remove(memberId));

        return sseEmitter;
    }

    // 알림 삭제
    public void deleteNotification(Long id) throws IOException {
        Notification notification = notificationRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("알림을 찾을 수 없습니다.")
        );

        notificationRepository.delete(notification);
    }

    // 알림 읽음
    @Transactional
    public void readNotification(Long id) throws IOException {
        Notification notification = notificationRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("알림을 찾을 수 없습니다.")
        );

        notification.setIsRead(true);
    }

    // 댓글 알림 - 게시글 작성자 에게
    public void notifyComment(Long boardID) {
        CounselorBoard counselorBoard = counselorBoardRepository.findById(boardID).orElseThrow(
                () -> new IllegalArgumentException("게시글을 찾을 수 없습니다.")
        );

        CounselorBoardComment receiveComment = counselorBoardCommentRepository.findFirstByBoardIdOrderByCreatedAtDesc(counselorBoard.getId()).orElseThrow(
                () -> new IllegalArgumentException("댓글을 찾을 수 없습니다.")
        );

        Long memberId = counselorBoard.getMemberId();

        if (NotificationController.sseEmitters.containsKey(memberId)) {
            SseEmitter sseEmitter = NotificationController.sseEmitters.get(memberId);
            try {
                Map<String, String> eventData = new HashMap<>();
                eventData.put("message", "댓글이 달렸습니다.");
                eventData.put("createdAt", receiveComment.getCreatedAt().toString());   // 댓글이 달린 시간
                eventData.put("content", receiveComment.getComment());                 // 댓글 내용

                sseEmitter.send(SseEmitter.event().name("addComment").data(eventData));

                // DB 저장
                Notification notification = new Notification();
                notification.setCreatedAt(receiveComment.getCreatedAt());
                notification.setContent(receiveComment.getComment());
                notification.setEventSource(EventSource.COUNSELOR_BOARD);
                notification.setEventId(boardID);
                notification.setMemberId(memberId);
                notification.setIsDelete(false);
                notification.setIsRead(false);

                notificationRepository.save(notification);

            } catch (IOException e) {
                NotificationController.sseEmitters.remove(memberId);
            }
        }
    }

    // 상담사, 내담자 예약 취소
    public void notifyCancelReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(
                () -> new IllegalArgumentException("예약을 찾을 수 없습니다.")
        );

        CounselorItem counselorItem = counselorItemRepository.findById(reservation.getCounselorItemId()).orElseThrow(
                () -> new IllegalArgumentException("상담 상품을 찾을 수 없습니다.")
        );

        Long memberId = reservation.getMemberId();
        Long counselorId = counselorItem.getCounselorId();

        if (NotificationController.sseEmitters.containsKey(memberId)) {
            SseEmitter sseEmitter = NotificationController.sseEmitters.get(memberId);
            try {
                Map<String, String> eventData = new HashMap<>();
                eventData.put("message", "예약이 취소되었습니다.");
                eventData.put("canceledAt", reservation.getCanceledAt().toString());
                eventData.put("memberId", memberId.toString());
                eventData.put("counselorId", counselorId.toString());

                sseEmitter.send(SseEmitter.event().name("cancelReservation").data(eventData));

                // 내담자
                Notification notification = new Notification();
                notification.setCreatedAt(reservation.getCanceledAt());
                notification.setContent("예약이 취소되었습니다.");
                notification.setEventSource(EventSource.RESERVATION);
                notification.setEventId(reservationId);
                notification.setMemberId(memberId);
                notification.setIsDelete(false);
                notification.setIsRead(false);

                notificationRepository.save(notification);

                //상담자
                notification = new Notification();
                notification.setCreatedAt(reservation.getCanceledAt());
                notification.setContent("예약이 취소되었습니다.");
                notification.setEventSource(EventSource.RESERVATION);
                notification.setEventId(reservationId);
                notification.setMemberId(counselorId);
                notification.setIsDelete(false);
                notification.setIsRead(false);

                notificationRepository.save(notification);

            } catch (IOException e) {
                NotificationController.sseEmitters.remove(memberId);
            }
        }
    }
}
