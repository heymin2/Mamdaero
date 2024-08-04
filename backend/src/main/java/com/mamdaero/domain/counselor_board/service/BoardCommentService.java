package com.mamdaero.domain.counselor_board.service;

import com.mamdaero.domain.complaint.entity.Complaint;
import com.mamdaero.domain.complaint.entity.Source;
import com.mamdaero.domain.complaint.repository.ComplaintRepository;
import com.mamdaero.domain.counselor_board.dto.request.BoardCommentRequest;
import com.mamdaero.domain.counselor_board.dto.response.BoardCommentResponse;
import com.mamdaero.domain.counselor_board.entity.CounselorBoardComment;
import com.mamdaero.domain.counselor_board.repository.BoardCommentRepository;
import com.mamdaero.domain.counselor_item.exception.CounselorNotFoundException;
import com.mamdaero.domain.member.repository.MemberRepository;
import com.mamdaero.domain.notice.exception.CommentNotFoundException;
import com.mamdaero.domain.notice.exception.BoardBadRequestException;
import com.mamdaero.global.dto.Pagination;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private final ComplaintRepository complaintRepository;

    public Pagination<BoardCommentResponse> findAll(int page, int size, Long id) {
        // 토큰 확인 후 본인인지 확인
        Long memberId = 1L;

        Pageable pageable = PageRequest.of(page, size);

        // 페이지네이션을 적용하여 댓글을 조회합니다.
        Page<CounselorBoardComment> boardPage = boardCommentRepository.findByBoardId(id, pageable);

        List<BoardCommentResponse> commentResponses = boardPage.getContent().stream()
                .map(comment -> {
                    String writer = memberRepository.findById(comment.getMemberId())
                            .orElseThrow(CounselorNotFoundException::new)
                            .getName();

                    boolean isMine = boardCommentRepository.existsByIdAndMemberId(comment.getId(), memberId);

                    return BoardCommentResponse.of(comment, writer, isMine);
                })
                .collect(Collectors.toList());

        return new Pagination<>(
                commentResponses,
                boardPage.getNumber() + 1, // 현재 페이지 (0부터 시작하므로 +1)
                boardPage.getTotalPages(),
                boardPage.getSize(),
                (int) boardPage.getTotalElements()
        );
    }

    @Transactional
    public void create(Long id, BoardCommentRequest request) {
        // 토큰 확인 후 상담사인지 확인
        Long memberId = 1L;

        if(request.getComment() == null) {
            throw new BoardBadRequestException();
        }

        boardCommentRepository.save(BoardCommentRequest.toEntity(id, memberId, request));
    }

    @Transactional
    public BoardCommentResponse update(Long boardId, Long commentId, BoardCommentRequest request) {
        // 토큰 확인 후 본인인지 확인
        Long memberId = 1L;
        
        CounselorBoardComment comment = boardCommentRepository.findByIdAndBoardIdAndMemberId(commentId, boardId, memberId)
                .orElseThrow(CommentNotFoundException::new);

        comment.updateComment(request.getComment());

        String writer = memberRepository.findById(comment.getMemberId())
                .orElseThrow(CounselorNotFoundException::new)
                .getName();

        boolean isMine = boardCommentRepository.existsByIdAndMemberId(comment.getId(), memberId);

        return BoardCommentResponse.of(comment, writer, isMine);
    }

    @Transactional
    public void delete(Long boardId, Long commentId) {
        // 토큰 확인 후 본인인지 확인
        Long memberId = 1L;

        CounselorBoardComment comment = boardCommentRepository.findByIdAndBoardIdAndMemberId(commentId, boardId, memberId)
                .orElseThrow(CommentNotFoundException::new);

        boardCommentRepository.delete(comment);
    }

    @Transactional
    public boolean complaint(Long commentId) {
        // 토큰 확인 후 본인인지 확인
        Long memberId = 1L;

        if(complaintRepository.existsByMemberIdAndEventSourceAndEventId(memberId, Source.COUNSELOR_BOARD_COMMENT, commentId)) {
            return false;
        }

        complaintRepository.save(Complaint.builder()
                .eventSource(Source.COUNSELOR_BOARD_COMMENT)
                .eventId(commentId)
                .memberId(memberId)
                .build());
        return true;
    }
}