package com.mamdaero.domain.review.service;

import com.mamdaero.domain.consult.repository.ConsultRepository;
import com.mamdaero.domain.reservation.repository.ReservationRepository;
import com.mamdaero.domain.review.dto.request.CreateReviewRequest;
import com.mamdaero.domain.review.dto.request.UpdateReviewRequest;
import com.mamdaero.domain.review.dto.response.ReviewResponse;
import com.mamdaero.domain.review.entity.Review;
import com.mamdaero.domain.review.exception.ReviewAlreadyExistException;
import com.mamdaero.domain.review.exception.ReviewBadRequestException;
import com.mamdaero.domain.review.exception.ReviewNotFoundException;
import com.mamdaero.domain.review.repository.ReviewRepository;
import com.mamdaero.global.dto.Pagination;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ConsultRepository consultRepository;
    private final ReservationRepository reservationRepository;

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

    public void create(Long consultId, CreateReviewRequest request) {

        // 상담이 없으면 리뷰 작성 불가
        if (!consultRepository.existsById(consultId)) {
            throw new ReviewBadRequestException();
        }

        // 이미 작성된 리뷰가 있을경우 리뷰 작성 불가
        if (reviewRepository.existsById(consultId)) {
            throw new ReviewAlreadyExistException();
        }

        //TODO: 진짜 멤버ID 가져오기
        Long memberId = 1L;

        // 자신이 예약한 상담이 아닐경우 리뷰 작성 불가
        if (reservationRepository.findById(consultId).get().getMemberId() != memberId) {
            throw new ReviewBadRequestException();
        }


        Review review = Review.builder()
                .id(consultId)
                .review(request.getReview())
                .score(request.getScore())
                .build();
        reviewRepository.save(review);

    }

    @Transactional
    public void update(Long id, UpdateReviewRequest request) {

        if (!reviewRepository.existsById(id)) {
            throw new ReviewNotFoundException();
        }

        //TODO: 진짜 멤버 아이디로 바꾸기
        Long memberId = 1L;

        // 자신이 작성한 리뷰가 아닐경우 리뷰 수정 불가
        if (reservationRepository.findById(id).get().getMemberId() != memberId) {
            throw new ReviewBadRequestException();
        }

        Review review = reviewRepository.findById(id).get();
        review.update(request);
    }

    @Transactional
    public void delete(Long id) {
        if (!reviewRepository.existsById(id) || reviewRepository.findById(id).get().getIsDelete()) {
            throw new ReviewNotFoundException();
        }

        //TODO: 진짜 멤버 아이디로 바꾸기
        Long memberId = 1L;

        // 자신이 작성한 리뷰가 아닐경우 리뷰 삭제 불가
        if (reservationRepository.findById(id).get().getMemberId() != memberId) {
            throw new ReviewBadRequestException();
        }

        Review review = reviewRepository.findById(id).get();
        review.delete();
    }

}
