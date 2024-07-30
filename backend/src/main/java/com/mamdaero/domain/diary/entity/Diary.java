package com.mamdaero.domain.diary.entity;

import com.mamdaero.domain.member.entity.Member;
import com.mamdaero.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class Diary extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "diary_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    // emotion_id 필요
    private String content;

    private LocalDate date;

    @Builder.Default
    private Boolean is_open = true;

    @Builder.Default
    private Boolean is_delete = false;

}
