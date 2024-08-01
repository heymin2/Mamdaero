package com.mamdaero.domain.selftest.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class SelftestQuestionOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "selftest_question_option_id")
    private Integer id;
    @ManyToOne(fetch = FetchType.LAZY)
    private SelftestQuestion selftestQuestion;
    private String selftestQuestionOptionDetail;
    private Integer selftestQuestionOptionScore;

}
