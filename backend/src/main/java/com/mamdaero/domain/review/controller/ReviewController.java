package com.mamdaero.domain.review.controller;

import com.mamdaero.domain.review.dto.ReviewRequestDto;
import com.mamdaero.domain.review.entity.Review;
import com.mamdaero.domain.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReviewController {

    @Autowired
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/counselor/{counselorId}/review")
    public ResponseEntity<List<Review>> findCounselorReview(@PathVariable(name = "counselorId") Long counselorId) {

        List<Review> reviewList = reviewService.findAll();

        return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }

    @GetMapping("/review")
    public ResponseEntity<List<Review>> findMyReview() {

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/review/{reviewId}")
    public ResponseEntity<Review> create(@PathVariable(name = "reviewId") Long reviewId, @RequestBody ReviewRequestDto requestDto) {

        reviewService.create(reviewId, requestDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/review/{reviewId}")
    public ResponseEntity<Review> update(@PathVariable(name = "reviewId") Long reviewId, @RequestBody ReviewRequestDto requestDto) {

        reviewService.update(reviewId, requestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/review/{reviewId}")
    public ResponseEntity<Review> delete(@PathVariable(name = "reviewId") Long reviewId) {

        reviewService.delete(reviewId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}


