package com.mamdaero.domain.notice.service;

import com.mamdaero.domain.notice.entity.Notice;
import com.mamdaero.domain.notice.exception.NoticeNotFoundException;
import com.mamdaero.domain.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public List<Notice> findAll() {
        return noticeRepository.findAll();
    }

    public Notice findDetail(Long id) {
        return noticeRepository.findById(id)
                .orElseThrow(NoticeNotFoundException::new);
    }
}
