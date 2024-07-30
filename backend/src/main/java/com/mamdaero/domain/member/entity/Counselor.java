package com.mamdaero.domain.member.entity;

import com.mamdaero.global.entity.BaseEntity;
import com.mamdaero.domain.member.dto.request.CounselorRequestDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@NoArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
@AllArgsConstructor
@Table(name = "counselor")
@PrimaryKeyJoinColumn(name = "counselor_id")
public class Counselor extends Member{
>>>>>>> backend/src/main/java/com/mamdaero/domain/member/entity/Counselor.java
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

    public void updateIntro(CounselorRequestDto requestDto){
        this.intro = requestDto.getIntro();
    }

    public void updateIntroDetail(CounselorRequestDto requestDto){
        this.introDetail = requestDto.getIntroDetail();
    }

    public void updateImg(CounselorRequestDto requestDto){
        this.img = requestDto.getImg();
    }
}
