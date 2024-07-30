package com.mamdaero.domain.consulting_report.entity;

import com.mamdaero.domain.consulting_report.dto.ConsultingReportRequestDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
public class ConsultingReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long id;
    @Column(length = 200)
    private String title;
    @Column(length = 5000)
    private String detail;
    @Column(length = 3000)
    private String opinion;

    public void update(ConsultingReportRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.detail = requestDto.getDetail();
        this.opinion = requestDto.getOpinion();
    }
}
