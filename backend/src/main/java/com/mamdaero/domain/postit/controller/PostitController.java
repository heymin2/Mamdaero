package com.mamdaero.domain.postit.controller;

import com.mamdaero.domain.postit.dto.request.PostitRequest;
import com.mamdaero.domain.postit.service.PostitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/postit")
public class PostitController {

    private final PostitService postitService;

    @GetMapping("/{questionId}")
    public ResponseEntity<?> findPost(@PathVariable("questionId") Long questionId) {
        return ResponseEntity.ok(postitService.findPost(questionId));
    }

    @PostMapping("/{questionId}")
    public ResponseEntity<?> create(@PathVariable("questionId") Long questionId, @RequestBody PostitRequest request) {
        postitService.create(questionId, request);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{questionId}/{postitId}")
    public ResponseEntity<?> update(@PathVariable("questionId") Long questionId, @PathVariable("postitId") Long postitId, @RequestBody PostitRequest request) {
        return ResponseEntity.ok(postitService.update(questionId, postitId, request));
    }

    @DeleteMapping("/{questionId}/{postitId}")
    public ResponseEntity<?> delete(@PathVariable("questionId") Long questionId, @PathVariable("postitId") Long postitId, @RequestBody PostitRequest request) {
        postitService.delete(questionId, postitId, request);
        return ResponseEntity.ok().build();
    }
}
