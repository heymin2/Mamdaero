package com.mamdaero.domain.diary.controller;

import com.mamdaero.domain.diary.dto.request.DiaryRequestDto;
import com.mamdaero.domain.diary.dto.response.DiaryResponseDto;
import com.mamdaero.domain.diary.entity.Diary;
import com.mamdaero.domain.diary.service.DiaryService;
import com.mamdaero.domain.member.security.service.FindUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;
    private final FindUserService findUserService;

    @GetMapping("/m/diary")
    public ResponseEntity<List<DiaryResponseDto>> findAllByMember() {

        if (Objects.equals(findUserService.findMemberRole(), "내담자")) {

            Long memberId = findUserService.findMemberId();

            List<DiaryResponseDto> diaryList = diaryService.findAllByMember(memberId);

            return new ResponseEntity<>(diaryList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @GetMapping("/c/diary/{memberId}")
    public ResponseEntity<List<DiaryResponseDto>> findAllByDiary(@PathVariable(name = "memberId") Long memberId) {

        if (Objects.equals(findUserService.findMemberRole(), "상담사")) {

            List<DiaryResponseDto> diaryList = diaryService.findAllByMemberAndIsOpen(memberId, true);

            return new ResponseEntity<>(diaryList, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @GetMapping("/m/diary/{diaryId}")
    public ResponseEntity<DiaryResponseDto> findById(@PathVariable(name = "diaryId") Long diaryId) {

        if (Objects.equals(findUserService.findMemberRole(), "내담자")) {

            DiaryResponseDto diary = diaryService.findById(diaryId);

            return new ResponseEntity<>(diary, HttpStatus.OK);

        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("/m/diary")
    public ResponseEntity<Diary> create(@RequestBody DiaryRequestDto requestDto) {

        if (Objects.equals(findUserService.findMemberRole(), "내담자")) {

            diaryService.create(findUserService.findMemberId(), requestDto);

            return new ResponseEntity<>(HttpStatus.CREATED);

        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PatchMapping("/m/diary/{diaryId}")
    public ResponseEntity<Diary> update(@PathVariable(name = "diaryId") Long diaryId, @RequestBody DiaryRequestDto requestDto) {

        if (Objects.equals(findUserService.findMemberRole(), "내담자")) {

            diaryService.update(diaryId, requestDto, findUserService.findMemberId());

            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @DeleteMapping("/m/diary/{diaryId}")
    public ResponseEntity<Diary> delete(@PathVariable(name = "diaryId") Long diaryId) {

        if (Objects.equals(findUserService.findMemberRole(), "내담자")) {

            diaryService.delete(diaryId, findUserService.findMemberId());

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
