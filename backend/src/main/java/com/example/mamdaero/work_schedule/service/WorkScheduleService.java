package com.example.mamdaero.work_schedule.service;

import com.example.mamdaero.work_schedule.dto.response.WorkScheduleResponse;
import com.example.mamdaero.work_schedule.entity.WorkSchedule;
import com.example.mamdaero.work_schedule.repository.WorkScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class WorkScheduleService {
    private final WorkScheduleRepository workScheduleRepository;

    /**
     * 상담사의 근무 일정 조회
     */
    public List<WorkScheduleResponse> getWorkSchedule(long id, int day) {
        return workScheduleRepository.findByIdAndDay(id, day).stream()
                .map(WorkScheduleResponse::toDTO)
                .toList();
    }

}
