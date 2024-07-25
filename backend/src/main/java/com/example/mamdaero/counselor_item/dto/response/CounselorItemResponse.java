package com.example.mamdaero.counselor_item.dto.response;

import com.example.mamdaero.counselor_item.entity.CounselorItem;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CounselorItemResponse {

    private Long counselorItemId;
    private String name;
    private String description;
    private int fee;

    public static List<CounselorItemResponse> of(List<CounselorItem> counselorItems) {
        return counselorItems.stream()
                .map(item -> CounselorItemResponse.builder()
                        .counselorItemId(item.getCounselorItemId())
                        .name(item.getName())
                        .description(item.getDescription())
                        .fee(item.getFee())
                        .build())
                .toList();
    }
}
