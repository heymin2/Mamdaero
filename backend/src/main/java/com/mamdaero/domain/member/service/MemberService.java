package com.mamdaero.domain.member.service;

import com.mamdaero.domain.member.entity.Member;
import com.mamdaero.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public void modifyMember(final Long id, String nickname, LocalDate birth, String tel) {
        Optional<Member> optionalMember = memberRepository.findById(1L);

        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            member.setNickname(nickname);
            member.setBirth(birth);
            member.setTel(tel);
            memberRepository.save(member);
        }
    }
}
