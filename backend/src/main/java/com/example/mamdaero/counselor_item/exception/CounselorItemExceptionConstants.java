package com.example.mamdaero.counselor_item.exception;

import com.example.mamdaero.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CounselorItemExceptionConstants implements ExceptionConstants {

    COUNSELOR_NOT_FOUND("C001", HttpStatus.NOT_FOUND),
    COUNSELOR_BAD_REQUEST("C002", HttpStatus.BAD_REQUEST);

    private final String code;
    private final HttpStatus status;
}
