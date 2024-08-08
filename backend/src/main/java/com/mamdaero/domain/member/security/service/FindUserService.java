package com.mamdaero.domain.member.security.service;

import com.mamdaero.domain.member.entity.Member;
import com.mamdaero.domain.member.repository.MemberRepository;
import com.mamdaero.domain.member.security.apiresult.exception.handler.MemberHandler;
import com.mamdaero.domain.member.security.apiresult.status.ErrorStatus;
import com.mamdaero.domain.member.security.dto.MemberInfoDTO;
import com.mamdaero.domain.member.security.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class FindUserService
{
    private final MemberRepository memberRepository;
    //ID, 이메일, 역할 있는 객체 반환
    public MemberInfoDTO findMember()
    {
        log.info("findMember : {}",SecurityUtil.getLoginEmail());
        Member member = memberRepository.findByEmail(SecurityUtil.getLoginEmail()).orElseThrow(() -> new MemberHandler(ErrorStatus.MEMBER_NOT_FOUND));
        log.info("findMemberOut : {}", member);

        if(member.getId() != null)
        {
            return MemberInfoDTO.builder()
                    .memberId(member.getId())
                    .memberEmail(member.getEmail())
                    .memberRole(member.getRole())
                    .build();
        }
        else
        {
            return null;
        }
    }

    //멤버 ID 반환
    public Long findMemberId()
    {
        System.out.println(SecurityUtil.getLoginEmail());
        Member member = memberRepository.findByEmail(SecurityUtil.getLoginEmail()).orElseThrow(() -> new MemberHandler(ErrorStatus.MEMBER_NOT_FOUND));
        System.out.println(member.getId());

        if (member.getId() != null)
        {
            return member.getId();
        }
        else
        {
            return null;
        }
    }

    //멤버 역할 반환
    public String findMemberRole()
    {
        Member member = memberRepository.findByEmail(SecurityUtil.getLoginEmail()).orElseThrow(() -> new MemberHandler(ErrorStatus.MEMBER_NOT_FOUND));

        if (member.getId() != null)
        {
            return member.getRole();
        }
        else
        {
            return null;
        }
    }
}
