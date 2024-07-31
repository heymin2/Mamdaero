package com.mamdaero.domain.consulting_report.service;

import com.mamdaero.domain.consulting_report.dto.ConsultingReportRequestDto;
import com.mamdaero.domain.consulting_report.entity.ConsultingReport;
import com.mamdaero.domain.consulting_report.repository.ConsultingReportRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConsultingReportService {

    private final ConsultingReportRepository consultingReportRepository;

    public List<ConsultingReport> findAll() {
        return consultingReportRepository.findAll();
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
