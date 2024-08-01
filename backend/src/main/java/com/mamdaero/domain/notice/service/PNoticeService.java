package com.mamdaero.domain.notice.service;

import com.mamdaero.domain.notice.dto.response.NoticeDetailResponse;
import com.mamdaero.domain.notice.dto.response.NoticeResponse;
import com.mamdaero.domain.notice.entity.Notice;
import com.mamdaero.domain.notice.exception.BoardNotFoundException;
import com.mamdaero.domain.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PNoticeService {

    private final NoticeRepository noticeRepository;

    public List<NoticeResponse> findAll() {
        return noticeRepository.findAll()
                .stream()
                .map(NoticeResponse::of)
                .collect(Collectors.toList());
    }

    @Transactional
    public NoticeDetailResponse findDetail(Long id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(BoardNotFoundException::new);

        notice.clickNotice();
        noticeRepository.save(notice);

        return NoticeDetailResponse.of(notice);
    }
}
