package com.mamdaero.domain.selftest.dto.response;

import com.mamdaero.domain.selftest.entity.SelftestQuestionResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SelftestQuestionResponseResponseDto {
    private Integer selftestQuestionResponseId;
    private Integer memberSelftestId;
    private String selftestQuestion;
    private Integer selftestMemberQuestionScore;


    public static SelftestQuestionResponseResponseDto toDTO(SelftestQuestionResponse SelftestQuestionResponse) {
        return SelftestQuestionResponseResponseDto.builder()
                .selftestQuestionResponseId(SelftestQuestionResponse.getId())
                .memberSelftestId(SelftestQuestionResponse.getMemberSelftestList().getId())
                .selftestQuestion(SelftestQuestionResponse.getSelftestQuestion().getSelftestQuestionDetail())
                .selftestMemberQuestionScore(SelftestQuestionResponse.getSelftestMemberQuestionScore())
                .build();
    }
}
