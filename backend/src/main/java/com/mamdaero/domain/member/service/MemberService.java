package com.mamdaero.domain.member.service;

import com.mamdaero.domain.member.dto.request.MemberRequestDto;
import com.mamdaero.domain.member.entity.Member;
import com.mamdaero.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    // Todo id 말고 토큰으로 본인 찾기 추가
    public Member find(final Long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);

        return member.orElse(null);
    }

    // Todo id 말고 토큰으로 본인 찾기 추가
    @Transactional
    public void modifyMember(final Long id, MemberRequestDto requestDto) {
        Optional<Member> optionalMember = memberRepository.findById(id);

        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();

            member.update(requestDto);
        }
    }
}
