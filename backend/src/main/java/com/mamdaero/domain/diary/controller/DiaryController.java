package com.mamdaero.domain.diary.controller;

import com.mamdaero.domain.diary.dto.request.DiaryRequestDto;
import com.mamdaero.domain.diary.dto.response.DiaryResponseDto;
import com.mamdaero.domain.diary.entity.Diary;
import com.mamdaero.domain.diary.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;

    @GetMapping("/m/diary")
    public ResponseEntity<List<DiaryResponseDto>> findAllByMember() {

        List<DiaryResponseDto> diaryList = diaryService.findAllByMember();

        return new ResponseEntity<>(diaryList, HttpStatus.OK);
    }

    @GetMapping("/c/diary")
    public ResponseEntity<List<DiaryResponseDto>> findAllByDiary() {

        List<DiaryResponseDto> diaryList = diaryService.findAllByMemberAndIsOpen(true);

        return new ResponseEntity<>(diaryList, HttpStatus.OK);
    }

    @GetMapping("/m/diary/{diaryId}")
    public ResponseEntity<DiaryResponseDto> findById(@PathVariable(name = "diaryId") Long diaryId) {
        DiaryResponseDto diary = diaryService.findById(diaryId);

        return new ResponseEntity<>(diary, HttpStatus.OK);
    }

    @PostMapping("/m/diary")
    public ResponseEntity<Diary> create(@RequestBody DiaryRequestDto requestDto) {

        diaryService.create(requestDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/m/diary/{diaryId}")
    public ResponseEntity<Diary> update(@PathVariable(name = "diaryId") Long diaryId, @RequestBody DiaryRequestDto requestDto) {

        diaryService.update(diaryId, requestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/m/diary/{diaryId}")
    public ResponseEntity<Diary> delete(@PathVariable(name = "diaryId") Long diaryId) {

        diaryService.delete(diaryId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
