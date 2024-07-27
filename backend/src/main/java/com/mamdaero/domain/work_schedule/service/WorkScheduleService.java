package com.mamdaero.domain.work_schedule.service;

import com.mamdaero.domain.work_schedule.dto.request.WorkScheduleRequest;
import com.mamdaero.domain.work_schedule.dto.response.WorkScheduleResponse;
import com.mamdaero.domain.work_schedule.repository.WorkScheduleRepository;
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
    public List<WorkScheduleResponse> find(long id, int day) {
        return workScheduleRepository.findByIdAndDay(id, day).stream()
                .map(WorkScheduleResponse::toDTO)
                .toList();
    }

    /**
     * 상담사의 근무 일정 등록
     */
    public boolean create(List<WorkScheduleRequest> workScheduleRequestList) {
        System.out.println(workScheduleRequestList.get(0).getCounselorId());
        return workScheduleRepository.saveAll(workScheduleRequestList.stream()
                .map(WorkScheduleRequest::toEntity)
                .toList()).size() == workScheduleRequestList.size();
    }
}
