package com.mamdaero.domain.diary.service;

import com.mamdaero.domain.diary.dto.request.DiaryRequestDto;
import com.mamdaero.domain.diary.dto.response.DiaryResponseDto;
import com.mamdaero.domain.diary.entity.Diary;
import com.mamdaero.domain.diary.exception.DiaryBadRequestException;
import com.mamdaero.domain.diary.exception.DiaryNoContentException;
import com.mamdaero.domain.diary.exception.DiaryNoDateException;
import com.mamdaero.domain.diary.exception.DiaryNotFoundException;
import com.mamdaero.domain.diary.repository.DiaryRepository;
import com.mamdaero.domain.member.entity.Member;
import com.mamdaero.domain.member.exception.MemberNotFoundException;
import com.mamdaero.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final MemberRepository memberRepository;

    public Page<DiaryResponseDto> findAllByMember(Long memberId, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Optional<Member> optionalMember = memberRepository.findById(memberId);

        if (optionalMember.isPresent()) {

            Member member = optionalMember.get();

            if (diaryRepository.findDiaryByMember(member, pageable).isEmpty()) {
                throw new DiaryNotFoundException();
            }

            List<DiaryResponseDto> diaries = diaryRepository.findDiaryByMember(member, pageable).stream()
                    .map(DiaryResponseDto::toDTO)
                    .toList();

            return new PageImpl<>(diaries);
        }

        throw new MemberNotFoundException();
    }

    public Page<DiaryResponseDto> findAllByMemberAndIsOpen(Long memberId, Boolean isOpen, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Optional<Member> optionalMember = memberRepository.findById(memberId);

        if (optionalMember.isPresent()) {

            Member member = optionalMember.get();

            if (diaryRepository.findAllByMemberAndIsOpen(member, isOpen, pageable).isEmpty()) {
                throw new DiaryNotFoundException();
            }

            List<DiaryResponseDto> diaryResponseDtoList = diaryRepository.findAllByMemberAndIsOpen(member, isOpen, pageable)
                    .stream()
                    .map(DiaryResponseDto::toDTO)
                    .toList();

            return new PageImpl<>(diaryResponseDtoList);
        }
        throw new MemberNotFoundException();
    }

    public DiaryResponseDto findById(Long id) {

        Optional<Diary> optionalDiary = diaryRepository.findById(id);

        if (optionalDiary.isPresent()) {
            return DiaryResponseDto.toDTO(optionalDiary.get());
        }
        throw new DiaryNotFoundException();
    }

    @Transactional
    public void create(Long memberId, DiaryRequestDto requestDto) {

        Optional<Member> optionalMember = memberRepository.findById(memberId);

        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();

            if (requestDto.getContent().isEmpty()) {
                throw new DiaryNoContentException();
            } else if (requestDto.getDate() == null) {
                throw new DiaryNoDateException();
            }

            Diary diary = Diary.builder()
                    .member(member)
                    .content(requestDto.getContent())
                    .date(requestDto.getDate())
                    .isOpen(requestDto.getIsOpen())
                    .build();

            diaryRepository.save(diary);
        } else {
            throw new MemberNotFoundException();
        }
    }

    @Transactional
    public void update(Long id, DiaryRequestDto requestDto, Long memberId) {
        Optional<Diary> optionalDiary = diaryRepository.findById(id);

        if (optionalDiary.isPresent()) {
            Diary diary = optionalDiary.get();

            if (!Objects.equals(diary.getMember().getId(), memberId)) {

                throw new DiaryBadRequestException();
            }

            if (requestDto.getContent().isEmpty()) {
                throw new DiaryNoContentException();
            } else if (requestDto.getDate() == null) {
                throw new DiaryNoDateException();
            }

            diary.update(requestDto);
        } else {
            throw new DiaryNotFoundException();
        }
    }

    @Transactional
    public void delete(Long id, Long memberId) {
        Optional<Diary> optionalDiary = diaryRepository.findById(id);

        if (optionalDiary.isPresent()) {
            Diary diary = optionalDiary.get();

            if (!Objects.equals(diary.getMember().getId(), memberId)) {
                throw new DiaryBadRequestException();
            }

            diaryRepository.delete(diary);
        } else {
            throw new DiaryNotFoundException();
        }
    }
}
