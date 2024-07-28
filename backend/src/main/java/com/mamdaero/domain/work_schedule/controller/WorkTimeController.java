package com.mamdaero.domain.work_schedule.controller;

import com.mamdaero.domain.work_schedule.dto.request.WorkTimeRequest;
import com.mamdaero.domain.work_schedule.service.WorkTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("counselor/worktime")
public class WorkTimeController {

    private final WorkTimeService workTimeService;

    /**
     * 상담사 근무시간 상태 변경
     */
    @PatchMapping("")
    public void update(@RequestBody List<WorkTimeRequest> workTimeRequestList) {
        workTimeService.update(workTimeRequestList);
    }
}
