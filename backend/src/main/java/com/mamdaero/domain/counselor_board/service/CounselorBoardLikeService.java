package com.mamdaero.domain.counselor_board.service;

import com.mamdaero.domain.counselor_board.entity.CounselorBoardLike;
import com.mamdaero.domain.counselor_board.repository.CounselorBoardLikeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CounselorBoardLikeService {

    private final CounselorBoardLikeRepository boardLikeRepository;

    @Transactional
    public boolean like(Long boardId) {
        // 토큰 확인 필요
        Long memberId = 1L;

        CounselorBoardLike like = boardLikeRepository.findByBoardIdAndMemberId(boardId, memberId);

        if (like == null) {
            CounselorBoardLike newLike = CounselorBoardLike.builder()
                    .boardId(boardId)
                    .memberId(memberId)
                    .build();
            boardLikeRepository.save(newLike);
            return true;
        }

        boardLikeRepository.delete(like);
        return false;
    }
}