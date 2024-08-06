package com.mamdaero.domain.consulting.controller;

import com.mamdaero.domain.consulting.service.ClovaSpeechService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ScriptController {

    private final ClovaSpeechService clovaSpeechService;

    @GetMapping("/c/script")
    public ResponseEntity<String> getScript() {
        String script = clovaSpeechService.speechToText();
        return ResponseEntity.ok(script);
    }
}
