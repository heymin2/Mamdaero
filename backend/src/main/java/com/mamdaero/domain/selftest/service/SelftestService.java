package com.mamdaero.domain.selftest.service;

import com.mamdaero.domain.member.entity.Member;
import com.mamdaero.domain.member.repository.MemberRepository;
import com.mamdaero.domain.selftest.dto.request.TestRequestDto;
import com.mamdaero.domain.selftest.dto.response.SelftestQuestionResponseDto;
import com.mamdaero.domain.selftest.dto.response.SelftestResponseDto;
import com.mamdaero.domain.selftest.entity.*;
import com.mamdaero.domain.selftest.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SelftestService {

    private final SelftestRepository selftestRepository;
    private final SelftestQuestionRepository selftestQuestionRepository;
    private final SelftestQuestionOptionRepository selftestQuestionOptionRepository;
    private final SelftestQuestionResponseRepository selftestQuestionResponseRepository;
    private final MemberRepository memberRepository;
    private final MemberSelftestListRepository memberSelftestListRepository;

    public List<SelftestResponseDto> findAll() {
        return selftestRepository.findAll().stream()
                .map(SelftestResponseDto::toDTO)
                .toList();
    }

    public List<SelftestQuestionResponseDto> getQuestionsWithOptionsByTestId(Integer selftestId) {
        return selftestQuestionRepository.findBySelftestIdWithOptions(selftestId).stream()
                .map(SelftestQuestionResponseDto::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void createByTestId(Integer testId, TestRequestDto requestDto) {

        Member member = memberRepository.findById(1L).get();
        Selftest selftest = selftestRepository.findById(testId).get();

        MemberSelftestList memberSelftestList = MemberSelftestList.builder()
                .member(member)
                .selftest(selftest)
                .memberSelftestDate(LocalDateTime.now())
                .build();

        memberSelftestListRepository.save(memberSelftestList);

        List<Integer> checkList = requestDto.getCheckList();

        if (testId == 1) {
            for (int i = 0; i < checkList.size(); i++) {
                int questionNumber = i + 1;
                int responseValue = checkList.get(i);

                // 응답 값을 기반으로 옵션 ID 가져오기
                int optionIndex = responseValue + 1;  // 응답 값이 0부터 시작하므로 1을 더해줌
                int optionId = (questionNumber - 1) * 4 + optionIndex;  // 각 질문 당 4개의 옵션이 있으므로

                SelftestQuestion selftestQuestion = selftestQuestionRepository.findById(questionNumber).orElseThrow(() -> new RuntimeException("Question not found"));
                SelftestQuestionOption selftestQuestionOption = selftestQuestionOptionRepository.findById(optionId).orElseThrow(() -> new RuntimeException("Option not found"));

                SelftestQuestionResponse selftestQuestionResponse = SelftestQuestionResponse.builder()
                        .selftestQuestion(selftestQuestion)
                        .selftestQuestionOption(selftestQuestionOption)
                        .selftestMemberQuestionScore(responseValue)
                        .memberSelftestList(memberSelftestList)
                        .build();

                selftestQuestionResponseRepository.save(selftestQuestionResponse);

                Integer totalScore = selftestQuestionResponseRepository.findTotalScoreByMemberSelftestListId(memberSelftestList.getId());
                memberSelftestList.updateScore(totalScore);
            }
        }
    }
}