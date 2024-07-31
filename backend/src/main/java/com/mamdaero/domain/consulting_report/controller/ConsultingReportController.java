package com.mamdaero.domain.consulting_report.controller;

import com.mamdaero.domain.consulting_report.dto.request.ConsultingReportRequestDto;
import com.mamdaero.domain.consulting_report.dto.response.ConsultingReportResponseDto;
import com.mamdaero.domain.consulting_report.entity.ConsultingReport;
import com.mamdaero.domain.consulting_report.service.ConsultingReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ConsultingReportController {

    private final ConsultingReportService consultingReportService;

    // Todo 본인의 토큰 값으로 본인이 작성한 보고서만 볼 수 있게
    @GetMapping("/consult-report")
    public ResponseEntity<List<ConsultingReportResponseDto>> findAll() {
        List<ConsultingReportResponseDto> consultingReportList = consultingReportService.findAll();

        return new ResponseEntity<>(consultingReportList, HttpStatus.OK);
    }

    @GetMapping("consult-report/{report_id}")
    public ResponseEntity<ConsultingReport> findById(@PathVariable(name = "report_id") Long id) {
        ConsultingReport consultingReport = consultingReportService.find(id);

        return new ResponseEntity<>(consultingReport, HttpStatus.OK);
    }

    @PostMapping("consult-report/{report_id}")
    public ResponseEntity<ConsultingReport> create(@PathVariable(name = "report_id") Long id, @RequestBody ConsultingReportRequestDto requestDto) {

        consultingReportService.create(id, requestDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("consult-report/{report_id}")
    public ResponseEntity<ConsultingReport> update(@PathVariable(name = "report_id") Long id, @RequestBody ConsultingReportRequestDto requestDto) {

        consultingReportService.update(id, requestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
