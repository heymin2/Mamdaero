package com.mamdaero.domain.postit.service;

import com.mamdaero.domain.postit.entity.PostitLike;
import com.mamdaero.domain.postit.repository.PostitLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PostitLikeService {

    private final PostitLikeRepository postitLikeRepository;

    @Transactional
    public boolean like(Long boardId) {
        // 토큰 확인 필요
        Long memberId = 1L;

        PostitLike like = postitLikeRepository.findByBoardIdAndMemberId(boardId, memberId);

        if (like == null) {
            PostitLike newLike = PostitLike.builder()
                    .boardId(boardId)
                    .memberId(memberId)
                    .build();
            postitLikeRepository.save(newLike);
            return true;
        }

        postitLikeRepository.delete(like);
        return false;
    }
}
