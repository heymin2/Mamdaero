package com.mamdaero.domain.work_schedule.controller;

import com.mamdaero.domain.work_schedule.dto.request.WorkScheduleRequest;
import com.mamdaero.domain.work_schedule.dto.response.WorkScheduleResponse;
import com.mamdaero.domain.work_schedule.service.WorkScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 상담사의 근무 일정 관리 API 요청 처리를 위한 컨트롤러
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/counselor/schedule")
public class WorkScheduleController {
    private final WorkScheduleService workScheduleService;

    @GetMapping("") // 상담사의 근무 일정 조회
    public ResponseEntity<List<WorkScheduleResponse>> find(@RequestParam(name = "day", required = false, defaultValue = "1") int day, @RequestParam(name = "counselorId", required = true) Long counselorId) {
        return ResponseEntity.ok(workScheduleService.find(counselorId, day));
    }

    @PostMapping("") // 상담사의 근무 일정 등록
    public ResponseEntity<Boolean> create(@RequestBody List<WorkScheduleRequest> workScheduleRequestList) {
        return ResponseEntity.ok(workScheduleService.create(workScheduleRequestList));
    }

}
