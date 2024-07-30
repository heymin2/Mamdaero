package com.mamdaero.domain.counselor_board.dto.response;

import com.mamdaero.domain.counselor_board.entity.CounselorBoard;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class  BoardResponse {

    private Long id;
    private String writer;
    private String title;
    private Integer view;
    private LocalDateTime createdAt;

    public static BoardResponse of(CounselorBoard board, String writer) {
        return BoardResponse.builder()
                .id(board.getId())
                .writer(writer)
                .title(board.getTitle())
                .view(board.getView())
                .createdAt(board.getCreatedAt())
                .build();
    }
}