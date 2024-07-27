package com.mamdaero.domain.notice.controller;

import com.mamdaero.domain.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/notice")
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(noticeService.findAll());
    }

    @GetMapping("/{noticeId}")
    public ResponseEntity<?> findDetail(@PathVariable("noticeId") Long id) {
        return ResponseEntity.ok(noticeService.findDetail(id));
    }
}
