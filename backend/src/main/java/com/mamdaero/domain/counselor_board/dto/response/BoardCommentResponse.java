package com.mamdaero.domain.counselor_board.dto.response;

import com.mamdaero.domain.counselor_board.entity.CounselorBoardComment;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardCommentResponse {

    private Long id;
    private String writer;
    private String comment;
    private LocalDateTime createdAt;

    public static BoardCommentResponse of(CounselorBoardComment comment, String writer) {
        return BoardCommentResponse.builder()
                .id(comment.getId())
                .writer(writer)
                .comment(comment.getComment())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
