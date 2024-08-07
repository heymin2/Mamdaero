package com.mamdaero.domain.consult_report.service;

import com.mamdaero.domain.consult_report.dto.response.ConsultReportListResponse;
import com.mamdaero.domain.consult_report.repository.ConsultReportRepository;
import com.mamdaero.domain.member.repository.CounselorRepository;
import com.mamdaero.global.dto.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConsultReportService {

    private final ConsultReportRepository consultingReportRepository;
    private final CounselorRepository counselorRepository;

    public Pagination<ConsultReportListResponse> getConsultReportListByClientId(Long clientId, int page, int size) {

        // TODO: 토큰으로부터 진짜 상담사ID 가져오기
        Long counselorId = 16L;

        Pageable pageable = PageRequest.of(page, size);

        Page<ConsultReportListResponse> listPage = consultingReportRepository.findByClientIdAndCounselorId(clientId, counselorId, pageable);

        return new Pagination<>(
                listPage.getContent(),
                listPage.getNumber() + 1,
                listPage.getTotalPages(),
                listPage.getSize(),
                (int) listPage.getTotalElements()
        );
    }
}
