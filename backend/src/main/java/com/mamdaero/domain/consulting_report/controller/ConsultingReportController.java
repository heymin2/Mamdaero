package com.mamdaero.domain.consulting_report.controller;

import com.mamdaero.domain.consulting_report.dto.ConsultingReportRequestDto;
import com.mamdaero.domain.consulting_report.entity.ConsultingReport;
import com.mamdaero.domain.consulting_report.service.ConsultingReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ConsultingReportController {

    @Autowired
    private final ConsultingReportService consultingReportService;

    public ConsultingReportController(ConsultingReportService consultingReportService) {
        this.consultingReportService = consultingReportService;
    }

    @GetMapping("/consult-report")
    public ResponseEntity<List<ConsultingReport>> findAll() {
        List<ConsultingReport> consultingReportList = consultingReportService.findAll();

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
}
