package com.mamdaero.domain.notice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@SQLDelete(sql = "UPDATE notice SET is_delete = true WHERE notice_id = ?")
@Where(clause = "is_delete = false")
@Table(name = "notice")
public class Notice {

    @Id
    @Column(name = "notice_id", updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column
    private Integer view;

    @Column(name = "is_delete")
    @ColumnDefault("false")
    private Boolean is_delete;
}
