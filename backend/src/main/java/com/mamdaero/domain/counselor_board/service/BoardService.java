package com.mamdaero.domain.counselor_board.service;

import com.mamdaero.domain.complaint.entity.Complaint;
import com.mamdaero.domain.complaint.entity.Source;
import com.mamdaero.domain.complaint.repository.ComplaintRepository;
import com.mamdaero.domain.counselor_board.dto.request.BoardRequest;
import com.mamdaero.domain.counselor_board.dto.response.BoardDetailResponse;
import com.mamdaero.domain.counselor_board.dto.response.BoardResponse;
import com.mamdaero.domain.counselor_board.entity.CounselorBoard;
import com.mamdaero.domain.counselor_board.repository.BoardLikeRepository;
import com.mamdaero.domain.counselor_board.repository.BoardRepository;
import com.mamdaero.domain.counselor_item.exception.CounselorNotFoundException;
import com.mamdaero.domain.member.repository.MemberRepository;
import com.mamdaero.domain.notice.exception.BoardBadRequestException;
import com.mamdaero.domain.notice.exception.BoardNotFoundException;
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
@Slf4j
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final ComplaintRepository complaintRepository;
    private final BoardLikeRepository boardLikeRepository;

    public List<BoardResponse> findAll(int page, int size, String condition) {
        Pageable pageable = PageRequest.of(page, size);

        Page<CounselorBoard> boardPage = findBoardsByCondition(condition, pageable);

        return convertToBoardResponses(boardPage.getContent());
    }

    private Page<CounselorBoard> findBoardsByCondition(String condition, Pageable pageable) {
        return switch (condition) {
            case "new" -> boardRepository.findAllByOrderByCreatedAtDesc(pageable);
            case "old" -> boardRepository.findAllByOrderByCreatedAt(pageable);
            case "best" -> boardRepository.findAllOrderedByLikes(pageable);
            case "comment" -> boardRepository.findAllOrderedByComment(pageable);
            default -> throw new BoardBadRequestException();
        };
    }

    private List<BoardResponse> convertToBoardResponses(List<CounselorBoard> boards) {
        return boards.stream()
                .map(board -> {
                    String writer = memberRepository.findById(board.getMemberId())
                            .orElseThrow(CounselorNotFoundException::new)
                            .getName();
                    return BoardResponse.of(board, writer);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public BoardDetailResponse findDetail(Long id) {
        Long memberId = null;

        CounselorBoard board = boardRepository.findById(id)
                .orElseThrow(BoardNotFoundException::new);

        String writer = memberRepository.findById(board.getMemberId())
                .orElseThrow(CounselorNotFoundException::new)
                .getName();

        board.clickCounselorBoard();

        int likeCount = boardLikeRepository.countByBoardId(board.getId());
        boolean isLike = boardLikeRepository.existsByBoardIdAndMemberId(board.getId(), memberId);
        boolean isMine = boardRepository.existsByIdAndMemberId(board.getId(), memberId);

        return BoardDetailResponse.of(board, writer, likeCount, isLike, isMine);
    }

    @Transactional
    public void create(BoardRequest request) {
        // 토큰 확인 후 상담사인지 확인
        Long memberId = 1L;

        if(request.getTitle() == null || request.getContent() == null) {
            throw new BoardBadRequestException();
        }

        boardRepository.save(BoardRequest.toEntity(memberId, request));
    }

    @Transactional
    public BoardDetailResponse update(Long id, BoardRequest request) {
        // 토큰 확인 후 상담사인지 확인
        Long memberId = 1L;

        CounselorBoard board = boardRepository.findById(id)
                .orElseThrow(BoardNotFoundException::new);

        String writer = memberRepository.findById(board.getMemberId())
                .orElseThrow(CounselorNotFoundException::new)
                .getName();

        if (request.getTitle() != null) {
            board.updateTitle(request.getTitle());
        }

        if (request.getContent() != null) {
            board.updateContent(request.getContent());
        }

        int likeCount = boardLikeRepository.countByBoardId(board.getId());
        boolean isLike = boardLikeRepository.existsByBoardIdAndMemberId(board.getId(), memberId);
        boolean isMine = boardRepository.existsByIdAndMemberId(board.getId(), memberId);

        return BoardDetailResponse.of(board, writer, likeCount, isLike, isMine);
    }

    @Transactional
    public void delete(Long id) {
        // 토큰 확인 후 상담사인지 확인
        Long memberId = 1L;

        CounselorBoard board = boardRepository.findById(id)
                .orElseThrow(BoardNotFoundException::new);

        boardRepository.delete(board);
    }

    @Transactional
    public boolean complaint(Long id) {
        // 토큰 확인 후 로그인한지 확인
        Long memberId = 1L;

        if(complaintRepository.existsByMemberIdAndEventSourceAndEventId(memberId, Source.COUNSELOR_BOARD, id)) {
            return false;
        }

        complaintRepository.save(Complaint.builder()
                .eventSource(Source.COUNSELOR_BOARD)
                .eventId(id)
                .memberId(memberId)
                .build());
        return true;
    }
}