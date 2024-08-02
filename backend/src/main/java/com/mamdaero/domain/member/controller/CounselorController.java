package com.mamdaero.domain.member.controller;

import com.mamdaero.domain.member.dto.request.CounselorRequestDto;
import com.mamdaero.domain.member.entity.Counselor;
import com.mamdaero.domain.member.service.CounselorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CounselorController {

    private final CounselorService counselorService;

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
    @PatchMapping(value = "/c/member/counselor/img")
    public ResponseEntity<?> modifyIntroImg(@RequestPart(name = "file", required = false) MultipartFile file) throws IOException {

        counselorService.modifyImg(file);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
