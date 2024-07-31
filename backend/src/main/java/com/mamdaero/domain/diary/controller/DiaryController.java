package com.mamdaero.domain.diary.controller;

import com.mamdaero.domain.diary.dto.request.DiaryRequestDto;
import com.mamdaero.domain.diary.dto.response.DiaryResponseDto;
import com.mamdaero.domain.diary.entity.Diary;
import com.mamdaero.domain.diary.service.DiaryService;
import com.mamdaero.domain.member.entity.Member;
import com.mamdaero.domain.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DiaryController {

    @Autowired
    private final DiaryService diaryService;
    @Autowired
    private MemberRepository memberRepository;

    public DiaryController(DiaryService diaryService) {
        this.diaryService = diaryService;
    }

    @GetMapping("/diary")
    public ResponseEntity<List<DiaryResponseDto>> findAllByMember() {
        Member member = memberRepository.findById(1L).get();

        List<DiaryResponseDto> diaryList = diaryService.findAllByMember(member);


        return new ResponseEntity<>(diaryList, HttpStatus.OK);
    }

    @GetMapping("/diary/{diaryId}")
    public ResponseEntity<DiaryResponseDto> findById(@PathVariable(name = "diaryId") Long diaryId) {
        DiaryResponseDto diary = diaryService.findById(diaryId);

        return new ResponseEntity<>(diary, HttpStatus.OK);
    }

    @PostMapping("/diary")
    public ResponseEntity<Diary> create(@RequestBody DiaryRequestDto requestDto) {
        Member member = memberRepository.findById(1L).get();
        diaryService.create(requestDto, member);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/diary/{diaryId}")
    public ResponseEntity<Diary> update(@PathVariable(name = "diaryId") Long diaryId, @RequestBody DiaryRequestDto requestDto) {

        diaryService.update(diaryId, requestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/diary/{diaryId}")
    public ResponseEntity<Diary> delete(@PathVariable(name = "diaryId") Long diaryId) {

        diaryService.delete(diaryId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
