package com.mamdaero.domain.member.controller;

import com.mamdaero.domain.member.dto.request.MemberRequestDto;
import com.mamdaero.domain.member.entity.Member;
import com.mamdaero.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // Todo id 말고 토큰으로 본인 찾기 추가
    @GetMapping(value = "/m/member")
    public ResponseEntity<?> getMember() {
        // member 객체 찾아오기

        Member member = memberService.find(1L);

        return new ResponseEntity<>(member, HttpStatus.OK);
    }

    // Todo id 말고 토큰으로 본인 찾기 추가
    @PatchMapping(value = "/m/member", consumes = "application/json")
    public ResponseEntity<?> patchMemberJson(@RequestBody MemberRequestDto memberRequestDto) {

        memberService.modifyMember(1L, memberRequestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
