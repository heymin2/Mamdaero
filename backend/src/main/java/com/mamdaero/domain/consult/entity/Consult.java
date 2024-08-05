package com.mamdaero.domain.consult.entity;

import com.mamdaero.domain.reservation.entity.Reservation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "consult")
public class Consult {

    @Id
    @Column(name = "consult_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "consult_id")
    private Reservation reservation;

    @Column(name = "start_at")
    private LocalDateTime startAt;

    @Column(name = "end_at")
    private LocalDateTime endAt;

    @Column(name = "script_url", length = 256)
    private String scriptUrl;

    @Column(name = "summarized_script__url", length = 256)
    private String summarizedScriptUrl;
}