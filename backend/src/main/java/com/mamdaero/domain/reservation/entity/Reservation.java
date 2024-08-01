package com.mamdaero.domain.reservation.entity;

import com.mamdaero.global.entity.BaseEntity;
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
public class Reservation extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;
    private Long memberId;
    private Long counselorItemId;
    @Column(name = "worktime_id")
    private Long workTimeId;
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
