package com.mamdaero.domain.consulting_report.service;

import com.mamdaero.domain.consulting_report.dto.request.ConsultingReportRequestDto;
import com.mamdaero.domain.consulting_report.dto.response.ConsultingReportResponseDto;
import com.mamdaero.domain.consulting_report.entity.ConsultingReport;
import com.mamdaero.domain.consulting_report.repository.ConsultingReportRepository;
import com.mamdaero.domain.member.repository.CounselorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConsultingReportService {

    private final ConsultingReportRepository consultingReportRepository;
    private final CounselorRepository counselorRepository;

    public List<ConsultingReportResponseDto> findAll() {
        return consultingReportRepository.findAll().stream()
                .map(report -> ConsultingReportResponseDto.toDTO(report, counselorRepository))
                .collect(Collectors.toList());
    }

    public ConsultingReport find(Long id){
        Optional<ConsultingReport> consultingReport = consultingReportRepository.findById(id);

        return consultingReport.orElse(null);
    }

    @Transactional
    public void create(Long id, ConsultingReportRequestDto requestDto){

        ConsultingReport consultingReport = ConsultingReport.builder()
                .title(requestDto.getTitle())
                .detail(requestDto.getDetail())
                .opinion(requestDto.getOpinion())
                .build();

        consultingReportRepository.save(consultingReport);
    }

    @Transactional
    public void update(Long id, ConsultingReportRequestDto requestDto){
        Optional<ConsultingReport> optionalConsultingReport = consultingReportRepository.findById(id);

        if (optionalConsultingReport.isPresent()) {
            ConsultingReport consultingReport = optionalConsultingReport.get();

            consultingReport.update(requestDto);
        }
    }
}
