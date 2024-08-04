package com.mamdaero.domain.review.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {
//
//    private final ReviewRepository reviewRepository;
//
//    public List<ReviewResponseDto> findAllByReservation_CounselorItem_CounselorId(Long id) {
//
//        if (reviewRepository.findAllByReservation_CounselorItem_CounselorId(id).isEmpty()) {
//            throw new ReviewNotFoundException();
//        }
//
//        return reviewRepository.findAllByReservation_CounselorItem_CounselorId(id).stream()
//                .map(ReviewResponseDto::toDto)
//                .toList();
//    }
//
//    @Transactional
//    public void create(Long id, ReviewRequestDto requestDto) {
//
//        Optional<Review> optionalReview = reviewRepository.findById(id);
//
//        if (optionalReview.isEmpty()) {
//
//            if (requestDto.getReview().isEmpty()) {
//                throw new ReviewNoReviewException();
//            } else if (requestDto.getScore().isNaN()) {
//                throw new ReviewNoScoreException();
//            }
//
//            Review review = Review.builder()
//                    .id(id)
//                    .review(requestDto.getReview())
//                    .score(requestDto.getScore())
//                    .build();
//
//            reviewRepository.save(review);
//        } else {
//            throw new ReviewAlreadyException();
//        }
//    }
//
//    @Transactional
//    public void update(Long id, ReviewRequestDto requestDto) {
//        Optional<Review> optionalReview = reviewRepository.findById(id);
//
//        if (optionalReview.isPresent()) {
//
//            Review review = optionalReview.get();
//
//            if (requestDto.getReview().isEmpty()) {
//                throw new ReviewNoReviewException();
//            } else if (requestDto.getScore().isNaN()) {
//                throw new ReviewNoScoreException();
//            }
//
//            review.update(requestDto);
//        } else {
//            throw new ReviewNotFoundException();
//        }
//    }
//
//    @Transactional
//    public void delete(Long id) {
//        Optional<Review> optionalReview = reviewRepository.findById(id);
//
//        if (optionalReview.isPresent()) {
//            Review review = optionalReview.get();
//
//            reviewRepository.delete(review);
//        } else {
//            throw new ReviewNotFoundException();
//        }
//    }
}
