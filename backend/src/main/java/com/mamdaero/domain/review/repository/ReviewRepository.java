package com.mamdaero.domain.review.repository;

import com.mamdaero.domain.review.dto.response.ReviewResponse;
import com.mamdaero.domain.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT new com.mamdaero.domain.review.dto.response.ReviewResponse(r.id, r.review, r.score) " +
            "FROM Review r " +
            "JOIN Reservation rv ON r.id = rv.id " +
            "JOIN CounselorItem ci ON rv.counselorItemId = ci.counselorItemId " +
            "WHERE ci.counselorId = :counselorId ")
    Page<ReviewResponse> findAllCounselorReview(@Param("counselorId") Long counselorId, Pageable pageable);
}
