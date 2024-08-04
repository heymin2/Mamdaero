package com.mamdaero.domain.reservation.entity;

import com.mamdaero.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
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

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReservationSymptom> symptoms;

    @OneToMany(mappedBy = "reservation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReservationSituation> situations;


    @Builder
    public Reservation(Long memberId, Long counselorItemId, Long workTimeId, String itemName, Integer itemFee, String requirement, Boolean isDiaryShared, List<ReservationSituation> situations, List<ReservationSymptom> symptoms) {
        this.memberId = memberId;
        this.counselorItemId = counselorItemId;
        this.workTimeId = workTimeId;
        this.itemName = itemName;
        this.itemFee = itemFee;
        this.requirement = requirement;
        this.isDiaryShared = isDiaryShared;
        this.status = "예약완료";
        this.isDelete = false;
        this.situations = situations;
        this.symptoms = symptoms;
    }

    /**
     * 예약 취소
     *
     * @param canceler 내담자, 상담사
     */
    public void cancel(String canceler) {
        this.status = "예약취소";
        this.canceler = canceler;
        this.canceledAt = LocalDateTime.now();
    }

    public void addSymptom(ReservationSymptom symptom) {
        symptoms.add(symptom);
        symptom.setReservation(this);
    }


    public void removeSymptom(ReservationSymptom symptom) {
        symptoms.remove(symptom);
        symptom.setReservation(null);
    }

    public void addSituation(ReservationSituation situation) {
        situations.add(situation);
        situation.setReservation(this);
    }

    public void removeSituation(ReservationSituation situation) {
        situations.remove(situation);
        situation.setReservation(null);
    }
}
