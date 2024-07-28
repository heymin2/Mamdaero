package com.mamdaero.domain.notice.controller;

import com.mamdaero.domain.notice.dto.request.NoticeRequest;
import com.mamdaero.domain.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<?> create(@RequestBody NoticeRequest request) {
        noticeService.create(request);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("{noticeId}")
    public ResponseEntity<?> update(@PathVariable("noticeId") Long id, @RequestBody NoticeRequest request) {
        return ResponseEntity.ok(noticeService.update(id, request));
    }
}
