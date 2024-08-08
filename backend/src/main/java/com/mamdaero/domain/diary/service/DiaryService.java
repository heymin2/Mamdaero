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
import com.mamdaero.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final MemberRepository memberRepository;

    public List<DiaryResponseDto> findAllByMember(Long memberId) {

        Optional<Member> optionalMember = memberRepository.findById(memberId);

        if (optionalMember.isPresent()) {

            Member member = optionalMember.get();

            if (diaryRepository.findDiaryByMember(member).isEmpty()) {
                throw new DiaryNotFoundException();
            }

            return diaryRepository.findDiaryByMember(member).stream()
                    .map(DiaryResponseDto::toDTO)
                    .toList();
        }

        return null;
    }

    public List<DiaryResponseDto> findAllByMemberAndIsOpen(Long memberId, Boolean isOpen) {

        Optional<Member> optionalMember = memberRepository.findById(memberId);

        if (optionalMember.isPresent()) {

            Member member = optionalMember.get();

            if (diaryRepository.findAllByMemberAndIsOpen(member, isOpen).isEmpty()) {
                throw new DiaryNotFoundException();
            }

            return diaryRepository.findAllByMemberAndIsOpen(member, isOpen).stream()
                    .map(DiaryResponseDto::toDTO)
                    .toList();
        }

        return null;
    }

    public DiaryResponseDto findById (Long id){

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
    public void delete(Long id, Long memberId) {
        Optional<Diary> optionalDiary = diaryRepository.findById(id);

        if (optionalDiary.isPresent()) {
            Diary diary = optionalDiary.get();

            if (!Objects.equals(diary.getMember().getId(), memberId)) {
                throw new DiaryBadRequestException();
            }

            diaryRepository.delete(diary);
        }
        else {
            throw new DiaryNotFoundException();
        }
    }
}
