package com.example.mamdaero.counselor_item.service;

import com.example.mamdaero.counselor_item.dto.response.CounselorItemResponse;
import com.example.mamdaero.counselor_item.entity.CounselorItem;
import com.example.mamdaero.counselor_item.exception.CounselorItemNotFoundException;
import com.example.mamdaero.counselor_item.repository.CounselorItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CounselorItemService {

    private final CounselorItemRepository counselorItemRepository;

    public List<CounselorItemResponse> findCounselorItem(long counselorId) {
        if(!counselorItemRepository.existsByCounselorId(counselorId)) {
            throw new CounselorItemNotFoundException();
        }

        List<CounselorItem> list = counselorItemRepository.findByCounselorItemId(counselorId);
        return CounselorItemResponse.of(list);
    }
}