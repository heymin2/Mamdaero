package com.example.mamdaero.counselor_item.controller;

import com.example.mamdaero.counselor_item.service.CounselorItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/counselor-item")
@RequiredArgsConstructor
public class CounselorItemController {

    private final CounselorItemService counselorItemService;

    @GetMapping("/{counselorId}")
    public ResponseEntity<?> findCounselorItem(@PathVariable("counselorId") Long counselorId) {
        return ResponseEntity.ok(counselorItemService.findCounselorItem(counselorId));
    }
}
