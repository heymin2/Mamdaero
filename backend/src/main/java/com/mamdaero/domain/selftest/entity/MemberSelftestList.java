package com.mamdaero.domain.selftest.entity;

import com.mamdaero.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class MemberSelftestList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_selftest_id")
    private Integer id;
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
    @ManyToOne(fetch = FetchType.LAZY)
    private Selftest selftest;
    private Integer selftestTotalScore;
    private LocalDateTime memberSelftestDate;
}
