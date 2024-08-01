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
public class BoardDetailResponse {

    private Long id;
    private String writer;
    private String title;
    private String content;
    private Integer view;
    private LocalDateTime createdAt;
    private Integer likeCount;
    private Boolean isLike;
    private Boolean isMine;

    public static BoardDetailResponse of(CounselorBoard board, String writer, int likeCount, boolean isLike, boolean isMine) {
        return BoardDetailResponse.builder()
                .id(board.getId())
                .writer(writer)
                .title(board.getTitle())
                .content(board.getContent())
                .view(board.getView())
                .createdAt(board.getCreatedAt())
                .likeCount(likeCount)
                .isLike(isLike)
                .isMine(isMine)
                .build();
    }
}