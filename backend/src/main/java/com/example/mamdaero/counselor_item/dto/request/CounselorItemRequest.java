package com.example.mamdaero.counselor_item.dto.request;

import com.example.mamdaero.counselor_item.entity.CounselorItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CounselorItemRequest {

    private String name;
    private String description;
    private int fee;

    public static CounselorItem toEntity(Long counselorId, CounselorItemRequest request) {
        return CounselorItem.builder()
                .counselorId(counselorId)
                .name(request.getName())
                .description(request.getDescription())
                .fee(request.getFee())
                .build();
    }
}
