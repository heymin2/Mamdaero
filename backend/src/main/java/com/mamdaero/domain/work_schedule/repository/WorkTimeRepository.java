package com.mamdaero.domain.work_schedule.repository;

import com.mamdaero.domain.work_schedule.entity.WorkTime;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface WorkTimeRepository extends JpaRepository<WorkTime, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM WorkTime w WHERE w.date < :date AND w.isReserved = false")
    void deleteByDateBeforeAndNotIsReserved(@Param("date") LocalDate date);

}