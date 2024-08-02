package com.mamdaero.domain.postit.dto.response;

import com.mamdaero.domain.postit.entity.Postit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostitResponse {

    private Long id;
    private String writer;
    private String content;
    private Integer likeCount;
    private Boolean isLike;
    private Boolean isMine;

    public static PostitResponse of(Postit postit, String writer, int like, boolean isLike, boolean isMine) {
        return PostitResponse.builder()
                .id(postit.getId())
                .writer(writer)
                .content(postit.getContent())
                .likeCount(like)
                .isLike(isLike)
                .isMine(isMine)
                .build();
    }
}