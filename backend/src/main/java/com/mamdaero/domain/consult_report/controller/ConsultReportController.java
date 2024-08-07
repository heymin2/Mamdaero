package com.mamdaero.domain.consult_report.controller;

import com.mamdaero.domain.consult_report.dto.response.ConsultReportListResponse;
import com.mamdaero.domain.consult_report.service.ConsultReportService;
import com.mamdaero.global.dto.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ConsultReportController {

    private final ConsultReportService consultingReportService;

    /**
     * 내담자별 상담 보고서 목록 조회
     */
    @GetMapping("/c/{clientId}/consult-report")
    public ResponseEntity<Pagination<ConsultReportListResponse>> getConsultReportListByClientId(
            @PathVariable(name = "clientId") Long clientId,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        Pagination<ConsultReportListResponse> reportList = consultingReportService.getConsultReportListByClientId(clientId, page, size);
        return ResponseEntity.ok(reportList);
    }

}
