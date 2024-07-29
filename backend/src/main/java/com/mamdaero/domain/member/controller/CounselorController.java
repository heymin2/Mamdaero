package com.mamdaero.domain.member.controller;

import com.mamdaero.domain.member.dto.request.CounselorRequestDto;
import com.mamdaero.domain.member.entity.Counselor;
import com.mamdaero.domain.member.service.CounselorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CounselorController {

    @Autowired
    private final CounselorService counselorService;

    public CounselorController(CounselorService counselorService) {
        this.counselorService = counselorService;
    }

    @GetMapping(value = "/counselor")
    public ResponseEntity<List<Counselor>> getCounselors() {
        List<Counselor> counselors = counselorService.findAll();

        return new ResponseEntity<>(counselors, HttpStatus.OK);
    }

    @GetMapping(value = "/counselor/{counselorId}")
    public ResponseEntity<?> getCounselor(@PathVariable(name = "counselorId") Long id) {

        Counselor counselor = counselorService.find(id);

        return new ResponseEntity<>(counselor, HttpStatus.OK);
    }

    // Todo id 말고 토큰으로 본인 찾기 추가
    @GetMapping(value = "/member/counselor")
    public ResponseEntity<?> getCounselor() {

        Counselor counselor = counselorService.find(2L);

        return new ResponseEntity<>(counselor, HttpStatus.OK);
    }

    // Todo id 말고 토큰으로 본인 찾기 추가
    @PatchMapping(value = "/member/counselor/intro", consumes = "application/json")
    public ResponseEntity<?> modifyIntro(@RequestBody CounselorRequestDto counselorDto) {

        counselorService.modifyIntro(2L, counselorDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    // Todo id 말고 토큰으로 본인 찾기 추가
    @PatchMapping(value = "/member/counselor/intro-detail", consumes = "application/json")
    public ResponseEntity<?> modifyIntroDetail(@RequestBody CounselorRequestDto counselorDto) {

        counselorService.modifyIntroDetail(2L, counselorDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    // Todo id 말고 토큰으로 본인 찾기 추가
    @PatchMapping(value = "/member/counselor/img", consumes = "application/json")
    public ResponseEntity<?> modifyIntroImg(@RequestBody CounselorRequestDto counselorDto) {

        counselorService.modifyImg(2L, counselorDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
