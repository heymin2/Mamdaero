package com.mamdaero.domain.notification.controller;

import com.mamdaero.domain.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cm/notification")
public class NotificationController {

    private final NotificationService notificationService;
    public static Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    @GetMapping
    public SseEmitter subscribe() {
        return notificationService.subscribe();
    }

    @PatchMapping("/{notificationId}")
    public ResponseEntity<?> readNotification(@PathVariable("notificationId") Long id) throws IOException {
        notificationService.readNotification(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<?> deleteNotification(@PathVariable("notificationId") Long id) throws IOException {
        notificationService.deleteNotification(id);
        return ResponseEntity.ok().build();
    }
}
