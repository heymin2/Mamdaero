package com.example.mamdaero.member.controller;

import com.example.mamdaero.member.dto.MemberRequestDto;
import com.example.mamdaero.member.dto.MemberResponseDto;
import com.example.mamdaero.member.entity.Member;
import com.example.mamdaero.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MemberController {

    @Autowired
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping(value = "/member")
    public ResponseEntity<?> getMember() {
        // member 객체 찾아오기
        Member member = new Member();
        return new ResponseEntity<>(member, HttpStatus.OK);
    }

    @PatchMapping(value = "/member", consumes = "application/json")
    public ResponseEntity<?> patchMemberJson(@RequestBody MemberRequestDto memberRequestDto) {

        memberService.modifyMember(1L, memberRequestDto.getNickname(), memberRequestDto.getBirth(), memberRequestDto.getTel());

        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @PatchMapping(value = "/member", consumes = "application/json")
//    public ResponseEntity<?> patchMemberJson(@RequestBody MemberRequestDto memberRequestDto, MemberResponseDto memberResponseDto) {
//
//        memberService.modifyMember(1L, memberRequestDto.getNickname(), memberRequestDto.getBirth(), memberRequestDto.getTel());
//
//        return new ResponseEntity<>(memberResponseDto, HttpStatus.OK);
//    }

//    @PatchMapping(value = "/member", consumes = "application/x-www-form-urlencoded")
//    public ResponseEntity<?> patchMemberForm(MemberRequestDto memberRequestDto, MemberResponseDto memberResponseDto) {
//
//        memberService.modifyMember(1L, memberRequestDto.getNickname(), memberRequestDto.getBirth(), memberRequestDto.getTel());
//
//        return new ResponseEntity<>(memberResponseDto, HttpStatus.OK);
//    }
}
