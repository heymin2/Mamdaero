package com.mamdaero.domain.review.entity;

import com.mamdaero.domain.review.dto.request.ReviewRequestDto;
import com.mamdaero.global.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@ToString(callSuper = true)
public class Review extends BaseEntity {

    @Id
    @Column(name = "review_id")
    private Long id;
    @Column(nullable = false)
    private String review;
    @Column(nullable = false)
    private Float score;
    @Builder.Default
    private Boolean isDelete = false;

    public void update(ReviewRequestDto requestDto) {
        this.review = requestDto.getReview();
        this.score = requestDto.getScore();
    }
}
