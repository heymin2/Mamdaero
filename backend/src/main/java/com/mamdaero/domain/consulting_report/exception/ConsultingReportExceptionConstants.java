package com.mamdaero.domain.consulting_report.exception;

import com.mamdaero.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ConsultingReportExceptionConstants implements ExceptionConstants {

    CONSULTING_REPORT_NOT_FOUND("CR001", HttpStatus.NOT_FOUND),
    CONSULTING_REPORT_BAD_REQUEST("CR002", HttpStatus.BAD_REQUEST),
    CONSULTING_REPORT_UNAUTHORIZED("CR003", HttpStatus.UNAUTHORIZED),
    CONSULTING_REPORT_NO_TITLE("CR004", HttpStatus.BAD_REQUEST),
    CONSULTING_REPORT_NO_DETAIL("CR005", HttpStatus.BAD_REQUEST),
    CONSULTING_REPORT_ALREADY("CR006", HttpStatus.BAD_REQUEST);

    private final String code;
    private final HttpStatus status;
}
