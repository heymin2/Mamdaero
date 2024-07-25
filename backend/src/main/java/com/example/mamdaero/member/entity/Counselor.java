package com.example.mamdaero.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Setter
@Getter
@NoArgsConstructor
@SuperBuilder(toBuilder = true)
@ToString(callSuper = true)
public class Counselor extends Member{
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
