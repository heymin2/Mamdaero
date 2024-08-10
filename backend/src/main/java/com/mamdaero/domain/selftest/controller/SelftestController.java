package com.mamdaero.domain.selftest.controller;

import com.mamdaero.domain.member.security.service.FindUserService;
import com.mamdaero.domain.selftest.dto.request.TestRequestDto;
import com.mamdaero.domain.selftest.dto.response.SelftestQuestionResponseDto;
import com.mamdaero.domain.selftest.dto.response.SelftestResponseDto;
import com.mamdaero.domain.selftest.entity.MemberSelftestList;
import com.mamdaero.domain.selftest.service.SelftestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class SelftestController {

    private final SelftestService selftestService;
    private final FindUserService findUserService;

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

    @PostMapping("/m/selftest/{testId}")
    public ResponseEntity<MemberSelftestList> createByTestId(@PathVariable(name = "testId") Integer testId, @RequestBody TestRequestDto requestDto) {

        if (Objects.equals(findUserService.findMemberRole(), "내담자")) {

            selftestService.createByTestId(findUserService.findMemberId(), testId, requestDto);

            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
