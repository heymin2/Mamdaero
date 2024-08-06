package com.mamdaero.domain.review.service;

import com.mamdaero.domain.review.dto.response.ReviewResponse;
import com.mamdaero.domain.review.repository.ReviewRepository;
import com.mamdaero.global.dto.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public Pagination<ReviewResponse> findAllCounselorReview(Long id, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<ReviewResponse> reviewPage = reviewRepository.findAllCounselorReview(id, pageable);

        return new Pagination<>(
                reviewPage.getContent(),
                reviewPage.getNumber() + 1,
                reviewPage.getTotalPages(),
                reviewPage.getSize(),
                (int) reviewPage.getTotalElements()
        );

    }

    public Pagination<ReviewResponse> findAllMyReview(int page, int size) {
        //TODO: 진짜 멤버 아이디로 바꾸기
        Long memberId = 1L;

        Pageable pageable = PageRequest.of(page, size);

        Page<ReviewResponse> reviewPage = reviewRepository.findAllMyReview(memberId, pageable);

        return new Pagination<>(
                reviewPage.getContent(),
                reviewPage.getNumber() + 1,
                reviewPage.getTotalPages(),
                reviewPage.getSize(),
                (int) reviewPage.getTotalElements()
        );
    }

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
