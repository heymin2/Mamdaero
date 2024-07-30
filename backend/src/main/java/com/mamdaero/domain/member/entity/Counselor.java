package com.mamdaero.domain.member.entity;

import com.mamdaero.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
@AllArgsConstructor
@Table(name = "counselor")
@PrimaryKeyJoinColumn(name = "counselor_id")
public class Counselor extends Member {

//    @Id
//    @MapsId
//    @JoinColumn(name = "counselor_id", referencedColumnName = "member_id")
//    @OneToOne
//    private Member member;

    @Column(length = 128)
    private String address;

    @Column(nullable = false)
    private Integer level;

    @Column(nullable = false, unique = true, length = 10)
    private String license;

    @Column(length = 100)
    private String intro;

    @Column(length = 5000, name = "intro_detail")
    private String introDetail;

    @Column(length = 256)
    private String img;
}
