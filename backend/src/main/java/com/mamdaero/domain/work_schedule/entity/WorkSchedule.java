package com.mamdaero.domain.work_schedule.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class WorkSchedule {
    @Id
    @Column(name = "work_schedule_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long counselorId;
    private Integer day;
    private Integer startTime;
    private Integer endTime;


    public void update(int day, int startTime, int endTime) {
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

