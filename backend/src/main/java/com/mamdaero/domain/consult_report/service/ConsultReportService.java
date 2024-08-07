package com.mamdaero.domain.consult_report.service;

import com.mamdaero.domain.consult_report.dto.response.ConsultReportDetailResponse;
import com.mamdaero.domain.consult_report.dto.response.ConsultReportListResponse;
import com.mamdaero.domain.consult_report.exception.ConsultReportNotFoundException;
import com.mamdaero.domain.consult_report.repository.ConsultReportRepository;
import com.mamdaero.global.dto.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConsultReportService {

    private final ConsultReportRepository consultReportRepository;

    public Pagination<ConsultReportListResponse> getConsultReportListByClientId(Long clientId, int page, int size) {

        // TODO: 토큰으로부터 진짜 상담사ID 가져오기
        Long counselorId = 16L;

        Pageable pageable = PageRequest.of(page, size);

        Page<ConsultReportListResponse> listPage = consultReportRepository.findByClientIdAndCounselorId(clientId, counselorId, pageable);

        return new Pagination<>(
                listPage.getContent(),
                listPage.getNumber() + 1,
                listPage.getTotalPages(),
                listPage.getSize(),
                (int) listPage.getTotalElements()
        );
    }

    public ConsultReportDetailResponse findById(Long reportId) {
        //TODO: 상담사 자신의 상담 보고서인지 확인하는 로직 추가하기

        if (!consultReportRepository.existsById(reportId)) {
            throw new ConsultReportNotFoundException();
        }

        ConsultReportDetailResponse report = consultReportRepository.findReport(reportId);

        return report;
    }
}
