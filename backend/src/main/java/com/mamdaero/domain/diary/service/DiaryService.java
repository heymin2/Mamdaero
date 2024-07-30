package com.mamdaero.domain.diary.service;

import com.mamdaero.domain.diary.dto.DiaryResponseDto;
import com.mamdaero.domain.diary.repository.DiaryRepository;
import com.mamdaero.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;

    public List<DiaryResponseDto> findAllByMember(Member member) {
        return diaryRepository.findDiaryByMember(member).stream()
                .map(DiaryResponseDto::toDTO)
                .toList();
    }

}
