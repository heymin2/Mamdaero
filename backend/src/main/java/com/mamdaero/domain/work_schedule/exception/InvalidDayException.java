package com.mamdaero.domain.work_schedule.exception;

import com.mamdaero.global.exception.CustomException;

public class InvalidDayException extends CustomException {
    public InvalidDayException() {
        super(WorkScheduleExceptionConstants.INVALID_DAY);
    }
}
