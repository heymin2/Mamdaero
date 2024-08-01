package com.mamdaero.domain.postit.controller;

import com.mamdaero.domain.postit.service.PostitLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class PostitLikeController {

    private final PostitLikeService postitLikeService;

    @PostMapping("/cm/postit/{postitId}/like")
    public ResponseEntity<?> like(@PathVariable("postitId") Long id) {
        if(postitLikeService.like(id)) {
            return ResponseEntity.ok("좋아요 클릭");
        }
        return ResponseEntity.ok("좋아요 취소");
    }
}
