package com.mamdaero.domain.member.exception;

import com.mamdaero.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MemberExceptionConstants implements ExceptionConstants  {

    FILE_NOT_FOUND("F001", HttpStatus.NOT_FOUND),
    FILE_BAD_REQUEST("F002", HttpStatus.BAD_REQUEST),
    ACCESS_DENIED("A001", HttpStatus.FORBIDDEN);

    private final String code;
    private final HttpStatus status;
}
