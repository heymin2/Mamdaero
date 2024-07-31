package com.mamdaero.domain.diary.service;

import com.mamdaero.domain.diary.dto.request.DiaryRequestDto;
import com.mamdaero.domain.diary.dto.response.DiaryResponseDto;
import com.mamdaero.domain.diary.entity.Diary;
import com.mamdaero.domain.diary.repository.DiaryRepository;
import com.mamdaero.domain.member.entity.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;

    public List<DiaryResponseDto> findAllByMember(Member member) {
        return diaryRepository.findDiaryByMember(member).stream()
                .map(DiaryResponseDto::toDTO)
                .toList();
    }

    public DiaryResponseDto findById(Long id) {

        Optional<Diary> optionalDiary = diaryRepository.findById(id);

        if (optionalDiary.isPresent()) {
            return DiaryResponseDto.toDTO(optionalDiary.get());
        }

        return null;
    }

    @Transactional
    public void create(DiaryRequestDto requestDto, Member member) {
        Diary diary = Diary.builder()
                .member(member)
                .content(requestDto.getContent())
                .date(requestDto.getDate())
                .build();

        diaryRepository.save(diary);
    }

    @Transactional
    public void update(Long id, DiaryRequestDto requestDto) {
        Optional<Diary> optionalDiary = diaryRepository.findById(id);

        if (optionalDiary.isPresent()) {
            Diary diary = optionalDiary.get();

            diary.update(requestDto);
        }
    }

    @Transactional
    public void delete(Long id) {
        Optional<Diary> optionalDiary = diaryRepository.findById(id);

        if (optionalDiary.isPresent()) {
            Diary diary = optionalDiary.get();

            diaryRepository.delete(diary);
        }
    }
}
