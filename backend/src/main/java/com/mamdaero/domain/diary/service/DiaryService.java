package com.mamdaero.domain.diary.service;

import com.mamdaero.domain.diary.dto.request.DiaryRequestDto;
import com.mamdaero.domain.diary.dto.response.DiaryResponseDto;
import com.mamdaero.domain.diary.entity.Diary;
import com.mamdaero.domain.diary.exception.DiaryNoContentException;
import com.mamdaero.domain.diary.exception.DiaryNoDateException;
import com.mamdaero.domain.diary.exception.DiaryNotFoundException;
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

        if (diaryRepository.findDiaryByMember(member).isEmpty()) {
            throw new DiaryNotFoundException();
        }

        return diaryRepository.findDiaryByMember(member).stream()
                .map(DiaryResponseDto::toDTO)
                .toList();
    }

    public DiaryResponseDto findById(Long id) {

        Optional<Diary> optionalDiary = diaryRepository.findById(id);

        if (optionalDiary.isPresent()) {
            return DiaryResponseDto.toDTO(optionalDiary.get());
        }

        throw new DiaryNotFoundException();
    }

    @Transactional
    public void create(DiaryRequestDto requestDto, Member member) {

        if (requestDto.getContent().isEmpty()) {
            throw new DiaryNoContentException();
        }
        else if (requestDto.getDate() == null) {
            throw new DiaryNoDateException();
        }

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

            if (requestDto.getContent().isEmpty()) {
                throw new DiaryNoContentException();
            }
            else if (requestDto.getDate() == null) {
                throw new DiaryNoDateException();
            }

            diary.update(requestDto);
        }
        else {
            throw new DiaryNotFoundException();
        }
    }

    @Transactional
    public void delete(Long id) {
        Optional<Diary> optionalDiary = diaryRepository.findById(id);

        if (optionalDiary.isPresent()) {
            Diary diary = optionalDiary.get();

            diaryRepository.delete(diary);
        }
        else {
            throw new DiaryNotFoundException();
        }
    }
}
