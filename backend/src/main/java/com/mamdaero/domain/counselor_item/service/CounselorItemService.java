package com.mamdaero.domain.counselor_item.service;

import com.mamdaero.domain.counselor_item.dto.request.CounselorItemRequest;
import com.mamdaero.domain.counselor_item.dto.response.CounselorItemResponse;
import com.mamdaero.domain.counselor_item.entity.CounselorItem;
import com.mamdaero.domain.counselor_item.exception.CounselorItemBadRequestException;
import com.mamdaero.domain.counselor_item.exception.CounselorItemNotFoundException;
import com.mamdaero.domain.counselor_item.exception.CounselorNotFoundException;
import com.mamdaero.domain.counselor_item.repository.CounselorItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CounselorItemService {

    private final CounselorItemRepository counselorItemRepository;

    public List<CounselorItemResponse> findCounselorItem(long counselorId) {
        if(!counselorItemRepository.existsByCounselorId(counselorId)) {
            throw new CounselorNotFoundException();
        }

        return counselorItemRepository.findByCounselorId(counselorId)
                .stream()
                .map(CounselorItemResponse::of)
                .collect(Collectors.toList());
    }

    @Transactional
    public void create(CounselorItemRequest request) {
        // 토큰값 체크해서 counselor 아이디 검사 기능 추가 필요
        long counselorId = 1;

        if(request.getFee() > 2_000_000_000 || request.getFee() < 0 || request.getName() == null) {
            throw new CounselorItemBadRequestException();
        }

        counselorItemRepository.save(CounselorItemRequest.toEntity(counselorId, request));
    }

    @Transactional
    public CounselorItemResponse update(long counselorItemId, CounselorItemRequest request) {
        CounselorItem item = counselorItemRepository.findById(counselorItemId)
                .orElseThrow(CounselorItemNotFoundException::new);

        // 토큰값 체크해서 counselor 아이디 검사 기능 추가 필요
        long counselorId = 1;

        if(item.getCounselorId() != counselorId) {
            throw new CounselorNotFoundException();
        }

        if(request.getFee() > 2_000_000_000 || request.getFee() < 0) {
            throw new CounselorItemBadRequestException();
        }

        CounselorItem updatedItem = CounselorItem.builder()
                .counselorItemId(item.getCounselorItemId())
                .counselorId(item.getCounselorId())
                .name(request.getName() != null ? request.getName() : item.getName())
                .description(request.getDescription() != null ? request.getDescription() : item.getDescription())
                .fee(request.getFee() != 0 ? request.getFee() : item.getFee())
                .build();

        counselorItemRepository.save(updatedItem);

        return CounselorItemResponse.of(updatedItem);
    }
}