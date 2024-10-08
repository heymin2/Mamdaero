package com.mamdaero.domain.review.exception;

import com.mamdaero.global.exception.CustomException;

import java.io.Serial;

public class ReviewBadRequestException extends CustomException {

    @Serial
    private static final long serialVersionUID = 1L;

    public ReviewBadRequestException() {
        super(ReviewExceptionConstants.REVIEW_BAD_REQUEST);
    }
}
