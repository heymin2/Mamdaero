package com.example.mamdaero.counselor_item.service;

import com.example.mamdaero.counselor_item.dto.request.CounselorItemRequest;
import com.example.mamdaero.counselor_item.dto.response.CounselorItemResponse;
import com.example.mamdaero.counselor_item.entity.CounselorItem;
import com.example.mamdaero.counselor_item.exception.CounselorItemBadRequestException;
import com.example.mamdaero.counselor_item.exception.CounselorItemNotFoundException;
import com.example.mamdaero.counselor_item.repository.CounselorItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CounselorItemService {

    private final CounselorItemRepository counselorItemRepository;

    public List<CounselorItemResponse> findCounselorItem(long counselorId) {
        if(!counselorItemRepository.existsByCounselorId(counselorId)) {
            throw new CounselorItemNotFoundException();
        }

        List<CounselorItem> list = counselorItemRepository.findByCounselorId(counselorId);
        return CounselorItemResponse.of(list);
    }

    public boolean create(CounselorItemRequest request) {
        // 토큰값 체크해서 counselor 아이디 검사 기능 추가 필요
        long counselorId = 1;

        if(request.getFee() > 2_000_000_000 || request.getFee() < 0 || request.getName() == null) {
            throw new CounselorItemBadRequestException();
        }

        counselorItemRepository.save(CounselorItemRequest.toEntity(counselorId, request));
        return true;
    }
}