package com.example.mamdaero.member.controller;

import com.example.mamdaero.member.dto.MemberDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MemberController {

    @PatchMapping(value = "/member", consumes = "application/json")
    public ResponseEntity<?> patchMemberJson(@RequestBody MemberDto memberDto) {
        memberDto.setNickname(memberDto.getNickname());
        memberDto.setBirth(memberDto.getBirth());
        memberDto.setTel(memberDto.getTel());

        return new ResponseEntity<>(memberDto, HttpStatus.OK);
    }

    @PatchMapping(value = "/member", consumes = "application/x-www-form-urlencoded")
    public ResponseEntity<?> patchMemberForm(MemberDto memberDto) {
        memberDto.setNickname(memberDto.getNickname());
        memberDto.setBirth(memberDto.getBirth());
        memberDto.setTel(memberDto.getTel());

        return new ResponseEntity<>(memberDto, HttpStatus.OK);
    }
}
