package com.mamdaero.domain.review.service;

import com.mamdaero.domain.review.dto.request.ReviewRequestDto;
import com.mamdaero.domain.review.dto.response.ReviewResponseDto;
import com.mamdaero.domain.review.entity.Review;
import com.mamdaero.domain.review.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public List<ReviewResponseDto> findAllByReservation_CounselorItem_CounselorId(Long id) {
        return reviewRepository.findAllByReservation_CounselorItem_CounselorId(id).stream()
                .map(ReviewResponseDto::toDto)
                .toList();
    }

    @Transactional
    public void create(Long id, ReviewRequestDto requestDto) {

        Optional<Review> optionalReview = reviewRepository.findById(id);

        if (optionalReview.isEmpty()) {
            Review review = Review.builder()
                    .id(id)
                    .review(requestDto.getReview())
                    .score(requestDto.getScore())
                    .build();

            reviewRepository.save(review);
        }
    }

    @Transactional
    public void update(Long id, ReviewRequestDto requestDto) {
        Optional<Review> optionalReview = reviewRepository.findById(id);

        if (optionalReview.isPresent()) {
            Review review = optionalReview.get();

            review.update(requestDto);
        }
    }

    @Transactional
    public void delete(Long id) {
        Optional<Review> optionalReview = reviewRepository.findById(id);

        if (optionalReview.isPresent()) {
            Review review = optionalReview.get();

            reviewRepository.delete(review);
        }
    }
}
