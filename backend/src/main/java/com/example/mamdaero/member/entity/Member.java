package com.example.mamdaero.member.entity;

import com.example.global.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.Date;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder(toBuilder = true)
@ToString(callSuper = true)
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;
    @Column(length = 128, nullable = false)
    private String email;
    @Column(length = 128, nullable = false)
    private String password;
    @Column(length = 20, nullable = false)
    private String name;
    @Column(length = 20, nullable = false)
    private String nickname;
    private Date birth;
    @Column(length = 128, nullable = false)
    private String tel;
    @Column(length = 1)
    private String gender;
    @Column(length = 3, nullable = false)
    private String role;
    @Column(nullable = false)
    private Boolean memberStatus;
    @Column(length = 128)
    private String token;
}
