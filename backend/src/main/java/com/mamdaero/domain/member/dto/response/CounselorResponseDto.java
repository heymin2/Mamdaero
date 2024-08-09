package com.mamdaero.domain.member.dto.response;

import com.mamdaero.domain.member.entity.Counselor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CounselorResponseDto {
    private String name;
    private String tel;
    private String gender;
    private Integer level;
    private String license;
    private String intro;
    private String introDetail;
    private String img;

    public static CounselorResponseDto toDTO(Counselor counselor) {
        return CounselorResponseDto.builder()
                .name(counselor.getName())
                .tel(counselor.getTel())
                .gender(counselor.getGender())
                .level(counselor.getLevel())
                .license(counselor.getLicense())
                .intro(counselor.getIntro())
                .introDetail(counselor.getIntroDetail())
                .img(counselor.getImg())
                .build();
    }
}
