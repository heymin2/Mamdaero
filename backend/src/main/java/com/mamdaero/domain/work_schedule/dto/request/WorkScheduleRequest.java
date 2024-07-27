package com.mamdaero.domain.work_schedule.dto.request;

import com.mamdaero.domain.work_schedule.entity.WorkSchedule;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class WorkScheduleRequest {
    private Long counselorId;
    private Integer day;
    private Integer startTime;
    private Integer endTime;

    public WorkSchedule toEntity() {
        return WorkSchedule.builder()
                .counselorId(counselorId)
                .day(day)
                .startTime(startTime)
                .endTime(endTime)
                .build();
    }
}
