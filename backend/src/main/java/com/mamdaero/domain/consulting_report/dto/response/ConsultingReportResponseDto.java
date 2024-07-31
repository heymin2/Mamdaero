package com.mamdaero.domain.consulting_report.dto.response;

import com.mamdaero.domain.consulting_report.entity.ConsultingReport;
import com.mamdaero.domain.member.repository.CounselorRepository;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ConsultingReportResponseDto {

    private String memberName;
    private Long reservationId;
    private String counselorItemName;
    private String counselorName;
    private String title;
    private String detail;
    private String opinion;
    private LocalDateTime consultDate;

    public static ConsultingReportResponseDto toDTO(ConsultingReport consultingReport, CounselorRepository counselorRepository) {
        return ConsultingReportResponseDto.builder()
                .reservationId(consultingReport.getReservation().getId())
                .memberName(consultingReport.getReservation().getMember().getName())
                .counselorItemName(consultingReport.getReservation().getCounselorItem().getName())
                .counselorName(counselorRepository.findById(consultingReport.getReservation().getCounselorItem().getCounselorId()).get().getName())
                .title(consultingReport.getTitle())
                .detail(consultingReport.getDetail())
                .opinion(consultingReport.getOpinion())
                .consultDate(consultingReport.getReservation().getRequestedAt())
                .build();
    }
}
