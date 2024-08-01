package com.mamdaero.domain.selftest.service;

import com.mamdaero.domain.selftest.dto.SelftestQuestionResponseDto;
import com.mamdaero.domain.selftest.dto.SelftestResponseDto;
import com.mamdaero.domain.selftest.repository.SelftestQuestionOptionRepository;
import com.mamdaero.domain.selftest.repository.SelftestQuestionRepository;
import com.mamdaero.domain.selftest.repository.SelftestQuestionResponseRepository;
import com.mamdaero.domain.selftest.repository.SelftestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SelftestService {

    private final SelftestRepository selftestRepository;
    private final SelftestQuestionRepository selftestQuestionRepository;
    private final SelftestQuestionOptionRepository selftestQuestionOptionRepository;
    private final SelftestQuestionResponseRepository selftestQuestionResponseRepository;

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
}