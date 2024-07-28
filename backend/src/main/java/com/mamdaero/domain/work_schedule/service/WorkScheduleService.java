package com.mamdaero.domain.work_schedule.service;

import com.mamdaero.domain.work_schedule.dto.request.WorkScheduleRequest;
import com.mamdaero.domain.work_schedule.dto.response.WorkScheduleResponse;
import com.mamdaero.domain.work_schedule.entity.WorkSchedule;
import com.mamdaero.domain.work_schedule.entity.WorkTime;
import com.mamdaero.domain.work_schedule.repository.WorkScheduleRepository;
import com.mamdaero.domain.work_schedule.repository.WorkTimeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class WorkScheduleService {
    private final WorkScheduleRepository workScheduleRepository;
    private final WorkTimeRepository workTimeRepository;

    /**
     * 상담사의 근무 일정 조회
     */
    public List<WorkScheduleResponse> find(long id, int day) {
        return workScheduleRepository.findByCounselorIdAndDay(id, day).stream()
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

    /**
     * 상담사의 근무 일정 수정
     */

    @Transactional
    public WorkScheduleResponse update(Long id, WorkScheduleRequest request) {
        WorkSchedule workSchedule = workScheduleRepository.findById(id).orElseThrow();
        workSchedule.update(request.getDay(), request.getStartTime(), request.getEndTime());
        return WorkScheduleResponse.toDTO(workSchedule);
    }

    /**
     * 상담사의 근무 일정 삭제
     */
    @Transactional
    public Boolean delete(Long id) {
        //TODO: 존재하는 근무일정인지 확인

        //TODO: 해당하는 일정에 예약이 있는지 확인

        // 해당 일정에 근무 시간 취소
        cancelWork(workScheduleRepository.findById(id).orElseThrow());

        // 근무 일정 삭제
        workScheduleRepository.deleteById(id);
        return true;
    }

    private void cancelWork(WorkSchedule workSchedule) {
        List<WorkTime> workTimes = workTimeRepository.findAll();
        for (WorkTime workTime : workTimes) {
            if (workTime.getDate().getDayOfWeek().getValue() == workSchedule.getDay() &&
                    workSchedule.getStartTime() <= workTime.getTime() &&
                    workTime.getTime() < workSchedule.getEndTime()) {
                workTime.cancelWork();
            }
        }
    }

}
