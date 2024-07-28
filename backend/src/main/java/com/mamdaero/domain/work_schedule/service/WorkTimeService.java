package com.mamdaero.domain.work_schedule.service;

import com.mamdaero.domain.work_schedule.entity.WorkSchedule;
import com.mamdaero.domain.work_schedule.entity.WorkTime;
import com.mamdaero.domain.work_schedule.repository.WorkScheduleRepository;
import com.mamdaero.domain.work_schedule.repository.WorkTimeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkTimeService {
    private final WorkTimeRepository workTimeRepository;
    private final WorkScheduleRepository workScheduleRepository;


    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void updateWorkTimes() {
        LocalDate today = LocalDate.now();
        LocalDate dayToAdd = today.plusDays(27);


        // 어제 근무시간을 삭제한다.
        workTimeRepository.deleteByDateBeforeAndNotReserved(today);

        // TODO: 상담사레포지토리에서 모든 상담사ID 가져오기
        List<Long> counselorIds = new ArrayList<>();

        int dayOfWeek = dayToAdd.getDayOfWeek().getValue();
        for (Long counselorId : counselorIds) {
            List<WorkSchedule> workSchedules = workScheduleRepository.findByCounselorIdAndDay(counselorId, dayOfWeek);
            List<WorkTime> newWorkTimes = new ArrayList<>();

            for (int hour = 0; hour < 24; hour++) {
                WorkTime workTime = WorkTime.builder()
                        .counselorId(counselorId)
                        .date(dayToAdd)
                        .time(hour)
                        .isReserved(false)
                        .isWorked(false)
                        .build();

                for (WorkSchedule schedule : workSchedules) {
                    if (hour >= schedule.getStartTime() && hour < schedule.getEndTime()) {
                        workTime.work();
                    }
                }

                newWorkTimes.add(workTime);
            }

            workTimeRepository.saveAll(newWorkTimes);
        }
    }

}
