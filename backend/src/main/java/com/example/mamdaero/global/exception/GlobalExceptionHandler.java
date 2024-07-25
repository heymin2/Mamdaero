package com.example.mamdaero.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> exception(Exception ex){
        return new ResponseEntity<>("알 수 없는 에러 발생", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({CustomException.class})
    public ResponseEntity<?> customExceptionHandler(CustomException e) {
        ExceptionConstants ec = e.getConstants();
        log.error("Error handler : {}", ec.getCode());
        return new ResponseEntity<>(ec.getCode(), ec.getStatus());
    }

}
