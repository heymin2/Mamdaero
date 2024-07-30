package com.mamdaero.domain.diary.controller;

import com.mamdaero.domain.diary.dto.DiaryResponseDto;
import com.mamdaero.domain.diary.service.DiaryService;
import com.mamdaero.domain.member.entity.Member;
import com.mamdaero.domain.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
