package com.mamdaero.domain.member.controller;

import com.mamdaero.domain.member.dto.request.CounselorRequestDto;
import com.mamdaero.domain.member.entity.Counselor;
import com.mamdaero.domain.member.service.CounselorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CounselorController {

    @Autowired
    private final CounselorService counselorService;

    public CounselorController(CounselorService counselorService) {
        this.counselorService = counselorService;
    }

    @GetMapping(value = "/member/counselor")
    public ResponseEntity<?> getCounselor() {

        Counselor counselor = counselorService.find(2L);

        return new ResponseEntity<>(counselor, HttpStatus.OK);
    }

    @PatchMapping(value = "/member/counselor/intro", consumes = "application/json")
    public ResponseEntity<?> modifyIntroJson(@RequestBody CounselorRequestDto counselorDto) {

        counselorService.modifyIntro(2L, counselorDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PatchMapping(value = "/member/counselor/intro-detail", consumes = "application/json")
    public ResponseEntity<?> modifyIntroDetailJson(@RequestBody CounselorRequestDto counselorDto) {

        counselorService.modifyIntroDetail(2L, counselorDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PatchMapping(value = "/member/counselor/img", consumes = "application/json")
    public ResponseEntity<?> modifyIntroImgJson(@RequestBody CounselorRequestDto counselorDto) {

        counselorService.modifyImg(2L, counselorDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
