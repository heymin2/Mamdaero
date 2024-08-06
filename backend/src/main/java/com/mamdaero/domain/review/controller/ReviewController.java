package com.mamdaero.domain.review.controller;

import com.mamdaero.domain.review.dto.response.ReviewResponse;
import com.mamdaero.domain.review.service.ReviewService;
import com.mamdaero.global.dto.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/p/counselor/{counselorId}/review")
    public ResponseEntity<Pagination<ReviewResponse>> findCounselorReview(
            @PathVariable(name = "counselorId") Long counselorId,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {

        Pagination<ReviewResponse> reviewList = reviewService.findAllCounselorReview(counselorId, page, size);

        return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }

    @GetMapping("/m/review")
    public ResponseEntity<Pagination<ReviewResponse>> findMyReview(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        Pagination<ReviewResponse> reviewList = reviewService.findAllMyReview(page, size);
        return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }
//
//    @PostMapping("/review/{reviewId}")
//    public ResponseEntity<Review> create(@PathVariable(name = "reviewId") Long reviewId, @RequestBody ReviewRequestDto requestDto) {
//
//        reviewService.create(reviewId, requestDto);
//
//        return new ResponseEntity<>(HttpStatus.CREATED);
//    }
//
//    @PatchMapping("/review/{reviewId}")
//    public ResponseEntity<Review> update(@PathVariable(name = "reviewId") Long reviewId, @RequestBody ReviewRequestDto requestDto) {
//
//        reviewService.update(reviewId, requestDto);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @DeleteMapping("/review/{reviewId}")
//    public ResponseEntity<Review> delete(@PathVariable(name = "reviewId") Long reviewId) {
//
//        reviewService.delete(reviewId);
//
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
}


