package com.mamdaero.domain.selftest.controller;

import com.mamdaero.domain.selftest.dto.SelftestQuestionResponseDto;
import com.mamdaero.domain.selftest.dto.SelftestResponseDto;
import com.mamdaero.domain.selftest.service.SelftestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SelftestController {

    private final SelftestService selftestService;

    @GetMapping("/p/selftest")
    public ResponseEntity<List<SelftestResponseDto>> findAll() {

        List<SelftestResponseDto> selftestList = selftestService.findAll();

        return new ResponseEntity<>(selftestList, HttpStatus.OK);
    }

    @GetMapping("/p/selftest/{testId}")
    public ResponseEntity<List<SelftestQuestionResponseDto>> getQuestionsWithOptionsByTestId(@PathVariable(name = "testId") Integer testId) {

        List<SelftestQuestionResponseDto> selftestQuestionList = selftestService.getQuestionsWithOptionsByTestId(testId);

        return new ResponseEntity<>(selftestQuestionList, HttpStatus.OK);
    }
}
