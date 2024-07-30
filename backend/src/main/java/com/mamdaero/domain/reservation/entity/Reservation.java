package com.mamdaero.domain.reservation.entity;

import com.mamdaero.domain.counselor_item.entity.CounselorItem;
import com.mamdaero.domain.member.entity.Member;
import com.mamdaero.domain.work_schedule.entity.WorkTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;
    @ManyToOne
    @JoinColumn(name = "counselor_item_id", nullable = false)
    private CounselorItem counselorItem;
    @ManyToOne
    @JoinColumn(name = "worktime_id", nullable = false)
    private WorkTime workTime;
//    @ManyToOne
//    @JoinColumn(name = "symptom_id")
//    private Code symptom;
    @Column(name = "status", nullable = false)
    private String status;
    @Column(name = "item_name", nullable = false)
    private String itemName;
    @Column(name = "item_fee", nullable = false)
    private Integer itemFee;
    @Column(name = "requested_at", nullable = false)
    private LocalDateTime requestedAt;
    @Column(name = "canceler")
    private String canceler;
    @Column(name = "canceled_at")
    private LocalDateTime canceledAt;
    @Column(name = "requirement")
    private String requirement;

    @Column(name = "is_diary_shared")
    private Boolean isDiaryShared;

    @Column(name = "is_delete", nullable = false)
    private Boolean isDelete;
}
