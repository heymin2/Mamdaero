package com.example.global.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> customExceptionHandler(CustomException e) {
        ExceptionConstants ec = e.getConstants();
        return new ResponseEntity<>(ec.getCode(), ec.getStatus());
    }
}
