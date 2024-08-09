package com.mamdaero.domain.member.controller;

import com.mamdaero.domain.member.dto.request.CounselorRequestDto;
import com.mamdaero.domain.member.dto.response.CounselorResponseDto;
import com.mamdaero.domain.member.entity.Counselor;
import com.mamdaero.domain.member.security.service.FindUserService;
import com.mamdaero.domain.member.service.CounselorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class CounselorController {

    private final CounselorService counselorService;
    private final FindUserService findUserService;

    @GetMapping(value = "/p/counselor")
    public ResponseEntity<List<CounselorResponseDto>> getCounselors(@RequestParam(name = "counselorName", required = false) String counselorName) {
        List<CounselorResponseDto> counselors;
        if (counselorName == null || counselorName.isEmpty()) {
            counselors = counselorService.findAll();
        }
        else {
            counselors = counselorService.findAllByName(counselorName);
        }
        return new ResponseEntity<>(counselors, HttpStatus.OK);
    }

    @GetMapping(value = "/p/counselor/{counselorId}")
    public ResponseEntity<?> getCounselor(@PathVariable(name = "counselorId") Long id) {

        CounselorResponseDto responseDto = counselorService.find(id);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping(value = "/c/member/counselor")
    public ResponseEntity<?> getCounselor() {

        if (Objects.equals(findUserService.findMemberRole(), "상담사")) {
            Long CounselorId = findUserService.findMemberId();

            CounselorResponseDto responseDto = counselorService.find(CounselorId);

            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PatchMapping(value = "/c/member/counselor/intro", consumes = "application/json")
    public ResponseEntity<?> modifyIntro(@RequestBody CounselorRequestDto counselorDto) {

        if (Objects.equals(findUserService.findMemberRole(), "상담사")) {

            Long CounselorId = findUserService.findMemberId();

            counselorService.modifyIntro(CounselorId, counselorDto);

            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PatchMapping(value = "/c/member/counselor/intro-detail", consumes = "application/json")
    public ResponseEntity<?> modifyIntroDetail(@RequestBody CounselorRequestDto counselorDto) {

        if (Objects.equals(findUserService.findMemberRole(), "상담사")) {

            Long CounselorId = findUserService.findMemberId();

            counselorService.modifyIntroDetail(CounselorId, counselorDto);

            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PatchMapping(value = "/c/member/counselor/img")
    public ResponseEntity<?> modifyIntroImg(@RequestPart(name = "file", required = false) MultipartFile file) throws IOException {

        if (Objects.equals(findUserService.findMemberRole(), "상담사")) {

            Long CounselorId = findUserService.findMemberId();

            counselorService.modifyImg(CounselorId, file);

            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

}
