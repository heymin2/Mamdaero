package com.mamdaero.domain.counselor_board.service;

import com.mamdaero.domain.complaint.entity.Complaint;
import com.mamdaero.domain.complaint.entity.Source;
import com.mamdaero.domain.complaint.repository.ComplaintRepository;
import com.mamdaero.domain.counselor_board.dto.request.CounselorBoardRequest;
import com.mamdaero.domain.counselor_board.dto.response.CounselorBoardDetailResponse;
import com.mamdaero.domain.counselor_board.entity.CounselorBoard;
import com.mamdaero.domain.counselor_board.entity.CounselorBoardFile;
import com.mamdaero.domain.counselor_board.repository.CounselorBoardFileRepository;
import com.mamdaero.domain.counselor_board.repository.CounselorBoardLikeRepository;
import com.mamdaero.domain.counselor_board.repository.CounselorBoardRepository;
import com.mamdaero.domain.counselor_item.exception.CounselorNotFoundException;
import com.mamdaero.domain.member.repository.MemberRepository;
import com.mamdaero.domain.notice.exception.BoardBadRequestException;
import com.mamdaero.domain.notice.exception.BoardNotFoundException;
import com.mamdaero.global.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CounselorBoardService {

    private final CounselorBoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final ComplaintRepository complaintRepository;
    private final CounselorBoardLikeRepository boardLikeRepository;
    private final CounselorBoardFileRepository boardFileRepository;
    private final FileService fileService;

    @Transactional
    public CounselorBoardDetailResponse findDetail(Long id) {
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
        List<CounselorBoardFile> files = boardFileRepository.findByBoardId(board.getId());

        List<String> list = new ArrayList<>();

        for (CounselorBoardFile file : files) {
            list.add(file.getUrl());
        }


        return CounselorBoardDetailResponse.of(board, writer, likeCount, isLike, isMine, list);
    }

    @Transactional
    public void create(CounselorBoardRequest request, List<MultipartFile> files) throws IOException {
        // 토큰 확인 후 상담사인지 확인
        Long memberId = 1L;

        if(request.getTitle() == null || request.getContent() == null) {
            throw new BoardBadRequestException();
        }

        CounselorBoard board = CounselorBoardRequest.toEntity(memberId, request);
        boardRepository.save(board);

        for (MultipartFile file : files) {
            String fileUrl = fileService.saveBoard(file, memberId);  // 파일 URL 저장

            if(fileUrl == null) {
                break;
            }
            CounselorBoardFile boardFile = new CounselorBoardFile(null, board.getId(), fileUrl, false);
            boardFileRepository.save(boardFile);
        }
    }

    @Transactional
    public CounselorBoardDetailResponse update(Long id, List<MultipartFile> files, CounselorBoardRequest request) throws IOException {
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

        for (MultipartFile file : files) {
            String fileUrl = fileService.saveBoard(file, memberId);  // 파일 URL 저장

            if(fileUrl == null) {
                break;
            }
            CounselorBoardFile boardFile = new CounselorBoardFile(null, board.getId(), fileUrl, false);
            boardFileRepository.save(boardFile);
        }

        return CounselorBoardDetailResponse.of(board, writer, likeCount, isLike, isMine, null);
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