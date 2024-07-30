package com.mamdaero.domain.counselor_board.service;

import com.mamdaero.domain.counselor_board.dto.request.BoardCommentRequest;
import com.mamdaero.domain.counselor_board.dto.response.BoardCommentResponse;
import com.mamdaero.domain.counselor_board.entity.CounselorBoardComment;
import com.mamdaero.domain.counselor_board.repository.BoardCommentRepository;
import com.mamdaero.domain.counselor_item.exception.CounselorNotFoundException;
import com.mamdaero.domain.member.repository.MemberRepository;
import com.mamdaero.domain.notice.exception.CommentNotFoundException;
import com.mamdaero.domain.notice.exception.NoticeBadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardCommentService {

    private final BoardCommentRepository boardCommentRepository;
    private final MemberRepository memberRepository;

    public List<BoardCommentResponse> findAll(Long id) {
        List<CounselorBoardComment> comments = boardCommentRepository.findByBoardId(id);

        return comments.stream()
                .map(comment -> {
                    String writer = memberRepository.findById(comment.getMemberId())
                            .orElseThrow(CounselorNotFoundException::new)
                            .getName();
                    return BoardCommentResponse.of(comment, writer);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void create(Long id, BoardCommentRequest request) {
        // 토큰 확인 후 상담사인지 확인
        Long memberId = 1L;

        if(request.getComment() == null) {
            throw new NoticeBadRequestException();
        }

        boardCommentRepository.save(BoardCommentRequest.toEntity(id, memberId, request));
    }

    @Transactional
    public void update(Long boardId, Long commentId, BoardCommentRequest request) {
        // 토큰 확인 후 본인인지 확인
        Long memberId = 1L;
        
        CounselorBoardComment comment = boardCommentRepository.findByIdAndBoardIdAndMemberId(commentId, boardId, memberId)
                .orElseThrow(CommentNotFoundException::new);

        comment.updateComment(request.getComment());
        boardCommentRepository.save(comment);
    }

    @Transactional
    public void delete(Long boardId, Long commentId) {
        // 토큰 확인 후 본인인지 확인
        Long memberId = 1L;

        CounselorBoardComment comment = boardCommentRepository.findByIdAndBoardIdAndMemberId(commentId, boardId, memberId)
                .orElseThrow(CommentNotFoundException::new);

        boardCommentRepository.delete(comment);
    }
}