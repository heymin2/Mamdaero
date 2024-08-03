package com.mamdaero.domain.member.service;

import com.mamdaero.domain.member.dto.request.CounselorRequestDto;
import com.mamdaero.domain.member.entity.Counselor;
import com.mamdaero.domain.member.exception.FileBadRequestException;
import com.mamdaero.domain.member.exception.FileNotFoundException;
import com.mamdaero.domain.member.repository.CounselorRepository;
import com.mamdaero.global.service.FileService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CounselorService {

    private final CounselorRepository counselorRepository;
    private final FileService fileService;

    public List<Counselor> findAll(){
        return counselorRepository.findAll();
    }

    public List<Counselor> findAllByName(String name){
        return counselorRepository.findAllByNameContains(name);
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
    public void modifyImg(MultipartFile file) throws IOException {
        Long memberId = 1L;

        if(file == null) {
            throw new FileBadRequestException();
        }

        if(file.isEmpty()) {
            throw new FileNotFoundException();
        }

        Optional<Counselor> optionalCounselor = counselorRepository.findById(memberId);

        if (optionalCounselor.isPresent()) {
            Counselor counselor = optionalCounselor.get();
            if(counselor.getImg() == null) {
                counselor.updateImg(fileService.saveProfile(file, memberId));
                return;
            }
            fileService.delete(counselor.getImg());
            counselor.updateImg(fileService.saveProfile(file, memberId));
        }
    }
}
