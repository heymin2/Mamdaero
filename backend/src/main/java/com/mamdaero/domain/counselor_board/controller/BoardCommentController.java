package com.mamdaero.domain.counselor_board.controller;

import com.mamdaero.domain.counselor_board.dto.request.BoardCommentRequest;
import com.mamdaero.domain.counselor_board.service.BoardCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class BoardCommentController {

    private final BoardCommentService boardCommentService;

    @GetMapping("/ca/counselor-board/{boardId}/comment")
    public ResponseEntity<?> comment(@PathVariable("boardId") Long id) {
        return ResponseEntity.ok(boardCommentService.findAll(id));
    }

    @PostMapping("/ca/counselor-board/{boardId}/comment")
    public ResponseEntity<?> create(@PathVariable("boardId") Long id, @RequestBody BoardCommentRequest request) {
        boardCommentService.create(id, request);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/ca/counselor-board/{boardId}/comment/{commentId}")
    public ResponseEntity<?> update(@PathVariable("boardId") Long boardId, @PathVariable("commentId") Long commentId, @RequestBody BoardCommentRequest request) {
        boardCommentService.update(boardId, commentId, request);
        return ResponseEntity.ok(boardCommentService.findAll(boardId));
    }

    @DeleteMapping("/ca/counselor-board/{boardId}/comment/{commentId}")
    public ResponseEntity<?> delete(@PathVariable("boardId") Long boardId, @PathVariable("commentId") Long commentId) {
        boardCommentService.delete(boardId, commentId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/c/counselor-board/comment/{commentId}/complaint")
    public ResponseEntity<?> complaint(@PathVariable("commentId") Long commentId) {
        if(!boardCommentService.complaint(commentId)){
            return ResponseEntity.ok("이미 신고한 글입니다.");
        }
        return ResponseEntity.ok().build();
    }
}