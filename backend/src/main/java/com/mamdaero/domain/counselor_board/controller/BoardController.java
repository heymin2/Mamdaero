package com.mamdaero.domain.counselor_board.controller;

import com.mamdaero.domain.counselor_board.dto.request.BoardRequest;
import com.mamdaero.domain.counselor_board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/counselor-board")
public class BoardController {

    private final BoardService boardService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(boardService.findAll());
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<?> findDetail(@PathVariable("boardId") Long id) {
        return ResponseEntity.ok(boardService.findDetail(id));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody BoardRequest request) {
        boardService.create(request);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{boardId}")
    public ResponseEntity<?> update(@PathVariable("boardId") Long id, @RequestBody BoardRequest request) {
        return ResponseEntity.ok(boardService.update(id, request));
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> delete(@PathVariable("boardId") Long id) {
        boardService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{boardId}/complaint")
    public ResponseEntity<?> complaint(@PathVariable("boardId") Long id) {
        if(!boardService.complaint(id)){
            return ResponseEntity.ok("이미 신고한 글입니다.");
        }
        return ResponseEntity.ok().build();
    }
}