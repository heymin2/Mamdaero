package com.example.mamdaero.member.controller;

import com.example.mamdaero.member.dto.CounselorDto;
import com.example.mamdaero.member.entity.Counselor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CounselorController {

    @GetMapping(value = "/member/counselor")
    public ResponseEntity<?> getCounselor() {
        Counselor counselor = new Counselor();

        return new ResponseEntity<>(counselor, HttpStatus.OK);
    }

    @PatchMapping(value = "/member/counselor/intro", consumes = "application/json")
    public ResponseEntity<?> modifyIntroJson(@RequestBody CounselorDto counselorDto) {
        counselorDto.setIntro(counselorDto.getIntro());

        return new ResponseEntity<>(counselorDto, HttpStatus.OK);
    }

    @PatchMapping(value = "/member/counselor/intro", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<?> modifyIntroForm(CounselorDto counselorDto) {
        counselorDto.setIntro(counselorDto.getIntro());

        return new ResponseEntity<>(counselorDto, HttpStatus.OK);
    }

    @PatchMapping(value = "/member/counselor/intro-detail", consumes = "application/json")
    public ResponseEntity<?> modifyIntroDetailJson(@RequestBody CounselorDto counselorDto) {
        counselorDto.setIntroDetail(counselorDto.getIntroDetail());

        return new ResponseEntity<>(counselorDto, HttpStatus.OK);
    }

    @PatchMapping(value = "/member/counselor/intro-detail", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<?> modifyIntroDetailForm(CounselorDto counselorDto) {
        counselorDto.setIntroDetail(counselorDto.getIntroDetail());

        return new ResponseEntity<>(counselorDto, HttpStatus.OK);
    }

    @PatchMapping(value = "/member/counselor/img", consumes = "application/json")
    public ResponseEntity<?> modifyIntroImgJson(@RequestBody CounselorDto counselorDto) {
        counselorDto.setImg(counselorDto.getImg());

        return new ResponseEntity<>(counselorDto, HttpStatus.OK);
    }

    @PatchMapping(value = "/member/counselor/img", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<?> modifyIntroImgForm(CounselorDto counselorDto) {
        counselorDto.setImg(counselorDto.getImg());

        return new ResponseEntity<>(counselorDto, HttpStatus.OK);
    }
}
