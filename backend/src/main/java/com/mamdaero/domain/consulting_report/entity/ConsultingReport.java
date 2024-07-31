package com.mamdaero.domain.consulting_report.entity;

import com.mamdaero.domain.consulting_report.dto.request.ConsultingReportRequestDto;
import com.mamdaero.domain.reservation.entity.Reservation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
public class ConsultingReport {
    @Id
    @Column(name = "report_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "report_id")
    private Reservation reservation;

    @Column(length = 200, nullable = false)
    private String title;
    @Column(length = 5000, nullable = false)
    private String detail;
    @Column(length = 3000)
    private String opinion;

    public void update(ConsultingReportRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.detail = requestDto.getDetail();
        this.opinion = requestDto.getOpinion();
    }
}
