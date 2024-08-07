package com.mamdaero.domain.consult_report.repository;

import com.mamdaero.domain.consult_report.dto.response.ConsultReportListResponse;
import com.mamdaero.domain.consult_report.entity.ConsultReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ConsultReportRepository extends JpaRepository<ConsultReport, Long> {
    @Query(
            "SELECT new com.mamdaero.domain.consult_report.dto.response.ConsultReportListResponse(" +
                    "m.name, wt.date, wt.time, c.scriptUrl, c.summarizedScriptUrl, cr.id" +
                    ") " +
                    "FROM Reservation r " +
                    "JOIN WorkTime wt ON r.workTimeId = wt.id " +
                    "JOIN Member m ON r.memberId = m.id " +
                    "JOIN Consult c ON r.id = c.id " +
                    "LEFT JOIN ConsultReport cr ON c.id = cr.id"
    )
    Page<ConsultReportListResponse> findByClientIdAndCounselorId(@Param("clientId") Long clientId, @Param("counselorId") Long counselorId, Pageable pageable);
}
