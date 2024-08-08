package com.mamdaero.domain.member.security.service;

import com.mamdaero.domain.member.entity.Counselor;
import com.mamdaero.domain.member.entity.Member;
import com.mamdaero.domain.member.repository.CounselorRepository;
import com.mamdaero.domain.member.repository.MemberRepository;
import com.mamdaero.domain.member.security.dto.request.CounselorSignUpDTO;
import com.mamdaero.domain.member.security.dto.request.EmailCheckRequestDTO;
import com.mamdaero.domain.member.security.dto.request.MemberSignUpDTO;
import com.mamdaero.domain.member.security.dto.request.NicknameCheckDTO;
import com.mamdaero.domain.member.security.repository.CounselorAuthRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberAuthService
{
    private final MemberRepository memberRepository;
    private final CounselorAuthRepository counselorAuthRepository;
    private final CounselorRepository counselorRepository;
    private final PasswordEncoder passwordEncoder;

    //내담자 회원 가입
    public Long memberJoin(MemberSignUpDTO userRequestDto) throws Exception
    {
        Optional <Member> optionalMember = memberRepository.findByEmail(userRequestDto.getEmail());

        if(optionalMember.isPresent())
        {
            return null;
        }

        else
        {
            Member member = Member.builder()
                    .email(userRequestDto.getEmail())
                    .password(passwordEncoder.encode(userRequestDto.getPassword()))
                    .name(userRequestDto.getName())
                    .nickname(userRequestDto.getNickname())
                    .birth(userRequestDto.getBirth())
                    .tel(userRequestDto.getTel())
                    .gender(userRequestDto.getGender())
                    .role("내담자")
                    .memberStatus(false)
                    .build();

            Long id = memberRepository.save(member).getId();
            return id;
        }
    }

    //상담사 회원 가입
    public Long counselorJoin(CounselorSignUpDTO userRequestDto) throws Exception
    {
        Optional <Member> optionalMember = memberRepository.findByEmail(userRequestDto.getEmail());

        if(optionalMember.isPresent())
        {
            return null;
        }

        else
        {
            Counselor counselor = Counselor.builder()
                    .email(userRequestDto.getEmail())
                    .password(passwordEncoder.encode(userRequestDto.getPassword()))
                    .name(userRequestDto.getName())
                    .nickname(userRequestDto.getName())
                    .birth(userRequestDto.getBirth())
                    .tel(userRequestDto.getTel())
                    .gender(userRequestDto.getGender())
                    .role("상담사")
                    .memberStatus(false)
                    .address(userRequestDto.getAddress())
                    .level(userRequestDto.getLevel())
                    .license(userRequestDto.getLicense())
                    .intro(userRequestDto.getIntro())
                    .introDetail(userRequestDto.getIntroDetail())
                    .img(userRequestDto.getImg())
                    .build();

            Long id = counselorRepository.save(counselor).getId();
            return id;
        }
    }

    public String isDuplicated(EmailCheckRequestDTO request)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        log.info("auth : {}", authentication.toString());
        if (isExistByEmail(request.getEmail()))
        {
            return "true";
        }
        return "false";
    }

    public String nicknameDuplicated(NicknameCheckDTO request)
    {
        log.info("yao : {}",request.getNickname());
        if(isExistByNickname(request.getNickname()))
        {
            return "true";
        }
        return "false";
    }

    public boolean isExistByEmail(String email)
    {
        return memberRepository.existsByEmail(email);
    }

    public boolean isExistByNickname(String nickname)
    {
        return memberRepository.existsByNickname(nickname);
    }
}