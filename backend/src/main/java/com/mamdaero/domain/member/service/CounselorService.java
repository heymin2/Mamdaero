package com.mamdaero.domain.member.service;

import com.mamdaero.domain.member.dto.request.CounselorRequestDto;
import com.mamdaero.domain.member.entity.Counselor;
import com.mamdaero.domain.member.repository.CounselorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CounselorService {

    private final CounselorRepository counselorRepository;

    public List<Counselor> findAll(){
        return counselorRepository.findAll();
    }

    // Todo id 말고 토큰으로 본인 찾기 추가
    public Counselor find(final Long id){
        Optional<Counselor> optionalCounselor = counselorRepository.findById(id);

        return optionalCounselor.orElse(null);
    }

    // Todo id 말고 토큰으로 본인 찾기 추가
    @Transactional
    public void modifyIntro(final Long id, CounselorRequestDto requestDto){
        Optional<Counselor> optionalCounselor = counselorRepository.findById(id);

        if (optionalCounselor.isPresent()) {
            Counselor counselor = optionalCounselor.get();
            counselor.updateIntro(requestDto);
        }
    }
    // Todo id 말고 토큰으로 본인 찾기 추가
    @Transactional
    public void modifyIntroDetail(final Long id, CounselorRequestDto requestDto){
        Optional<Counselor> optionalCounselor = counselorRepository.findById(id);

        if (optionalCounselor.isPresent()) {
            Counselor counselor = optionalCounselor.get();
            counselor.updateIntroDetail(requestDto);
        }
    }
    // Todo id 말고 토큰으로 본인 찾기 추가
    @Transactional
    public void modifyImg(final Long id, CounselorRequestDto requestDto){
        Optional<Counselor> optionalCounselor = counselorRepository.findById(id);

        if (optionalCounselor.isPresent()) {
            Counselor counselor = optionalCounselor.get();
            counselor.updateImg(requestDto);
        }
    }
}
